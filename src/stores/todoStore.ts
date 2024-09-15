import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface Todo {
  id: number
  text: string
  done: boolean
}

export const useTodoStore = defineStore('todos', () => {
  const todos = ref<Todo[]>([])
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

  function getNewId() {
    return todos.value.reduce((max, todo) => Math.max(max, todo.id), 0) + 1
  }

  const completedTodosCount = computed(() => {
    return todos.value.filter((todo) => todo.done).length
  })

  function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos.value))
  }

  function addNewTodo(newText: string) {
    const newTodo: Todo = {
      id: getNewId(),
      text: newText,
      done: false
    }

    addTodo(newTodo)
  }

  function addTodo(todo: Todo) {
    todos.value.push(todo)

    saveTodos()
  }

  function editTodo(todo: Todo) {
    const index = todos.value.findIndex((t) => t.id === todo.id)

    if (index !== -1) {
      todos.value[index] = todo
    }

    saveTodos()
  }

  function deleteTodo(todo: Todo) {
    todos.value = todos.value.filter((t) => t.id !== todo.id)

    saveTodos()
  }

  function clearCompletedTodos() {
    todos.value = todos.value.filter((todo) => !todo.done)

    saveTodos()
  }

  return {
    todos,
    editingTodo,
    showModal,
    loadTodos,
    saveTodos,
    addTodo,
    addNewTodo,
    deleteTodo,
    editTodo,
    completedTodosCount,
    clearCompletedTodos
  }
})
