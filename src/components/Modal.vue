<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ModalType } from '@/types'
import { ref, computed, watch } from 'vue'
import { useTodoStore } from '@/stores/todoStore'

const props = defineProps<{
  type: ModalType
  open: boolean
  todo?: Todo
}>()

const emit = defineEmits(['update:open'])
const todoStore = useTodoStore()
const newTodoText = ref(props.todo?.text ?? '')

watch(
  () => props.todo?.text,
  (newValue) => {
    newTodoText.value = newValue ?? ''
  }
)

const labels = computed(() => {
  if (props.type === ModalType.Edit) {
    return { title: 'Edit Todo', button: 'Save Changes' }
  } else {
    return { title: 'Add New Todo', button: 'Add Todo' }
  }
})

function handleSubmit() {
  if (newTodoText.value.trim()) {
    if (props.type === ModalType.Edit) {
      todoStore.updateTodo({ ...props.todo!, text: newTodoText.value })
    } else {
      todoStore.addNewTodo(newTodoText.value)
    }

    newTodoText.value = ''
    emit('update:open', false)
  }
}
</script>

<template>
  <Dialog :open="props.open" @update:open="emit('update:open', false)">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ labels.title }}</DialogTitle>
        <DialogDescription>
          {{ type === ModalType.Edit ? 'Edit' : 'Add' }} a todo here. Click {{ labels.button }} when
          you're done.
        </DialogDescription>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Input id="todo-text" v-model="newTodoText" class="col-span-4" />
          </div>
        </div>
      </DialogHeader>
      <DialogFooter
        ><Button variant="outline" @click="handleSubmit">{{ labels.button }}</Button></DialogFooter
      >
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
