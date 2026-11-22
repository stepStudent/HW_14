// Імпортуємо типи Product та ProductCategory для типізації пропсів і стилів
import type { Product, ProductCategory } from "@/types/product";

// Описуємо інтерфейс пропсів, які приймає компонент ProductCard
interface ProductCardProps {
  product: Product; // Об'єкт одного товару для відображення у картці
} // Завершення інтерфейсу ProductCardProps

// Словник Tailwind-класів для кольорового бейджа кожної категорії
const categoryStyles: Record<ProductCategory, string> = {
  Електроніка: "bg-indigo-50 text-indigo-700 ring-indigo-600/15", // Стиль бейджа для категорії «Електроніка»
  Аудіо: "bg-violet-50 text-violet-700 ring-violet-600/15", // Стиль бейджа для категорії «Аудіо»
  "Смарт-дім": "bg-amber-50 text-amber-700 ring-amber-600/15", // Стиль бейджа для категорії «Смарт-дім»
  Аксесуари: "bg-sky-50 text-sky-700 ring-sky-600/15", // Стиль бейджа для категорії «Аксесуари»
}; // Завершення словника стилів категорій

// Функція для однакового форматування ціни на сервері (Node.js) та в браузері (уникає помилки гідратації)
function formatPrice(price: number): string {
  // Розділяємо тисячі пробілом і додаємо позначення валюти «грн»
  return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} грн`;
} // Завершення функції formatPrice

// Експортуємо функціональний компонент картки товару ProductCard
export function ProductCard({ product }: ProductCardProps) {
  return ( // Повертаємо JSX-розмітку картки товару
    // Семантичний тег article для окремої картки з білим фоном, рамкою та hover-анімацією
    <article className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      {/* Верхній блок картки: бейджі, назва та опис */}
      <div>
        {/* Рядок із бейджами категорії й акції зліва та статусом наявності справа */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          {/* Ліва група бейджів: категорія та позначка «Акція» */}
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Бейдж категорії товару з динамічними кольорами з categoryStyles */}
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${categoryStyles[product.category]}`} // Підставляємо класи відповідно до категорії
            >
              {/* Виводимо назву категорії товару */}
              {product.category}
            </span> {/* Закриваємо бейдж категорії */}

            {/* Якщо товар зі знижкою — показуємо яскраву позначку «Акція» */}
            {product.isOnSale && (
              // Бейдж «Акція» для акційних товарів
              <span className="inline-flex items-center rounded-full bg-rose-600 px-2.5 py-1 text-xs font-semibold text-white shadow-xs">
                Акція
              </span> // Закриваємо бейдж «Акція»
            )}
          </div> {/* Закриваємо ліву групу бейджів */}

          {/* Бейдж статусу наявності (зелений якщо є, червоний якщо немає) */}
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${ // Базові стилі бейджа наявності
              product.inStock // Перевіряємо, чи товар у наявності
                ? "bg-emerald-50 text-emerald-700" // Зелені кольори, якщо товар в наявності
                : "bg-rose-50 text-rose-700" // Червонуваті кольори, якщо товару немає
            }`} // Завершення динамічного className
          >
            {/* Кольорова крапка-індикатор перед текстом статусу */}
            <span
              className={`h-1.5 w-1.5 rounded-full ${ // Розмір і форма круглої крапки
                product.inStock ? "bg-emerald-500" : "bg-rose-500" // Колір крапки залежно від наявності
              }`} // Завершення динамічного className крапки
            />
            {/* Текст статусу наявності товару */}
            {product.inStock ? "В наявності" : "Немає в наявності"}
          </span> {/* Закриваємо бейдж наявності */}
        </div> {/* Закриваємо рядок із бейджами */}

        {/* Заголовок картки — назва товару, яка підсвічується при наведенні на картку */}
        <h2 className="text-lg font-semibold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
          {/* Виводимо назву товару */}
          {product.name}
        </h2> {/* Закриваємо заголовок товару */}

        {/* Параграф із коротким описом товару */}
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {/* Виводимо текст опису товару */}
          {product.description}
        </p> {/* Закриваємо параграф опису */}
      </div> {/* Закриваємо верхній блок картки */}

      {/* Нижній блок картки з розділювальною лінією та ціною */}
      <div className="mt-6 flex items-baseline justify-between border-t border-slate-100 pt-4">
        {/* Підпис «Ціна» дрібним шрифтом */}
        <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
          Ціна
        </span> {/* Закриваємо підпис «Ціна» */}
        {/* Блок із поточною ціною та (за наявності акції) закресленою старою ціною */}
        <div className="flex items-baseline gap-2">
          {/* Якщо товар бере участь в акції та має стару ціну — показуємо її закресленою */}
          {product.isOnSale && product.oldPrice && (
            // Закреслена ціна до знижки
            <span className="text-sm text-slate-400 line-through">
              {formatPrice(product.oldPrice)}
            </span> // Закриваємо блок старої ціни
          )}
          {/* Відформатована поточна ціна товару жирним шрифтом (червоним для акційних товарів) */}
          <span
            className={`text-xl font-bold tracking-tight ${ // Базовий розмір і товщина тексту ціни
              product.isOnSale ? "text-rose-600" : "text-slate-900" // Акцентний колір для ціни зі знижкою
            }`} // Завершення динамічного className ціни
          >
            {/* Форматуємо число price у формат гривні */}
            {formatPrice(product.price)}
          </span> {/* Закриваємо блок ціни */}
        </div> {/* Закриваємо контейнер цін */}
      </div> {/* Закриваємо нижній блок картки */}
    </article> // Закриваємо кореневий тег картки article
  ); // Кінець повернення JSX
} // Кінець компонента ProductCard
