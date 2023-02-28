<template>
  <div class="">
    <h1>manage user roles</h1>
    <el-row>
      <el-col :span="18">
        <UiCard>
          <h2>Your Personnel</h2>
          <p>All the users in your database</p>
          <div>
            <div style="display: flex;">
              <el-input v-model="searchTerm" placeholder="Search" />
              <el-select v-model="searchBy" class="m-2" placeholder="Select" size="large">
                <el-option v-for="item in searchList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <el-button type="primary" @click="onSearch(searchTerm)">Search</el-button>
            </div>
            <div v-if="personnel!">
              <el-table class="table" ref="singleTableRef" highlight-current-row @current-change="handleCurrentChange"
                :data="personnel" stripe style="width: 100%" @sort-change="handleSortChange">
                <el-table-column prop="email" sortable="custom" label="email" width="160" />
                <el-table-column prop="username" sortable="custom" label="Username" width="180" />
                <el-table-column prop="role" sortable="custom" label="Role" />
              </el-table>
              <div class="example-pagination-block">
                <el-pagination layout="prev, pager, next" @current-change="page" :page-size="pagData.pageSize"
                  :page-count="pagData.totalPages" />
              </div>
            </div>
          </div>
        </UiCard>
        <div>
          <el-input-number :min="2" :max="20" v-model="numItems" @change="numItemsPage" :step="2" />
        </div>
      </el-col>
      <el-col :span="12" v-if="currentRow">
        <el-form :model="form" label-width="120px">
          <el-form-item label="User name">
            <el-input disabled v-model="form.username" />
          </el-form-item>
          <el-form-item label="Email">
            <el-input disabled v-model="form.email" />
          </el-form-item>
          <el-form-item label="Role">
            <el-select v-model="form.role" placeholder="User role">
              <el-option label="Admin" value="Admin" />
              <el-option label="Developer" value="Developer" />
              <el-option label="Project Manager" value="Project Manager" />
              <el-option label="User" value="User" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(form)">Apply</el-button>
            <el-button type="danger">Delete User</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { Database } from '../types/supabase'
import { ref } from 'vue'
import { ElTable } from 'element-plus'
import { reactive } from 'vue'
import type { RealtimeChannel } from '@supabase/supabase-js'
definePageMeta({
  middleware: 'auth'
})

let realtimeChannel: RealtimeChannel

const user = useSupabaseUser()
const client = useSupabaseClient<Database>()

const form = reactive({
  id: "",
  email: "",
  username: "",
  role: ""
})

const currentRow = ref()
const searchTerm = ref('')
let numItems = ref(2)
let currPage = ref(1)
let pagData = ref(paginate(1, 1, 1, 10))
let totPages = ref(3)
let searchBy = ref("")
let searchList = ref([{
  value: 'email',
  label: 'Email',
},
{

  value: 'username',
  label: 'User Name',
},
{
  value: 'role',
  label: 'Role',
}])
let totItems = ref(10)
console.log()
const singleTableRef = ref<InstanceType<typeof ElTable>>()

async function numItemsPage(newVal: number | undefined, oldVal: number | undefined) {
  numItems.value = newVal as number
  page(1)
}

async function page(num: number) {
  currPage.value = num
  pagData.value = paginate(totItems.value as number, currPage.value, numItems.value, totPages.value)
  const { data, count } = await client
    .from('personnel')
    .select(`id, email, username, role`, { count: "estimated" }).range(pagData.value.startIndex || 0, pagData.value.endIndex || 100)
  totItems.value = count as number
  personnel.value = data;
}

const handleCurrentChange = (val: Personnel | null) => {
  currentRow.value = val
  form.id = currentRow.value?.id
  form.email = currentRow.value?.email
  form.username = currentRow.value?.username
  form.role = currentRow.value?.role
}

const { data: personnel, refresh: refreshPersonnel } =
  await useAsyncData('personnel', async () => {
    const { data, count } = await client
      .from('personnel')
      .select(`id, email, username, role`, { count: 'estimated' })
      .range(0, numItems.value - 1)
    totItems.value = count as number
    pagData.value = paginate(totItems.value, 1, 2, 10)
    return data
  })

const onSubmit = async (data: Personnel) => {
  await client.from('personnel').update({ role: data.role }).match({ id: data.id })
  handleCurrentChange(data)
}

const onSearch = async (searchTerm: string) => {
  if (!searchTerm) {
    page(1)
  }

  const { data } = await client.from('personnel')
    .select(`id,email, username, role`)
    // .range(pagData.value.startIndex || 0, pagData.value.endIndex || 100)
    // .ilike(searchBy.value, `%${searchTerm}%`)
    .textSearch(searchBy.value, searchTerm, {
      type: 'websearch',
      config: 'english'
    })
  personnel.value = data;
}

async function handleSortChange({ column, prop, order }: { column: object, prop: any, order: string | boolean }) {
  if (order === "descending") order = false
  else order = true
  const { data } = await client.from('personnel')
    .select(`id,email, username, role`)
    .range(pagData.value.startIndex || 0, pagData.value.endIndex || 100)
    .order(prop, { ascending: order })
  personnel.value = data;
}

onMounted(() => {
  realtimeChannel = client
    .channel('public:personnel')
    .on('postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'personnel'
      }, () => refreshPersonnel())
  realtimeChannel.subscribe()
})

onUnmounted(() => {
  client.removeChannel(realtimeChannel)
})
</script>

<style>
.table {
  cursor: pointer;
}
</style>

