<template>
  <div>
    <p>current {{ queryTable }}: {{ defSelectname }}</p>
    <el-form-item :label=capitalize(queryTable!)>
      <el-select v-model="chosenSelect" @change="selectedOption(chosenSelect)">
        <el-option v-for="(query, index) of supaQuery" :label=query.name :value=query.id />
        <!-- {{ supaQuery![index].name }} -->
      </el-select>
    </el-form-item>
    <!-- add select component for edit ticket page
    
      
      list projects from the project table and updating the project_details table with that project number
      assigned dev needs a relation between project_details(personnel_id) equaling those devs assigned to the project chosen and updating the data in project_details(personnel_id)
    -->
  </div>
</template>

<script setup lang="ts">
import { Database } from '~/types/supabase'


const props = defineProps({
  queryTable: String,
  queryColumn: String,
  equalToColumn: {
    type: String,
    default: ""
  },
  equalToDataEl: {
    type: String,
    default: ""
  },
  defSelectname: {
    type: String,
    default: ""
  }
  // queryId: String
})
const emit = defineEmits(['optionGrabber'])
const client = useSupabaseClient<Database>()


const { queryTable } = toRefs(props);
const { queryColumn } = toRefs(props);
const { equalToColumn } = toRefs(props)
const { equalToDataEl } = toRefs(props)
const { defSelectname } = toRefs(props)

const chosenSelect = ref()
console.log(defSelectname)

let queryTableString = queryTable!.value as string
let queryColumnString = queryColumn!.value as string
let equalToDataElString = equalToDataEl!.value as string
let equalToColumnString = equalToColumn!.value as string;

const { data: supaQuery, refresh: refreshQuery } =
  await useAsyncData(queryTableString, async () => {
    const { data, count } = await client
      .from(queryTableString)
      .select(queryColumnString, { count: 'estimated' })
      .eq(equalToColumnString, equalToDataElString)
    return data
  })

const selectedOption = <Type>(val: Type) => {
  emit('optionGrabber', val)
  console.log("selectedOption", val)
}

console.log(supaQuery.value)
</script>