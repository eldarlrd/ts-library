import {
  defineConfig,
  presetUno,
  presetTypography,
  presetAttributify
} from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetTypography(),
    presetAttributify()
  ],
  content: {
    pipeline: {
      include: ['src/**/*.{js,ts}']
    }
  }
});