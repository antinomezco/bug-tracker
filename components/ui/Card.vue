<template>
  <el-card class="box-card">
    <div class="card-header">
      <span></span>
    </div>
    <slot></slot>
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
