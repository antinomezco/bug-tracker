<template>
  <div>
    <p>current {{ queryTable }}: {{ defSelectname }}</p>
    <el-form-item :label=capitalize(queryTable!)>
      <el-select v-model="chosenSelect" v-if="recursiveObj" @change="selectedOption(chosenSelect)">
        <el-option v-for="(query, index) of supaQuery" :label=query.name.name :value=query.id.id />
      </el-select>
      <el-select v-model="chosenSelect" v-else @change="selectedOption(chosenSelect)">
        <el-option v-for="(query, index) of supaQuery" :label=query.name :value=query.id />
      </el-select>
    </el-form-item>
    <!--      
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
  },
  recursiveObj: Boolean
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
    console.log(`convertir? ${queryTableString}`, data)
    return data
  })

const selectedOption = <Type>(val: Type) => {
  emit('optionGrabber', val)
  console.log("selectedOption", val)
}

console.log(supaQuery.value)
</script>