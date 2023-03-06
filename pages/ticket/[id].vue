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
definePageMeta({
  middleware: 'auth'
})
const route = useRoute()

const queryIdSingle = ref(route.params.id as string)
const queryTableSingle = ref("tickets")
const queryColumnSingle = ref("ticket_title, ticket_desc, submitter, dev:assigned_dev(name), priority, current_status, type")
const currentTicket = ref()

const dataQuery = async <T>(info: T) => {
  currentTicket.value = await info
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