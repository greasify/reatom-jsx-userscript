import { atom } from '@reatom/framework'

import { todoAtom, todoIsLoadingAtom, todoPageAtom } from './model'

export function Navigation() {
  return (
    <div>
      <button on:click={todoPageAtom.prevTodo}>Prev</button>
      <button on:click={todoPageAtom.nextTodo}>Next</button>
      <h1>Page: {todoPageAtom}</h1>
      {atom((ctx) => (
        <b style={{ display: 'block', height: '1rem' }}>
          {ctx.spy(todoIsLoadingAtom) ? 'Loading...' : <pre>{todoAtom}</pre>}
        </b>
      ))}
    </div>
  )
}
