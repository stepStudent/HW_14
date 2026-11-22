"use client"; // Директива Next.js: позначає цей файл як Client Component (потрібно для useState та інтерактивності)

// Імпортуємо React-хуки: useMemo для кешування фільтрації, useState для збереження стану пошуку і категорії
import { useMemo, useState } from "react";
// Імпортуємо типи Product та ProductCategory
import type { Product, ProductCategory } from "@/types/product";
// Імпортуємо список доступних категорій із файлу даних
import { PRODUCT_CATEGORIES } from "@/data/products";
// Імпортуємо компонент картки товару ProductCard
import { ProductCard } from "@/components/ProductCard";

// Описуємо інтерфейс пропсів для компонента CatalogClient
interface CatalogClientProps {
  products: Product[]; // Масив усіх товарів, переданий із серверної сторінки
} // Завершення інтерфейсу CatalogClientProps

// Тип для обраного фільтра категорій: або «Усі», або одна з конкретних категорій
type CategoryFilter = "Усі" | ProductCategory;

// Експортуємо клієнтський компонент каталогу з пошуком та фільтрацією
export function CatalogClient({ products }: CatalogClientProps) {
  // Стан для тексту, введеного користувачем у поле пошуку (початково порожній рядок)
  const [searchQuery, setSearchQuery] = useState("");
  // Стан для активної категорії фільтрації (початково вибрано «Усі»)
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("Усі"); // Вказуємо тип стану CategoryFilter і початкове значення

  // Формуємо повний масив кнопок фільтра: «Усі» + усі категорії товарів
  const categories: CategoryFilter[] = ["Усі", ...PRODUCT_CATEGORIES];

  // Обчислюємо відфільтрований список товарів і перераховуємо його лише при зміні залежностей
  const filteredProducts = useMemo(() => {
    // Обрізаємо пробіли на краях і переводимо пошуковий запит у нижній регістр
    const normalizedQuery = searchQuery.trim().toLowerCase();

    // Повертаємо товари, які задовольняють і обраній категорії, і пошуковому запиту
    return products.filter((product) => {
      // Перевіряємо збіг категорії: підходить, якщо обрано «Усі» або категорія збігається
      const matchesCategory =
        selectedCategory === "Усі" || product.category === selectedCategory;
      // Перевіряємо збіг назви: підходить, якщо пошук порожній або назва містить введений текст
      const matchesSearch =
        normalizedQuery === "" || // Якщо пошуковий рядок порожній — показуємо товар
        product.name.toLowerCase().includes(normalizedQuery); // Пошук підрядка без урахування регістру

      // Товар потрапляє у результат, лише якщо обидві умови виконуються
      return matchesCategory && matchesSearch;
    }); // Завершення методу filter
  }, [products, searchQuery, selectedCategory]); // Масив залежностей для useMemo

  // Обробник скидання пошуку та фільтра категорій до початкових значень
  const handleResetFilters = () => {
    setSearchQuery(""); // Очищаємо поле пошуку
    setSelectedCategory("Усі"); // Повертаємо фільтр категорій на «Усі»
  }; // Завершення функції handleResetFilters

  return ( // Повертаємо JSX-розмітку каталогу
    // Головна секція каталогу з вертикальними відступами між панеллю фільтрів і списком товарів
    <section className="space-y-8">
      {/* Панель пошуку та фільтрації */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-5">
        {/* Обгортка поля пошуку з позиціонуванням для іконок зліва і справа */}
        <div className="relative">
          {/* SVG-іконка лупи всередині поля пошуку */}
          <svg
            aria-hidden="true" // Приховуємо декоративну іконку від скрінрідерів
            viewBox="0 0 24 24" // Координатна система SVG-іконки
            fill="none" // Без заливки всередині фігури
            stroke="currentColor" // Колір лінії успадковується від текстового кольору
            strokeWidth={2} // Товщина лінії іконки
            className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" // Позиціонуємо іконку зліва по центру вертикалі
          >
            {/* Коло лінзи лупи */}
            <circle cx="11" cy="11" r="8" />
            {/* Ручка лупи */}
            <path d="m21 21-4.3-4.3" strokeLinecap="round" />
          </svg> {/* Закриваємо іконку лупи */}

          {/* Текстове поле введення для пошуку товарів за назвою */}
          <input
            type="text" // Тип поля — звичайний текст
            value={searchQuery} // Прив'язуємо значення поля до стану searchQuery (керований компонент)
            onChange={(e) => setSearchQuery(e.target.value)} // Оновлюємо стан при кожному вводі символу
            placeholder="Пошук товарів за назвою..." // Підказка всередині порожнього поля
            aria-label="Пошук товарів за назвою" // Доступний підпис поля для скрінрідерів
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3 pl-11 pr-10 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10" // Стилі поля та ефект фокусу
          />

          {/* Показуємо кнопку очищення (хрестик), лише коли у полі пошуку є текст */}
          {searchQuery && (
            // Кнопка швидкого очищення пошукового запиту
            <button
              type="button" // Тип button, щоб уникнути випадкової відправки форми
              onClick={() => setSearchQuery("")} // Очищаємо рядок пошуку при кліку
              aria-label="Очистити пошук" // Доступна назва кнопки для скрінрідерів
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600" // Позиціонуємо кнопку справа всередині інпуту
            >
              {/* SVG-іконка хрестика */}
              <svg
                aria-hidden="true" // Декоративна іконка
                viewBox="0 0 24 24" // Координати SVG
                fill="none" // Без заливки
                stroke="currentColor" // Колір лінії береться з тексту
                strokeWidth={2} // Товщина ліній хрестика
                className="h-4 w-4" // Розмір іконки 16x16px
              >
                {/* Дві перехресні діагональні лінії хрестика */}
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
              </svg> {/* Закриваємо іконку хрестика */}
            </button> // Закриваємо кнопку очищення
          )}
        </div> {/* Закриваємо обгортку поля пошуку */}

        {/* Нижній рядок панелі: кнопки категорій зліва і лічильник результатів справа */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Група кнопок фільтрації за категоріями */}
          <div
            className="flex flex-wrap gap-2" // Розміщуємо кнопки в рядок із переносом і відступами
            role="group" // Семантична роль групи елементів керування
            aria-label="Фільтрація за категоріями" // Опис групи для доступності
          >
            {/* Проходимося по масиву категорій і рендеримо кнопку для кожної */}
            {categories.map((category) => {
              // Визначаємо, чи є поточна категорія обраною зараз
              const isActive = selectedCategory === category;

              return ( // Повертаємо JSX кнопки категорії
                // Кнопка вибору категорії
                <button
                  key={category} // Унікальний ключ елемента списку для React
                  type="button" // Звичайна кнопка
                  onClick={() => setSelectedCategory(category)} // Встановлюємо обрану категорію при кліку
                  aria-pressed={isActive} // Повідомляємо скрінрідерам, чи натиснута кнопка
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition cursor-pointer ${ // Базові стилі кнопки
                    isActive // Перевіряємо активний стан кнопки
                      ? "bg-indigo-600 text-white shadow-xs" // Стиль активної (вибраної) кнопки
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200/80" // Стиль неактивної кнопки
                  }`} // Завершення динамічного className
                >
                  {/* Назва категорії на кнопці */}
                  {category}
                </button> // Закриваємо кнопку категорії
              ); // Завершення return кнопки
            })}
          </div> {/* Закриваємо групу кнопок категорій */}

          {/* Лічильник кількості знайдених товарів із загальної кількості */}
          <p className="text-sm text-slate-500">
            Знайдено:{" "}
            {/* Виділяємо жирним кількість відфільтрованих товарів */}
            <span className="font-semibold text-slate-900">
              {filteredProducts.length}
            </span>{" "}
            з {products.length}
          </p> {/* Закриваємо лічильник результатів */}
        </div> {/* Закриваємо нижній рядок панелі фільтрів */}
      </div> {/* Закриваємо панель пошуку та фільтрації */}

      {/* Сітка товарів або порожній стан: перевіряємо, чи є хоча б один знайдений товар */}
      {filteredProducts.length > 0 ? (
        // Адаптивна сітка: 1 колонка на мобільних, 2 на планшетах, 3 на десктопі
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Рендеримо компонент ProductCard для кожного відфільтрованого товару */}
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} /> // Передаємо key та об'єкт product у картку
          ))}
        </div> // Закриваємо сітку товарів
      ) : (
        // Блок порожнього стану, який показується, коли результатів пошуку немає
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          {/* Круглий контейнер для іконки пошуку в порожньому стані */}
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            {/* SVG-іконка лупи */}
            <svg
              aria-hidden="true" // Декоративна іконка
              viewBox="0 0 24 24" // Координати SVG
              fill="none" // Без заливки
              stroke="currentColor" // Колір лінії успадковується
              strokeWidth={1.8} // Товщина лінії
              className="h-6 w-6" // Розмір іконки 24x24px
            >
              {/* Коло лінзи лупи */}
              <circle cx="11" cy="11" r="8" />
              {/* Ручка лупи */}
              <path d="m21 21-4.3-4.3" strokeLinecap="round" />
            </svg> {/* Закриваємо іконку лупи */}
          </div> {/* Закриваємо круглий контейнер іконки */}
          {/* Основне повідомлення про відсутність результатів */}
          <p className="text-lg font-semibold text-slate-900">
            Товарів не знайдено
          </p> {/* Закриваємо заголовок порожнього стану */}
          {/* Додаткова підказка для користувача */}
          <p className="mt-1 text-sm text-slate-500">
            Спробуйте змінити пошуковий запит або обрати іншу категорію.
          </p> {/* Закриваємо підказку */}
          {/* Кнопка для швидкого скидання всіх фільтрів */}
          <button
            type="button" // Тип кнопки
            onClick={handleResetFilters} // Викликаємо функцію очищення пошуку та вибору «Усі»
            className="mt-5 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 cursor-pointer" // Стилі кнопки скидання
          >
            Скинути фільтри
          </button> {/* Закриваємо кнопку скидання фільтрів */}
        </div> // Закриваємо блок порожнього стану
      )}
    </section> // Закриваємо головну секцію каталогу
  ); // Завершення return компонента CatalogClient
} // Завершення компонента CatalogClient
