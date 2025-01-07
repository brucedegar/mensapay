import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import dynamicImport from "vite-plugin-dynamic-import";
import basicSsl from "@vitejs/plugin-basic-ssl";
import compression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'], // Split vendor libraries
                },
            },
        },
        chunkSizeWarningLimit: 2000, // Adjust the warning limit if necessary
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, "/src")
        }
    },
    // @ts-ignore
    plugins: [basicSsl(), svgr(), dynamicImport(), react(), compression()]
});
