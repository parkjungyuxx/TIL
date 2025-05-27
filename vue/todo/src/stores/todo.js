import { defineStore } from 'pinia'
import { onMounted, ref, watch } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref([])
  const addTodo = (text) => {
    todos.value.push({
      id: Date.now(),
      text,
      done: false,
    })
  }

  const toggleTodo = (id) => {
    todos.value = todos.value.map((todos) =>
      todos.id === id ? { ...todos, done: !todos.done } : todos
    )
  }

  const deleteTodo = (id) => {
    todos.value = todos.value.filter((todo) => todo.id !== id)
  }

  onMounted(() => {
    const saved = sessionStorage.getItem('vue_todo')
    if (saved) {
      todos.value = JSON.parse(saved)
    }
  })
  watch(
    todos,
    (newTodos) => {
      sessionStorage.setItem('vue_todo', JSON.stringify(newTodos))
    },
    {
      deep: true,
    }
  )

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
  }
})
