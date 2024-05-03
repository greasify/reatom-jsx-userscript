import { action, atom, withAssign, withReset } from '@reatom/framework'

const INITIAL_FONT_SIZE = 16

export const fontSizeAtom = atom(INITIAL_FONT_SIZE, 'fontSizeAtom').pipe(
  withAssign((fontSize, name) => ({
    increment: action(
      (ctx) => fontSize(ctx, (size) => size + 1),
      `${name}.increment`
    ),
    decrement: action(
      (ctx) => fontSize(ctx, (size) => size - 1),
      `${name}.decrement`
    )
  })),
  withReset()
)

export const fontSizeVariableAtom = atom((ctx) => {
  return ctx.spy(fontSizeAtom) + 'px'
}, 'fontSizeVariableAtom')
