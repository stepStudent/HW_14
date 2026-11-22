// Імпортуємо компонент Link із Next.js для переходу на сторінку «Про магазин»
import Link from "next/link";
// Імпортуємо масив товарів із файлу даних
import { PRODUCTS } from "@/data/products";
// Імпортуємо клієнтський компонент каталогу з пошуком і фільтрацією
import { CatalogClient } from "@/components/CatalogClient";

// Експортуємо головну сторінку (Server Component за замовчуванням у Next.js App Router)
export default function HomePage() {
  return ( // Повертаємо JSX-розмітку головної сторінки
    // Основний контейнер сторінки на всю висоту екрана зі світлим фоном і відступами
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      {/* Центрований контейнер максимальної ширини з відступами між шапкою і каталогом */}
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Шапка сторінки з назвою, описом каталогу та посиланням на сторінку «Про магазин» */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          {/* Ліва частина шапки: надзаголовок, заголовок і опис */}
          <div className="space-y-2">
            {/* Надзаголовок у верхньому регістрі акцентним кольором */}
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
              Каталог товарів
            </p> {/* Закриваємо надзаголовок */}
            {/* Головний заголовок сторінки Smart Catalog */}
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Smart Catalog
            </h1> {/* Закриваємо головний заголовок */}
            {/* Короткий підзаголовок-опис можливостей каталогу */}
            <p className="max-w-2xl text-base text-slate-600">
              Швидкий пошук та фільтрація сучасних гаджетів, аудіотехніки та
              рішень для розумного дому.
            </p> {/* Закриваємо підзаголовок */}
          </div> {/* Закриваємо ліву частину шапки */}

          {/* Посилання для переходу на окрему сторінку /about */}
          <Link
            href="/about" // Маршрут до сторінки «Про магазин»
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-xs transition hover:border-slate-300 hover:text-indigo-600" // Стилі кнопки-посилання
          >
            Про магазин →
          </Link> {/* Закриваємо посилання на /about */}
        </header> {/* Закриваємо шапку сторінки */}

        {/* Передаємо масив товарів у клієнтський компонент каталогу */}
        <CatalogClient products={PRODUCTS} />
      </div> {/* Закриваємо центрований контейнер */}
    </main> // Закриваємо основний тег сторінки main
  ); // Завершення return головної сторінки
} // Завершення компонента HomePage
