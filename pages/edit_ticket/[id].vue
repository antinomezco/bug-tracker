<template>
  <div>
    <data-single-data :queryTable=queryTableSingle :queryColumn=queryColumnSingle :queryId=queryIdSingle
      @data-query-handler="dataQuery" />
    <ui-card>
      <h1>Details for ticket #{{ queryIdSingle }}</h1>
      <el-form :model="form" label-width="120px">
        <el-form-item label="Ticket title">
          <el-input disabled v-model="form.title" />
        </el-form-item>
        <el-form-item label="Description">
          <el-input disabled v-model="form.desc" />
        </el-form-item>
        <el-form-item label="Priority">
          <el-select v-model="form.priority">
            <el-option label="Low" value="Low" />
            <el-option label="Medium" value="Medium" />
            <el-option label="High" value="High" />
          </el-select>
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="form.status">
            <el-option label="New" value="New" />
            <el-option label="Open" value="Open" />
            <el-option label="In Progress" value="In Progress" />
            <el-option label="Resolved" value="Resolved" />
            <el-option label="Additional Info Required" value="Additional Info Required" />

          </el-select>
        </el-form-item>
        <el-form-item label="Ticket Type">
          <el-select v-model="form.type">
            <el-option label="Bug/Error" value="Bug/Error" />
            <el-option label="Feature Requests" value="Feature Requests" />
            <el-option label="Other Comments" value="Other Comments" />
            <el-option label="Training/Document Requests" value="Training/Document Requests" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(form)">Apply</el-button>
          <el-button type="danger">Delete User</el-button>
        </el-form-item>
      </el-form>
    </ui-card>
  </div>
</template>

<script setup lang="ts">
import { Database } from '~/types/supabase'
import { reactive } from 'vue'
definePageMeta({
  middleware: 'auth'
})
const route = useRoute()
const client = useSupabaseClient<Database>()


const currentRow = ref()
const queryIdSingle = ref(route.params.id as string)
const queryTableSingle = ref("tickets")
const queryColumnSingle = ref("id ,ticket_title, ticket_desc, submitter, priority, current_status, type")
const currentTicket = ref()

const dataQuery = async <T>(info: any) => {
  currentTicket.value = await info
  console.log("dataQuery", info[0])
  formFiller(info[0])
}

const form = reactive({
  id: "",
  title: "",
  desc: "",
  submitter: "",
  // assigned_developer: "",
  // project: "",
  priority: "",
  status: "",
  type: ""
})

const formFiller = <Type>(val: Type): void => {
  currentRow.value = val
  form.id = currentRow.value?.id
  form.title = currentRow.value.ticket_title
  form.desc = currentRow.value.ticket_desc
  form.submitter = currentRow.value.submitter
  // form.project = currentRow.value?.role
  // form.assigned_developer = currentRow.value?.role
  form.priority = currentRow.value?.priority
  form.status = currentRow.value?.current_status
  form.type = currentRow.value?.type
  console.log("form", form)
}

// MAKE GENERIC LIKE ABOVE
const onSubmit = async (data: Personnel): Promise<void> => {
  await client.from('personnel').update({ role: data.role }).match({ id: data.id })
  formFiller(data)
}
</script>