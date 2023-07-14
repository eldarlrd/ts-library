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
  ]
});