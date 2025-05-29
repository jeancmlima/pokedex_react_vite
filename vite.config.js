/**
 * Nome do arquivo: vite.config.js
 * Data de criação: 29/05/2025
 * Autor: Jean Carlos
 * Matrícula: 01750191
 *
 * Descrição:
 * Configuração do Vite para projeto React.
 * Habilita o plugin oficial do React e permite personalizações futuras no build e no servidor de desenvolvimento.
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
