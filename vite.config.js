import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.SERVER_URL": JSON.stringify(env.SERVER_URL),
    },
    plugins: [react()],
  };
});
