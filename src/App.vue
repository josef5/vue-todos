<script setup lang="ts">
import Modal from '@/components/Modal.vue'
import TodoList from '@/components/TodoList.vue'
import { useTodoStore } from '@/stores/todoStore'
import { type Todo, ModalType } from '@/types'
import { onBeforeMount, ref } from 'vue'

const showModal = ref(false)
const modalType = ref<ModalType>(ModalType.Add)
const editingTodo = ref<Todo | null | undefined>(null)
const todoStore = useTodoStore()

function launchModal(type: ModalType, todo?: Todo) {
  if (type === ModalType.Add) {
    editingTodo.value = null
  } else if (type === ModalType.Edit) {
    editingTodo.value = todo ?? null
  }

  modalType.value = type
  showModal.value = true
}

onBeforeMount(() => {
  todoStore.loadTodos()
})
</script>

<template>
  <main>
    <div id="tc-vue-template">
      <div class="mx-auto mt-8 w-1/2">
        <h1 class="font-bold">Todo bien</h1>
        <TodoList :todos="todoStore.todos" @launch-modal="launchModal" />
      </div>
      <Modal
        :open="showModal"
        :type="modalType"
        @update:open="showModal = false"
        :todo="editingTodo ?? undefined"
      />
    </div>
  </main>
</template>

<style scoped></style>
