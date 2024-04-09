import { FontSize } from './features/font-size/font-size'
import { Navigation } from './features/navigation/navigation'
import { TodoList } from './features/todo-list/todo-list'

export function App() {
  return (
    <>
      <FontSize />
      <Navigation />
      <TodoList />
    </>
  )
}
