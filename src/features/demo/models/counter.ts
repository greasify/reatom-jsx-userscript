import { atom, withReducers } from '@reatom/framework'

const INITIAL_COUNT = 16

export const countAtom = atom(INITIAL_COUNT, 'countAtom').pipe(
  withReducers({
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
    reset: () => INITIAL_COUNT
  })
)
