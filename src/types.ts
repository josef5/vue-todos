export interface Todo {
  id: number
  text: string
  done: boolean
}

export enum ModalType {
  Add = 'add',
  Edit = 'edit'
}
