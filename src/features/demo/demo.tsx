import { atom } from '@reatom/framework'

import { countAtom } from './models/counter'
import { todoAtom, todoIsLoadingAtom, todoPageAtom } from './models/todo'

const fontSizeAtom = atom((ctx) => ctx.spy(countAtom) + 'px', 'fontSizeAtom')

export function Demo() {
  return (
    <div>
      <h1
        css={'font-size: var(--size)'}
        css:size={fontSizeAtom}
      >
        Demo {countAtom}
      </h1>
      <button on:click={countAtom.increment}>Increment</button>
      <button on:click={countAtom.decrement}>Decrement</button>
      <button on:click={countAtom.reset}>Reset</button>

      <hr />

      <button on:click={todoPageAtom.prevTodo}>Prev</button>
      <button on:click={todoPageAtom.nextTodo}>Next</button>
      <h1>Page: {todoPageAtom}</h1>
      {atom((ctx) => (
        <span>
          {ctx.spy(todoIsLoadingAtom) ? 'Loading...' : <pre>{todoAtom}</pre>}
        </span>
      ))}
    </div>
  )
}