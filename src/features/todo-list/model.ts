import { action, atom, parseAtoms, withInit } from '@reatom/framework'
import type { AtomMut, ParseAtoms } from '@reatom/framework'

export const inputAtom = atom('', 'inputAtom')

interface Todo {
  title: string
  completed: AtomMut<boolean>
}

const TODOS_STORAGE_KEY = 'todos'

function fromLocalStorage() {
  const snap = localStorage.getItem(TODOS_STORAGE_KEY)
  if (!snap) return []
  const todos: ParseAtoms<Todo[]> = JSON.parse(snap)
  return todos.map((todo) => getTodoItem(todo.title, todo.completed))
}

const toLocalStorage = action((ctx) => {
  const todos = JSON.stringify(parseAtoms(ctx, todosAtom))
  localStorage.setItem(TODOS_STORAGE_KEY, todos)
}, 'toLocalStorage')

export const todosAtom = atom<Todo[]>([], 'todosAtom').pipe(
  withInit(fromLocalStorage)
)
todosAtom.onChange(toLocalStorage)

function getTodoItem(title: string, completed: boolean): Todo {
  const completedAtom = atom(completed, `completed#${title}`)
  completedAtom.onChange(toLocalStorage)

  return {
    title,
    completed: completedAtom
  }
}

export const addTodo = action((ctx, event: Event) => {
  event.preventDefault()

  const title = ctx.get(inputAtom)
  if (!title) {
    alert('Title is required')
    return
  }

  const isExist = ctx.get(todosAtom).find((todo) => todo.title === title)
  if (isExist) {
    alert('Todo already exists')
    return
  }

  todosAtom(ctx, (todos) => [...todos, getTodoItem(title, false)])
  inputAtom(ctx, '')
}, 'addTodo')

export const clearTodos = action((ctx) => {
  todosAtom(ctx, [])
  inputAtom(ctx, '')
}, 'clearTodos')
