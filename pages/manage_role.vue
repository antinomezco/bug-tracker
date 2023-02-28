<template>
  <div class="">
    <h1>manage user roles</h1>
    <el-row>
      <el-col :span="18">
        <UiCard>
          <h2>Your Personnel</h2>
          <p>All the users in your database</p>
          <div>
            <data-table :searchList="searchList" :headers="headers" @line-grabber="handleCurrentChange"
              :queryTable=queryTable :queryColumn=queryColumn />
          </div>
        </UiCard>
      </el-col>
      <el-col :span="12" v-if="currentRow">
        <el-form :model="form" label-width="120px">
          <el-form-item label="User name">
            <el-input disabled v-model="form.username" />
          </el-form-item>
          <el-form-item label="Email">
            <el-input disabled v-model="form.email" />
          </el-form-item>
          <el-form-item label="Role">
            <el-select v-model="form.role" placeholder="User role">
              <el-option label="Admin" value="Admin" />
              <el-option label="Developer" value="Developer" />
              <el-option label="Project Manager" value="Project Manager" />
              <el-option label="User" value="User" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(form)">Apply</el-button>
            <el-button type="danger">Delete User</el-button>
          </el-form-item>
        </el-form>
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

const form = reactive({
  id: "",
  email: "",
  username: "",
  role: ""
})

const currentRow = ref()
const queryTable = ref("personnel")
const queryColumn = ref("id, email, username, role")
const searchList = ref([{
  value: 'email',
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
const headers = ref([{
  value: 'email',
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

const handleCurrentChange = (val: Personnel | null) => {
  currentRow.value = val
  form.id = currentRow.value?.id
  form.email = currentRow.value?.email
  form.username = currentRow.value?.username
  form.role = currentRow.value?.role
}

// tomar datos de form y modificar la base de datos
const onSubmit = async (data: Personnel) => {
  await client.from('personnel').update({ role: data.role }).match({ id: data.id })
  handleCurrentChange(data)
}
</script>

<style>
.table {
  cursor: pointer;
}
</style>

