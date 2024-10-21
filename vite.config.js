// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default {
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
  }
}
