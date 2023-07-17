import {
  defineConfig,
  presetUno,
  presetWebFonts
} from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      fonts: { main: 'Gentium Book Plus' }
    })
  ],
  content: {
    pipeline: {
      include: ['src/**/*.{js,ts}']
    }
  }
});