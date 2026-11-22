// Імпортуємо тип Metadata з Next.js для опису SEO-метаданих сторінки
import type { Metadata } from "next";
// Імпортуємо оптимізовані Google-шрифти Geist і Geist_Mono через next/font
import { Geist, Geist_Mono } from "next/font/google";
// Підключаємо глобальні стилі Tailwind CSS
import "./globals.css";

// Ініціалізуємо основний шрифт без засічок (sans-serif)
const geistSans = Geist({
  variable: "--font-geist-sans", // CSS-змінна, через яку шрифт підключається в globals.css
  subsets: ["latin", "cyrillic"], // Підтримка латиниці та кирилиці (для українського тексту)
}); // Завершення налаштування шрифту geistSans

// Ініціалізуємо моноширинний шрифт (monospace)
const geistMono = Geist_Mono({
  variable: "--font-geist-mono", // CSS-змінна для моноширинного шрифту
  subsets: ["latin", "cyrillic"], // Підтримка латиниці та кирилиці
}); // Завершення налаштування шрифту geistMono

// Експортуємо метадані сайту (заголовок вкладки браузера та опис)
export const metadata: Metadata = {
  title: "Smart Catalog", // Текст у вкладці браузера (<title>)
  description: "Каталог товарів із пошуком та фільтрацією за категоріями", // Мета-опис сторінки
}; // Завершення об'єкта metadata

// Експортуємо кореневий макет (RootLayout), який обгортає всі сторінки застосунку
export default function RootLayout({ children }: LayoutProps<"/">) {
  return ( // Повертаємо базову HTML-структуру документа
    // Кореневий тег html із зазначенням української мови та підключеними CSS-змінними шрифтів
    <html
      lang="uk" // Мова документа — українська
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} // Додаємо змінні шрифтів, висоту 100% і згладжування тексту
    >
      {/* Тіло документа з мінімальною висотою на весь екран, фоном і базовим кольором тексту */}
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
        {/* Вміст поточної сторінки (наприклад, HomePage) */}
        {children}
      </body>{/* Закриваємо тіло документа body */}
    </html> // Закриваємо кореневий тег html
  ); // Завершення return кореневого макета
} // Завершення компонента RootLayout
