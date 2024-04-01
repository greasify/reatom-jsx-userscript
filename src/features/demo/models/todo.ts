import {
  atom,
  reatomResource,
  withDataAtom,
  withReducers,
  withStatusesAtom
} from '@reatom/framework'

import { posts } from '../api'

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

export const todoResource = reatomResource((ctx) => {
  const page = ctx.spy(todoPageAtom)
  return ctx.schedule(() => posts.get<Todo>(`${page}`, ctx.controller))
}, 'todoResource').pipe(withDataAtom(null), withStatusesAtom())

export const todoAtom = atom(
  (ctx) => ctx.spy(todoResource.dataAtom)?.title,
  'todoAtom'
)

export const todoIsLoadingAtom = atom(
  (ctx) => ctx.spy(todoResource.statusesAtom).isPending,
  'todoIsLoadingAtom'
)
