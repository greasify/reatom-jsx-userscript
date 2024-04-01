import {
  atom,
  reatomResource,
  withDataAtom,
  withReducers,
  withStatusesAtom
} from '@reatom/framework'

async function request<T>(...params: Parameters<typeof fetch>): Promise<T> {
  const response = await fetch(...params)
  if (!response.ok) throw new Error(response.statusText)
  return await response.json()
}

interface Todo {
  userId: number
  id: number
  title: string
  body: string
}

export const todoPageAtom = atom(1, 'todoPageAtom').pipe(
  withReducers({
    nextTodo: (state) => state + 1,
    prevTodo: (state) => Math.max(1, state - 1)
  })
)

export const todoResource = reatomResource(async (ctx) => {
  const page = ctx.spy(todoPageAtom)
  return await ctx.schedule(() =>
    request<Todo>(
      `https://jsonplaceholder.typicode.com/posts/${page}`,
      ctx.controller
    )
  )
}, 'todoResource').pipe(withDataAtom(null), withStatusesAtom())

export const todoAtom = atom(
  (ctx) => ctx.spy(todoResource.dataAtom)?.title,
  'todoAtom'
)

export const todoLoadingAtom = atom(
  (ctx) => ctx.spy(todoResource.statusesAtom).isPending,
  'todoLoadingAtom'
)
