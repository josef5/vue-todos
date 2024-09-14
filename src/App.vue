<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useTodoStore } from '@/stores/todoStore'
import { onBeforeMount, ref } from 'vue'
import TodoList from './components/TodoList.vue'

interface Todo {
  id: number
  text: string
  done: boolean
}

const showModal = ref(false)
const newTodoText = ref('')
const editingTodo = ref<Todo | null>(null)
const todoStore = useTodoStore()

function saveTodo() {
  if (newTodoText.value.trim()) {
    if (editingTodo.value) {
      editingTodo.value.text = newTodoText.value
      editingTodo.value = null
    } else {
      const newTodo: Todo = {
        id: todoStore.todos.length + 1,
        text: newTodoText.value,
        done: false
      }
      todoStore.todos.push(newTodo)
    }
    todoStore.saveTodos()
    newTodoText.value = ''
    showModal.value = false
  }
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

onBeforeMount(() => {
  todoStore.loadTodos()
})
</script>

<template>
  <div id="tc-vue-template">
    <div class="mx-auto mt-8 w-1/2">
      <h1 class="font-bold">Todo bien</h1>
      <TodoList :todos="todoStore.todos" @add-todo="addNewTodo" @edit-todo="editTodo" />
    </div>

    <Dialog :open="showModal" @update:open="showModal = false">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{{ editingTodo ? 'Edit Todo' : 'Add New Todo' }}</DialogTitle>
          <!-- <DialogDescription>
            Add or edit a todo here. Click save when you're done.
          </DialogDescription> -->
          <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
              <Input id="todo-text" v-model="newTodoText" class="col-span-4" />
            </div>
          </div>
        </DialogHeader>

        <DialogFooter
          ><Button variant="outline" @click="saveTodo">{{
            editingTodo ? 'Save Changes' : 'Add'
          }}</Button></DialogFooter
        >
      </DialogContent>
    </Dialog>
  </div>
</template>

<style scoped></style>
