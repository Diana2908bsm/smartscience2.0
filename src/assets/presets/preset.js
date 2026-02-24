import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura';

export const MyCustomPreset = definePreset(Aura, {
  semantic: {
    primary: { 500: '#16a34a' },
    secondary: { 500: '#f97316' }
  },
  components: {
    button: {
      borderRadius: '12px'
    },
    dialog: {
      fontSize: '16px'
    }
  }
})