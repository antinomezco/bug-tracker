<template>
  <div class="common-layout">
    <el-container class="height">
      <el-aside width="200px" class="aside">
        <NavSideBar />
      </el-aside>
      <el-container>
        <el-header class="header">Header</el-header>
        <el-main class="bg">
          <NuxtPage />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  head() {
    return {
      bodyAttrs: {
        class: 'reset-body'
      }
    }
  }
}
</script>

<style>
.bg {
  background-color: #f1f3f5;
}

.common-layout {
  display: flex;
  height: 100vh;
}

html,
body,
#__nuxt {
  margin: 0;
  height: 100vh;
}

.header {
  background-color: gainsboro;
}

.aside {
  background-color: #909399;
}

.reset-body {
  margin: 0
}
</style>