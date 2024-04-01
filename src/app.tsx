import { atom } from '@reatom/framework'

import { countAtom } from './counter'
import { todoAtom, todoLoadingAtom, todoPageAtom } from './todo'

const fontSizeAtom = atom((ctx) => ctx.spy(countAtom) + 'px', 'fontSizeAtom')

export function App() {
  return (
    <div>
      <h1
        css={'font-size: var(--size)'}
        css:size={fontSizeAtom}
      >
        {countAtom}
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
          {ctx.spy(todoLoadingAtom) ? 'Loading...' : <pre>{todoAtom}</pre>}
        </span>
      ))}
    </div>
  )
}
