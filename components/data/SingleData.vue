<template></template>

<script setup lang="ts">
import { Database } from '~/types/supabase'

const client = useSupabaseClient<Database>()

const props = defineProps({
  queryTable: String,
  queryColumn: String,
  queryId: String
})
const emit = defineEmits(['dataQueryHandler'])

const { queryTable } = toRefs(props);
const { queryColumn } = toRefs(props);
const { queryId } = toRefs(props);
const queryRes = ref()

let queryTableString = queryTable!.value as string
let queryColumnString = queryColumn!.value as string
let queryIdString = queryId!.value as string
// console.log(queryTableString, queryColumnString, queryIdString)
const { data: queryData } =
  await useAsyncData(queryTableString, async () => {
    const { data } = await client
      .from(queryTableString)
      .select(queryColumnString)
      .eq('id', queryIdString)
    return data
  })


//ENFORCE TYPE LATER
async function dataQuery(queryData: any) {
  // queryRes.value = await queryData.value
  emit('dataQueryHandler', queryData.value)
}
dataQuery(queryData)
</script>