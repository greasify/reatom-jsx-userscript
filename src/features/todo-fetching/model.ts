import {
  action,
  atom,
  reatomResource,
  withAssign,
  withDataAtom,
  withStatusesAtom
} from '@reatom/framework'

import { posts } from './api'

interface Todo {
  userId: number
  id: number
  title: string
  body: string
}

export const todoPageAtom = atom(1, 'todoPageAtom').pipe(
  withAssign((todoPage, name) => ({
    nextTodo: action(
      (ctx) => todoPage(ctx, (todo) => todo + 1),
      `${name}.nextTodo`
    ),
    prevTodo: action(
      (ctx) => todoPage(ctx, (todo) => Math.max(1, todo - 1)),
      `${name}.prevTodo`
    )
  }))
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
