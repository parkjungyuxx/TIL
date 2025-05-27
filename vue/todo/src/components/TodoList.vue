<script setup>
import { useTodoStore } from '@/stores/todo'
import TodoListItem from './TodoListItem.vue'

const todoStore = useTodoStore()
</script>
<template>
  <ul class="divide-y divide-gray-200">
    <TodoListItem v-for="todo in todoStore.todos" :key="todo.id" :todo="todo" />
  </ul>
</template>
<style></style>
