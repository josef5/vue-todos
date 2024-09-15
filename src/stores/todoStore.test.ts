import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTodoStore } from '@/stores/todoStore'

describe('useTodoStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should add a new todo item', () => {
    const store = useTodoStore()

    store.addNewTodo('Test todo')
    expect(store.todos).toEqual([{ id: 1, text: 'Test todo', done: false }])
  })

  it('should delete a todo item', () => {
    const store = useTodoStore()

    store.addNewTodo('Test todo')
    store.deleteTodo({ id: 1, text: 'Test todo', done: false })

    expect(store.todos).toEqual([])
  })

  it('should update a todo item', () => {
    const store = useTodoStore()

    store.addNewTodo('Test todo')
    store.updateTodo({ id: 1, text: 'Updated todo', done: true })

    expect(store.todos).toEqual([{ id: 1, text: 'Updated todo', done: true }])
  })

  it('should clear completed todos', () => {
    const store = useTodoStore()

    store.addNewTodo('Test todo 1')
    store.addNewTodo('Test todo 2')
    store.updateTodo({ id: 1, text: 'Test todo 1', done: true })
    store.clearCompletedTodos()

    expect(store.todos).toEqual([{ id: 2, text: 'Test todo 2', done: false }])
  })
})
