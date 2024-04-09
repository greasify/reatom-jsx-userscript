import { atom } from '@reatom/framework'

import { addTodo, clearTodos, inputAtom, todosAtom } from './model'

export function TodoList() {
  return (
    <div>
      <h1>Todo list</h1>
      <form on:submit={addTodo}>
        <input
          required
          autofocus
          model:value={inputAtom}
        />
        <button>Add</button>
        <button
          type="button"
          on:click={clearTodos}
        >
          Clear
        </button>
      </form>
      {atom((ctx) => (
        <ul>
          {ctx.spy(todosAtom).map((todo) => (
            <li>
              <span>{todo.title}</span>
              <input
                type="checkbox"
                model:checked={todo.completed}
              />
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}
