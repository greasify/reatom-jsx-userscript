import { CssVariable } from './features/css-variable/css-variable'
import { TodoFetching } from './features/todo-fetching/todo-fetching'
import { TodoList } from './features/todo-list/todo-list'

export function App() {
  return (
    <section>
      <CssVariable />
      <TodoFetching />
      <TodoList />
    </section>
  )
}
