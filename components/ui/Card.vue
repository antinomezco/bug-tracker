<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Card name</span>
      </div>
      <slot></slot>
    </template>
  </el-card>
</template>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  max-width: 80%;
}
</style>
