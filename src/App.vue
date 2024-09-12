<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Todo {
  id: number
  text: string
  done: boolean
}

const todos = ref<Todo[]>([])
const showModal = ref(false)
const newTodoText = ref('')
const editingTodo = ref<Todo | null>(null)

const loadTodos = () => {
  const savedTodos = localStorage.getItem('todos')

  if (savedTodos) {
    todos.value = JSON.parse(savedTodos) as Todo[]
  } else {
    todos.value = [
      { id: 1, text: 'foo', done: true },
      { id: 2, text: 'bar', done: false }
    ]
  }
}

const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos.value))
}

const addTodo = () => {
  if (newTodoText.value.trim()) {
    if (editingTodo.value) {
      editingTodo.value.text = newTodoText.value
      editingTodo.value = null
    } else {
      const newTodo: Todo = { id: todos.value.length + 1, text: newTodoText.value, done: false }
      todos.value.push(newTodo)
    }
    saveTodos()
    newTodoText.value = ''
    showModal.value = false
  }
}

const editTodo = (todo: Todo) => {
  newTodoText.value = todo.text
  editingTodo.value = todo
  showModal.value = true
}

const deleteTodo = (todo: Todo) => {
  todos.value = todos.value.filter((t) => t.id !== todo.id)
  saveTodos()
}

const updateTodo = () => {
  saveTodos()
}

onMounted(() => {
  loadTodos()
})
</script>

<template>
  <div id="tc-vue-template">
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input type="checkbox" v-model="todo.done" @change="updateTodo" />
        <span :style="{ textDecoration: todo.done ? 'line-through' : 'none' }">{{
          todo.text
        }}</span>
        <button @click="editTodo(todo)">Edit</button>
        <button @click="deleteTodo(todo)">Delete</button>
      </li>
    </ul>
    <button @click="showModal = true">Add Todo</button>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h3>{{ editingTodo ? 'Edit Todo' : 'Add New Todo' }}</h3>
        <input v-model="newTodoText" type="text" placeholder="Enter todo text" />
        <button @click="addTodo">{{ editingTodo ? 'Save' : 'Add' }}</button>
        <button @click="showModal = false">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
