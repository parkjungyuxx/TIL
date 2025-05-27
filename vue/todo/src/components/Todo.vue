<script setup>
import TodoHeader from './TodoHeader.vue'
import TodoEditor from './TodoEditor.vue'
import TodoList from './TodoList.vue'
</script>
<template>
  <div class="max-w-md mx-auto overflow-hidden rounded-lg shadow-lg">
    <TodoHeader />
    <TodoEditor />
    <TodoList />
  </div>
</template>
<style scoped></style>
