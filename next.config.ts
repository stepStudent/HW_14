// Імпортуємо тип NextConfig із Next.js для підказок і перевірки конфігурації
import type { NextConfig } from "next";

// Створюємо об'єкт конфігурації Next.js
const nextConfig: NextConfig = {
  cacheComponents: true, // Увімкнення кешування компонентів у Next.js 16
  partialPrefetching: true, // Увімкнення часткового попереднього завантаження сторінок
  turbopack: { // Налаштування збирача Turbopack
    rules: { // Правила обробки файлів у Turbopack
      "*.css": { // Правило для всіх CSS-файлів
        loaders: ["@tailwindcss/turbopack"], // Використовуємо завантажувач Tailwind CSS для Turbopack
        as: "*.css", // Повідомляємо, що результат обробки — це CSS-файл
      }, // Завершення правила для *.css
    }, // Завершення об'єкта rules
  }, // Завершення секції turbopack
}; // Завершення об'єкта конфігурації nextConfig

// Експортуємо конфігурацію за замовчуванням для Next.js
export default nextConfig;
