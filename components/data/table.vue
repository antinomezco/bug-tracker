<template>
  <div>
    <div style="display: flex;">
      <el-input v-model="searchTerm" placeholder="Search" />
      <el-select v-model="searchBy" class="m-2" placeholder="Select" size="large">
        <el-option v-for="item in searchList" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-button type="primary" @click="onSearch(searchTerm)">Search</el-button>
    </div>
    <div v-if="supaQuery!">
      <el-table class="table" ref="singleTableRef" @current-change="handleCurrentChange" table-layout="auto"
        highlight-current-row :data="supaQuery" stripe style="width: 100%" @sort-change="handleSortChange">
        <el-table-column type="expand">
          <template #default="props">
            <div m="4">
              <nuxt-link target="_blank" :to="`/project/${props.row.id}`">Project Details</nuxt-link>
            </div>
          </template>
        </el-table-column>
        <template v-for="header in headers" :key="header.value">
          <el-table-column :prop="header.value" sortable="custom" :label="header.label" />
          <!-- <el-table-column v-if="header.value === 'links'">
            <template #default="props">
              {{ props.row.links }}
            </template>
          </el-table-column> -->
        </template>
      </el-table>
      <div class="example-pagination-block">
        <el-pagination layout="prev, pager, next" @current-change="page" :page-size="pagData.pageSize"
          :page-count="pagData.totalPages" />
      </div>
    </div>
    <div>
      <el-input-number :min="2" :max="20" v-model="numItems" @change="numItemsPage" :step="2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Database } from '~/types/supabase'
import { ref } from 'vue'
import { ElTable } from 'element-plus'
import type { RealtimeChannel } from '@supabase/supabase-js'
definePageMeta({
  middleware: 'auth'
})

const props = defineProps({
  searchList: Array<keyable>,
  headers: Array<keyable>,
  queryTable: String,
  queryColumn: String,
})
const emit = defineEmits(['lineGrabber'])

let realtimeChannel: RealtimeChannel

const user = useSupabaseUser()
const client = useSupabaseClient<Database>()

const { queryTable } = toRefs(props);
const { queryColumn } = toRefs(props);
const { headers } = toRefs(props)

const searchTerm = ref('')
let numItems = ref(10)
let currPage = ref(1)
let pagData = ref(paginate(1, 1, 1, 10))
let totPages = ref(3)
let searchBy = ref("")
let totItems = ref(10)
const singleTableRef = ref<InstanceType<typeof ElTable>>()

let queryTableString = queryTable!.value as string
let queryColumnString = queryColumn!.value as string

async function numItemsPage(newVal: number | undefined, oldVal: number | undefined) {
  numItems.value = newVal as number
  page(1)
}

async function page(num: number) {
  currPage.value = num
  pagData.value = paginate(totItems.value as number, currPage.value, numItems.value, totPages.value)
  const { data, count } = await client
    .from(queryTableString)
    .select(queryColumnString, { count: "estimated" }).range(pagData.value.startIndex || 0, pagData.value.endIndex || 100)
  totItems.value = count as number
  supaQuery.value = data;
}

const { data: supaQuery, refresh: refreshQuery } =
  await useAsyncData(queryTableString, async () => {
    const { data, count } = await client
      .from(queryTableString)
      .select(queryColumnString, { count: 'estimated' })
      .range(0, numItems.value - 1)
    totItems.value = count as number
    pagData.value = paginate(totItems.value, 1, 10, 10)
    return data
  })

const onSearch = async (searchTerm: string) => {
  if (!searchTerm) {
    page(1)
    return
  }

  const { data } = await client.from(queryTableString)
    .select(queryColumnString)
    .ilike(searchBy.value, `%${searchTerm}%`)
  supaQuery.value = data;
  pagData = ref(paginate(1, 1, 1, 10))
}

async function handleSortChange({ column, prop, order }: { column: object, prop: any, order: string | boolean }) {
  if (order === "descending") order = false
  else order = true
  const { data } = await client.from(queryTableString)
    .select(queryColumnString)
    .range(pagData.value.startIndex || 0, pagData.value.endIndex || 100)
    .order(prop, { ascending: order })
  supaQuery.value = data;
}

const handleCurrentChange = (val: Personnel | null) => {
  emit('lineGrabber', val)
}

onMounted(() => {
  realtimeChannel = client
    .channel(`public:${queryTableString}`)
    .on('postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: queryTableString
      }, () => refreshQuery())
  realtimeChannel.subscribe()
})

onUnmounted(() => {
  client.removeChannel(realtimeChannel)
})
</script>



