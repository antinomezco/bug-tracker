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
        :queryColumn=queryColumnTicket :equalToDataEl=queryIdSingle equalToColumn="project_id" expand :linkTo=linkTo
        expandType="project_details" />
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

const queryIdSingle = ref(route.params.id as string)
const linkTo = ref(`/ticket/`)
const queryTableSingle = ref("project")
const queryColumnSingle = ref("id, name, desc")

// currently unable to sort until supabase supports many-to-many relationship sorting/searching as indicated in https://supabase.com/blog/postgrest-11-prerelease#order-by-related-tables
const foreignTablePersonnel = ref("personnel")
const queryTablePersonnel = ref("project_details")
const queryColumnPersonnel = ref("project_id, name:personnel_id (name), email:personnel_id (email), role:personnel_id (role) ")
const searchListPersonnel = ref([{
  value: 'name.name',
  label: 'Email',
},
{

  value: 'email.email',
  label: 'User Name',
},
{
  value: 'role.role',
  label: 'Role',
}])
const headersPersonnel = ref([{
  value: 'name.name',
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
const queryColumnTicket = ref("tid:ticket_id(id),ttitle:ticket_id(ticket_title),sub:submitter_id(name) , dev:personnel_id(name), tstatus:ticket_id(current_status), tcreated:ticket_id(created_at)")
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

  value: 'sub.name',
  label: 'Submitter',
},
{
  value: 'dev.name',
  label: 'Developer',
},
{
  value: 'tstatus.current_status',
  label: 'Status',
},
{
  value: "tcreated.created_at",
  label: "Created"
}])
</script>