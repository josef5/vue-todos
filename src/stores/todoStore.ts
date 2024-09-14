import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface Todo {
  id: number
  text: string
  done: boolean
}

export const useTodoStore = defineStore('todos', () => {
  const todos = ref<Todo[]>([])
  const newTodoText = ref('')
  const editingTodo = ref<Todo | null>(null)
  const showModal = ref(false)

  function loadTodos() {
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

  function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos.value))
  }

  function addTodo() {
    if (editingTodo.value) {
      const index = todos.value.findIndex((t) => t.id === editingTodo.value!.id)
      if (index !== -1) {
        todos.value[index].text = newTodoText.value
      }
    } else {
      todos.value.push({ id: Date.now(), text: newTodoText.value, done: false })
    }
    saveTodos()
    newTodoText.value = ''
    showModal.value = false
  }

  function editTodo(todo: Todo) {
    newTodoText.value = todo.text
    editingTodo.value = todo
    showModal.value = true
  }

  function addNewTodo() {
    newTodoText.value = ''
    editingTodo.value = null
    showModal.value = true
  }

  function deleteTodo(todo: Todo) {
    todos.value = todos.value.filter((t) => t.id !== todo.id)

    saveTodos()
  }

  function updateTodo(todo: Todo) {
    const index = todos.value.findIndex((t) => t.id === todo.id)
    if (index !== -1) {
      todos.value[index] = todo
    }

    saveTodos()
  }

  const completedTodosCount = computed(() => {
    return todos.value.filter((todo) => todo.done).length
  })

  function clearCompletedTodos() {
    todos.value = todos.value.filter((todo) => !todo.done)
  }

  return {
    todos,
    newTodoText,
    editingTodo,
    showModal,
    loadTodos,
    saveTodos,
    addTodo,
    editTodo,
    addNewTodo,
    deleteTodo,
    updateTodo,
    completedTodosCount,
    clearCompletedTodos
  }
})
