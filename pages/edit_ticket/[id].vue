<template>
  <div>
    <data-single-data :queryTable=queryTableSingle :queryColumn=queryColumnSingle :queryId=queryIdSingle
      @data-query-handler="dataQuery" />
    <ui-card>
      <h1>Details for ticket #{{ queryIdSingle }}</h1>
      <el-form :model="form" label-width="120px">
        <el-form-item label="Ticket title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="form.desc" />
        </el-form-item>
        <el-form-item label="Priority">
          <el-select v-model="form.priority">
            <el-option label="Low" value="Low" />
            <el-option label="Medium" value="Medium" />
            <el-option label="High" value="High" />
          </el-select>
        </el-form-item>


        <data-select-data queryTable="project" queryColumn="id, name" :defSelectname=form.project_name
          :defSelectNum=form.project_id @option-grabber="formFillerProject"></data-select-data>


        <data-select-data queryTable="personnel" queryColumn="id, username, role"
          :defSelectname=form.assigned_developer_name :defSelectNum=form.assigned_developer
          @option-grabber="formFillerDev"></data-select-data>


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
const queryColumnSingle = ref("id ,ticket_title, ticket_desc, assigned_dev, submitter, priority, current_status, type, project_id, pname:project_id(name), devname:assigned_dev(username)")
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
  assigned_developer: "",
  assigned_developer_name: "",
  priority: "",
  status: "",
  type: "",
  project_name: "",
  project_id: ""
})

const formFiller = <Type>(val: Type): void => {
  currentRow.value = val
  form.id = currentRow.value?.id
  form.title = currentRow.value.ticket_title
  form.desc = currentRow.value.ticket_desc
  form.submitter = currentRow.value.submitter
  form.priority = currentRow.value?.priority
  form.assigned_developer = currentRow.value?.assigned_dev
  form.assigned_developer_name = currentRow.value?.devname.username
  form.status = currentRow.value?.current_status
  form.type = currentRow.value?.type
  form.project_name = currentRow.value?.pname.name
  form.project_id = currentRow.value?.project_id
  console.log("form", form)
}

const formFillerProject = (val: string): void => {
  form.project_id = val
}

const formFillerDev = (val: string): void => {
  form.assigned_developer = val
}

// MAKE GENERIC LIKE ABOVE
const onSubmit = async (data: any): Promise<void> => {
  console.log(form)
  // await client.from('personnel').update({ role: data.role }).match({ id: data.id })
  // redirect to ticket page
}
</script>