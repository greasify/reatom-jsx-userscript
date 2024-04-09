import { fontSizeAtom, fontSizeVariableAtom } from './model'

export function FontSize() {
  return (
    <div>
      <h1
        css={'font-size: var(--size)'}
        css:size={fontSizeVariableAtom}
      >
        Font size: {fontSizeAtom}
      </h1>
      <button on:click={fontSizeAtom.increment}>Increment</button>
      <button on:click={fontSizeAtom.decrement}>Decrement</button>
      <button on:click={fontSizeAtom.reset}>Reset</button>
    </div>
  )
}
