<template>
  <div class="">
    <h1>tickets</h1>
    <el-row>
      <el-col>
        <UiCard>
          <h2>My Tickets</h2>
          <p>All the tickets you have in your database</p>
          <div>
            <data-table :searchList="searchList" :headers="headers" :queryTable=queryTable :queryColumn=queryColumn />
          </div>
        </UiCard>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { Database } from '../types/supabase'
import { ref } from 'vue'
import { reactive } from 'vue'
definePageMeta({
  middleware: 'auth'
})

const user = useSupabaseUser()
const client = useSupabaseClient<Database>()


console.log(user.value?.id)

const currentRow = ref()
const queryTable = ref("tickets")
const queryColumn = ref("id, dev:assigned_dev(name), project_id, created_at, ticket_title, ticket_desc, submitter, priority, current_status, type")
const searchList = ref([{
  value: 'email',
  label: 'Email',
},
{

  value: 'name',
  label: 'User Name',
},
{
  value: 'role',
  label: 'Role',
}])
const headers = ref([
  {
    value: 'dev.name',
    label: 'User Name',
  },
  {
    value: 'project_id',
    label: 'Role',
  },
  {
    value: 'ticket_title',
    label: 'Title',
  }, {
    value: 'ticket_desc',
    label: 'Description',
  }, {
    value: 'priority',
    label: 'Priority',
  }, {
    value: 'current_status',
    label: 'Status',
  }, {
    value: 'type',
    label: 'Type',
  }
])

</script>

<style>
.table {
  cursor: pointer;
}
</style>

