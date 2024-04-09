import { atom, withReducers } from '@reatom/framework'

const INITIAL_FONT_SIZE = 16

export const fontSizeAtom = atom(INITIAL_FONT_SIZE, 'fontSizeAtom').pipe(
  withReducers({
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
    reset: () => INITIAL_FONT_SIZE
  })
)

export const fontSizeVariableAtom = atom((ctx) => {
  return ctx.spy(fontSizeAtom) + 'px'
}, 'fontSizeVariableAtom')
