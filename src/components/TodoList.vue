<script setup lang="ts">
import TodoItem from '@/components/TodoItem.vue'
import { Button } from '@/components/ui/button'
import { useTodoStore } from '@/stores/todoStore'
import { ModalType } from '@/types'

const todoStore = useTodoStore()

const emit = defineEmits(['launch-modal'])
</script>

<template>
  <div class="">
    <ul class="my-8">
      <li v-for="todo in todoStore.todos" :key="todo.id" class="">
        <TodoItem :todo="todo" @launch-modal="emit('launch-modal', ModalType.Edit, todo)" />
      </li>
      <p v-if="todoStore.todosCount === 0" class="text-center text-gray-500">No todos found</p>
    </ul>
    <div class="flex justify-end gap-2">
      <Button
        variant="outline"
        size="sm"
        v-if="todoStore.completedTodosCount > 0"
        @click="todoStore.clearCompletedTodos"
        >Clear Completed</Button
      ><Button variant="outline" size="sm" @click="emit('launch-modal', ModalType.Add)"
        >Add Todo</Button
      >
    </div>
  </div>
</template>

<style scoped></style>
