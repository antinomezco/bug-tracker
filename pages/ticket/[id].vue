<template>
  <div>
    <data-single-data :queryTable=queryTableSingle :queryColumn=queryColumnSingle :queryId=queryIdSingle
      @data-query-handler="dataQuery" />
    <ui-card>
      <h1>Details for ticket #{{ queryIdSingle }}</h1>
      <nuxt-link :to="`/edit_ticket/${queryIdSingle}`">Edit Ticket</nuxt-link>
      <div v-if="currentTicket" style="display:flex; justify-content: space-between;">
        <div>
          <p>Project Name</p>
          <p>{{ currentTicket[0].ticket_title }}</p>
        </div>
        <div>
          <p>Project Description</p>
          <p>{{ currentTicket[0].ticket_desc }}</p>
        </div>
        <div>
          <p>Assigned Developer</p>
          <p>{{ currentTicket[0].dev.name }}</p>
        </div>
        <div>
          <p>Priority</p>
          <p>{{ currentTicket[0].priority }}</p>
        </div>
        <div>
          <p>Status</p>
          <p>{{ currentTicket[0].current_status }}</p>
        </div>
        <div>
          <p>Type</p>
          <p>{{ currentTicket[0].type }}</p>
        </div>
      </div>
    </ui-card>
    <ui-card>
      <data-table :searchList="searchListTicketHistory" :headers="headersPersonnel" :queryTable=queryTableTicketHistory
        :queryColumn=queryColumnTicketHistory :equalToDataEl=queryIdSingle equalToColumn="ticket_id" />
      <el-col :span="12">
        <el-form :model="form" label-width="120px">
          <el-form-item label="message">
            <el-input v-model="form.message" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(form)">Add message</el-button>
            <!-- <el-button type="danger">Delete User</el-button> -->
          </el-form-item>
        </el-form>
      </el-col>
    </ui-card>
    <!-- <ui-card>
      <data-table :searchList="searchListTicket" :headers="headersTicket" :queryTable=queryTableTicket
        :queryColumn=queryColumnTicket :equalToDataEl=queryIdSingle equalToColumn="project_id" expand :linkTo=linkTo />
    </ui-card>
    <ui-card>
      <data-table :searchList="searchListTicket" :headers="headersTicket" :queryTable=queryTableTicket
        :queryColumn=queryColumnTicket :equalToDataEl=queryIdSingle equalToColumn="project_id" expand :linkTo=linkTo />
    </ui-card> -->
  </div>
</template>

<script setup lang="ts">
import { Database } from '~/types/supabase'
import { v4 as uuidv4 } from 'uuid'
definePageMeta({
  middleware: 'auth'
})

const user = useSupabaseUser()
console.log(user.value?.id)
const client = useSupabaseClient<Database>()
definePageMeta({
  middleware: 'auth'
})
const route = useRoute()

const queryIdSingle = ref(route.params.id as string)
const queryTableSingle = ref("tickets")
const queryColumnSingle = ref("ticket_title, ticket_desc, submitter, dev:assigned_dev(name), priority, current_status, type")
const currentTicket = ref()
const storeId = ref(uuidv4())

const dataQuery = async <T>(info: T) => {
  currentTicket.value = await info
}

const form = reactive({
  id: storeId,
  message: ""
})

const onSubmit = async (data: Personnel): Promise<void> => {
  console.log(form, user.value?.id)
  await client.from('ticket_comments').insert({ message: form.message, commenter: user.value!.id, id: form.id })
  await client.from('ticket_com_join').insert({ comment_id: form.id, ticket_id: queryIdSingle.value, commenter_id: user.value?.id })
  console.log(form, user.value?.id)
  form.message = ""
}


// const foreignTableTicketHistory = ref("TicketHistory")
const queryTableTicketHistory = ref("ticket_com_join")
const queryColumnTicketHistory = ref("comment_id, ticket_id, com:commenter_id(name), mes:comment_id(message), date:comment_id(created_at)")
const searchListTicketHistory = ref([{
  value: 'history_id',
  label: 'history id',
},
{

  value: 'email.email',
  label: 'User Name',
},
{
  value: 'role.role',
  label: 'Role',
}
])
const headersPersonnel = ref([{
  value: 'com.name',
  label: 'Commenter',
},
{
  value: 'mes.message',
  label: 'Message',
},
{
  value: 'date.created_at',
  label: 'Created at',
},
])
</script>