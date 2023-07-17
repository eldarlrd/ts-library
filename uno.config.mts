import {
  defineConfig,
  presetUno,
  presetWebFonts
} from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      fonts: { main: 'Libre Baskerville' }
    })
  ],
  content: {
    pipeline: {
      include: ['src/**/*.ts']
    }
  },
  theme: {
    boxShadow: {
      'md-top': '0 20px 25px 10px rgba(66,32,6,0.6), 0 8px 10px 12px rgba(66,32,6,0.6)'
    }
  }
});