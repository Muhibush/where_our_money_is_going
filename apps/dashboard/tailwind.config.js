/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#19e6d4",
                "primary-dark": "#12aaa0",
                "secondary-orange": "#f97316", // Kept for backward compat
                "background-light": "#f6f8f8",
                "background-dark": "#112120",
                "surface-light": "#ffffff",
                "surface-dark": "#1a2c2a",
                "alert": "#ef4444",
                "warning": "#f97316",
                "text-main-light": "#181510",
                "text-main-dark": "#f8f7f5",
                "text-sub-light": "#8d795e",
                "text-sub-dark": "#a89b88",
            },
            fontFamily: {
                "display": ["Manrope", "Noto Sans", "sans-serif"]
            },
            borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "2xl": "1rem", "full": "9999px" },
        },
    },
    plugins: [],
}
