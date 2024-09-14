<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DeleteIcon, EditIcon } from '@/components/ui/icons'
import { Label } from '@/components/ui/label'
import { useTodoStore } from '@/stores/todoStore'
import { ModalType } from '@/types'
import { ref, watch } from 'vue'

const todoStore = useTodoStore()

const props = defineProps<{ todo: Todo }>()
const emit = defineEmits(['launch-modal'])
const checkboxDone = ref(props.todo.done)

watch(checkboxDone, (newValue) => {
  todoStore.updateTodo({ ...props.todo, done: newValue })
})
</script>

<template>
  <div class="my-2 flex items-center justify-between gap-4 rounded-lg border px-3 py-2">
    <Checkbox v-model:checked="checkboxDone" />
    <Label
      :style="{ textDecoration: checkboxDone ? 'line-through' : 'none' }"
      class="flex-grow leading-snug"
      >{{ todo.text }}</Label
    >
    <Button
      size="icon"
      variant="outline"
      class="h-6 w-6 shrink-0"
      @click="emit('launch-modal', ModalType.Edit, props.todo)"
      ><EditIcon
    /></Button>
    <Button
      size="icon"
      variant="outline"
      class="h-6 w-6 shrink-0 hover:text-red-500"
      @click="todoStore.deleteTodo(props.todo)"
      ><DeleteIcon
    /></Button>
  </div>
</template>

<style scoped></style>
