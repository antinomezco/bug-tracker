<template>
  <div>
    <h1>
      manage project users page

    </h1>
    <el-row>
      <el-col :span="24">
        <UiCard>
          <h2>Your Personnel</h2>
          <p>All the users in your database</p>
          <div>
            <data-table expand :searchList="searchList" :headers="headers" :queryTable=queryTable
              :queryColumn=queryColumn />
          </div>
        </UiCard>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" >
definePageMeta({
  middleware: 'auth'
})

const queryTable = ref("project")
const queryColumn = ref("id, name, desc")
const searchList = ref([{
  value: 'name',
  label: 'Name',
},
{

  value: 'desc',
  label: 'Description',
}])
const headers = ref([
  {
    value: 'id',
    label: 'ID',
  },
  {
    value: 'name',
    label: 'Name',
  },
  {

    value: 'desc',
    label: 'Description',
  }
]) 
</script>



