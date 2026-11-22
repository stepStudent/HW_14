// Імпортуємо функції defineConfig і globalIgnores з ESLint для формування конфігурації
import { defineConfig, globalIgnores } from "eslint/config";
// Імпортуємо базові правила ESLint від Next.js (включаючи Core Web Vitals)
import nextVitals from "eslint-config-next/core-web-vitals";
// Імпортуємо правила ESLint для TypeScript від Next.js
import nextTs from "eslint-config-next/typescript";

// Формуємо фінальну конфігурацію ESLint
const eslintConfig = defineConfig([
  ...nextVitals, // Підключаємо всі правила перевірки продуктивності й React/Next.js
  ...nextTs, // Підключаємо всі правила перевірки коду TypeScript
  // Перевизначаємо список папок і файлів, які ESLint має ігнорувати
  globalIgnores([
    ".next/**", // Ігноруємо згенеровані файли збірки Next.js
    "out/**", // Ігноруємо папку статичного експорту
    "build/**", // Ігноруємо папку production-збірки
    "next-env.d.ts", // Ігноруємо автогенерований файл типів Next.js
  ]), // Завершення списку ігнорованих шляхів
]); // Завершення defineConfig

// Експортуємо конфігурацію ESLint за замовчуванням
export default eslintConfig;
