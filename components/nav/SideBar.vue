<template>
  <el-row class="tac">
    <el-col>
      <h5 class="mb-2">Default colors</h5>
      <el-menu default-active="1" class="el-menu-vertical-demo" router @open="handleOpen" @close="handleClose">
        <el-menu-item index="1" route="/dashboard">
          <el-icon>
            <setting />
          </el-icon>
          <span>Dashboard</span>
        </el-menu-item>
        <el-menu-item index="2" route="/manage_role">
          <el-icon>
            <setting />
          </el-icon>
          <span>Manage Role Assignment</span>
        </el-menu-item>
        <el-menu-item index="3" route="/manage_project_users">
          <el-icon>
            <document />
          </el-icon>
          <span>Manage Project Users</span>
        </el-menu-item>
        <el-menu-item index="4" route="/projects">
          <el-icon>
            <setting />
          </el-icon>
          <span>My Projects</span>
        </el-menu-item>
        <el-menu-item index="5" route="/tickets">
          <el-icon>
            <setting />
          </el-icon>
          <span>My Tickets</span>
        </el-menu-item>
        <el-menu-item index="6" route="/profile">
          <el-icon>
            <setting />
          </el-icon>
          <span>User Profile</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
</script>
