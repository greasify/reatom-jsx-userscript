import { action, atom, parseAtoms } from '@reatom/framework'
import { withLocalStorage } from '@reatom/persist-web-storage'
import type { AtomMut, ParseAtoms } from '@reatom/framework'

export const inputAtom = atom('', 'inputAtom')

interface Todo {
  title: string
  completed: AtomMut<boolean>
}

export const todosAtom = atom<Todo[]>([], 'todosAtom').pipe(
  withLocalStorage({
    key: 'todos',
    toSnapshot: parseAtoms,
    fromSnapshot: (_, snapshotTodos) => {
      return (snapshotTodos as ParseAtoms<Todo>[]).map((todo) =>
        getTodoItem(todo.title, todo.completed)
      )
    }
  })
)

todosAtom.onChange((_, todos) => console.log('todos', todos))

function getTodoItem(title: string, completed: boolean): Todo {
  const completedAtom = atom(completed, `completed#${title}`)
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
