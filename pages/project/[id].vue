<template>
  <div>
    <data-single-data :queryTable=queryTableSingle :queryColumn=queryColumnSingle :queryId=queryIdSingle
      @data-query-handler="dataQuery" />
    <ui-card>
      <h1>Details for project #{{ queryIdSingle }}</h1>
      <div v-if="currentProject" style="display:flex; justify-content: space-between;">
        <div>
          <p>Project Name</p>
          <p>{{ currentProject[0].name }}</p>
        </div>
        <div>
          <p>Project Description</p>
          <p>{{ currentProject[0].desc }}</p>
        </div>
      </div>
    </ui-card>
    <ui-card>
      <data-table :searchList="searchListPersonnel" :headers="headersPersonnel" :queryTable=queryTablePersonnel
        :queryColumn=queryColumnPersonnel :equalToDataEl=queryIdSingle equalToColumn="project_id"
        :foreignTable=foreignTablePersonnel />
    </ui-card>
    <ui-card>
      <data-table :searchList="searchListTicket" :headers="headersTicket" :queryTable=queryTableTicket
        :queryColumn=queryColumnTicket :equalToDataEl=queryIdSingle equalToColumn="project_id" />
    </ui-card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const currentProject = ref()

const route = useRoute()
const dataQuery = async <T>(info: T) => {
  currentProject.value = await info
}

const queryTableSingle = ref("project")
const queryColumnSingle = ref("id, name, desc")
const queryIdSingle = ref(route.params.id as string)

// currently unable to sort until supabase supports many-to-many relationship sorting/searching as indicated in https://supabase.com/blog/postgrest-11-prerelease#order-by-related-tables
const foreignTablePersonnel = ref("personnel")
const queryTablePersonnel = ref("project_details")
const queryColumnPersonnel = ref("project_id, name:personnel_id (username), email:personnel_id (email), role:personnel_id (role) ")
const searchListPersonnel = ref([{
  value: 'name',
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
const headersPersonnel = ref([{
  value: 'name.username',
  label: 'User Name',
},
{

  value: 'email.email',
  label: 'Email',
},
{
  value: 'role.role',
  label: 'Role',
}])


const queryTableTicket = ref("project_details")
const queryColumnTicket = ref("ttitle:ticket_id(ticket_title),sub:submitter_id(username) , dev:personnel_id(username), tstatus:ticket_id(status), tcreated:ticket_id(created_at)")
const searchListTicket = ref([{
  value: 'ttitle.ticket_title',
  label: 'Ticket',
},
{

  value: 'ticket_desc',
  label: 'Description',
},
{
  value: 'dev.personnel_id',
  label: 'Developer',
}
])
const headersTicket = ref([{
  value: 'ttitle.ticket_title',
  label: 'Title',
},
{

  value: 'sub.username',
  label: 'Submitter',
},
{
  value: 'dev.username',
  label: 'Developer',
},
{
  value: 'tstatus.status',
  label: 'Status',
},
{
  value: "tcreated.created_at",
  label: "Created"
}])
</script>