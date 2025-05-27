<script setup>
import { useTodoStore } from '@/stores/todo'

const props = defineProps({
  todo: {
    type: Object,
  },
})

const todoStore = useTodoStore()
const handleChange = () => {
  todoStore.toggleTodo(props.todo.id)
}
const handleDelete = () => {
  todoStore.deleteTodo(props.todo.id)
}
</script>
<template>
  <li class="flex items-center justify-between p-3 transition-colors border-b hover:bg-gray-100">
    <div class="flex items-center">
      <input
        type="checkbox"
        :class="`mr-3 h-4 w-4 text-blue-500 focus:ring-blue-400`"
        @checked="props.todo.done"
        @change="handleChange"
      />
      <span>{{ props.todo.text }}</span>
    </div>
    <button class="ml-4 text-red-500 hover:text-red-700" @click="handleDelete">Delete</button>
  </li>
</template>
