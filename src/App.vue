<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
  // DialogTrigger
} from '@/components/ui/dialog'
import { DeleteIcon, EditIcon } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { onMounted, ref } from 'vue'

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

function addNewTodo() {
  newTodoText.value = ''
  editingTodo.value = null
  showModal.value = true
}

function deleteTodo(todo: Todo) {
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
    <div class="mx-auto mt-8 w-1/2">
      Todo bien
      <ul class="my-8">
        <li
          v-for="todo in todos"
          :key="todo.id"
          class="my-2 flex items-center justify-between gap-4 rounded-lg border px-3 py-2"
        >
          <Checkbox v-model:checked="todo.done" @update:checked="updateTodo" />
          <Label
            :style="{ textDecoration: todo.done ? 'line-through' : 'none' }"
            class="flex-grow leading-snug"
            >{{ todo.text }}</Label
          >

          <Button size="icon" variant="outline" class="h-6 w-6" @click="editTodo(todo)"
            ><EditIcon
          /></Button>
          <Button
            size="icon"
            variant="outline"
            class="h-6 w-6 hover:text-red-500"
            @click="deleteTodo(todo)"
            ><DeleteIcon
          /></Button>
      </li>
    </ul>
      <div class="flex gap-2">
        <Button variant="outline" size="sm" @click="addNewTodo">Add Todo</Button>
        <Button
          variant="outline"
          size="sm"
          @click="clearCompletedTodos"
          v-if="todos.filter((todo) => todo.done).length > 0"
          >Clear Completed</Button
        >
      </div>
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
