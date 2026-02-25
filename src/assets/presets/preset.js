import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura';

export const MyCustomPreset = definePreset(Aura, {
  semantic: {
    primary: { 500: '#447efb' },
    secondary: { 500: '#95a7ff75' }
  },
  components: {
    button: {
      borderRadius: '12px',
      
    },
    dialog: {
      fontSize: '16px'
    }
  }
})