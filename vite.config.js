import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
    server: {
        allowedHosts:["transnational-patronizable-rocio.ngrok-free.dev"]
    },
    build: {
        outDir: 'build',   // 🔥 mana shu qo‘shiladi
    }
})