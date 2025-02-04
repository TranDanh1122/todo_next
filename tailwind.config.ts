import type { Config } from "tailwindcss";
import scrollBar from "tailwind-scrollbar"
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        "mobile-light": "url('/assets/images/bg-mobile-light.jpg')",
        "mobile-dark": "url('/assets/images/bg-mobile-dark.jpg')",
        "desk-dark": "url('/assets/images/bg-desktop-dark.jpg')",
        "desk-light": "url('/assets/images/bg-desktop-light.jpg')",
      }
    },
  },
  plugins: [
    scrollBar
  ],
} satisfies Config;
