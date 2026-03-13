import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import StepCard from './components/StepCard.vue'
import LinkCard from './components/LinkCard.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('StepCard', StepCard)
    app.component('LinkCard', LinkCard)
  },
} satisfies Theme
