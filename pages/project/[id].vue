<template>
  <div>
    {{ $route.params.id }}
  </div>
</template>

<script>
const route = useRoute()
console.log(route)
</script>