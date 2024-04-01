import { connectLogger } from '@reatom/framework'
import { ctx, mount } from '@reatom/jsx'

import { App } from './app'

if (import.meta.env.MODE === 'development') {
  connectLogger(ctx)
}

mount(document.body, <App />)
