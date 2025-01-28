import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "node",
    setupFiles: "./setupTests.ts",
    include: ["src/**/*.test.tsx"],
  },
});
