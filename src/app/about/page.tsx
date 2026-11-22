// Імпортуємо тип Metadata з Next.js для налаштування заголовка та опису сторінки
import type { Metadata } from "next";
// Імпортуємо компонент Link із Next.js для швидкої клієнтської навігації без перезавантаження сторінки
import Link from "next/link";

// Експортуємо метадані сторінки «Про магазин»
export const metadata: Metadata = {
  title: "Про магазин — Smart Catalog", // Заголовок вкладки браузера для сторінки /about
  description: "Інформація про інтернет-магазин техніки та гаджетів Smart Catalog", // SEO-опис сторінки
}; // Завершення об'єкта metadata

// Масив ключових переваг магазину для відображення у вигляді карток
const ADVANTAGES = [
  { // Перша перевага магазину
    title: "Офіційна гарантія", // Заголовок картки переваги
    description: "Уся техніка сертифікована та має офіційну гарантію виробника від 12 до 24 місяців.", // Опис переваги
  }, // Завершення першої переваги
  { // Друга перевага магазину
    title: "Швидка доставка", // Заголовок картки переваги
    description: "Відправляємо замовлення в день оформлення по всій Україні та пропонуємо самовивіз.", // Опис переваги
  }, // Завершення другої переваги
  { // Третя перевага магазину
    title: "Експертна підтримка", // Заголовок картки переваги
    description: "Допомагаємо підібрати пристрої під ваші завдання та консультуємо щодня без вихідних.", // Опис переваги
  }, // Завершення третьої переваги
]; // Завершення масиву переваг

// Експортуємо компонент сторінки /about (Server Component)
export default function AboutPage() {
  return ( // Повертаємо JSX-розмітку сторінки «Про магазин»
    // Основний контейнер сторінки на всю висоту екрана зі світлим фоном і відступами
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      {/* Центрований контейнер контенту з вертикальними відступами між секціями */}
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Навігаційне посилання для повернення на головну сторінку каталогу */}
        <div>
          <Link
            href="/" // Шлях до головної сторінки каталогу
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-xs transition hover:border-slate-300 hover:text-indigo-600" // Стилі кнопки повернення
          >
            ← Повернутися до каталогу
          </Link> {/* Закриваємо посилання повернення */}
        </div> {/* Закриваємо контейнер навігації */}

        {/* Шапка сторінки «Про магазин» */}
        <header className="space-y-3">
          {/* Надзаголовок акцентним кольором */}
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
            Про магазин
          </p> {/* Закриваємо надзаголовок */}
          {/* Головний заголовок сторінки */}
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Smart Catalog
          </h1> {/* Закриваємо головний заголовок */}
          {/* Короткий вступний текст про магазин */}
          <p className="max-w-2xl text-base leading-relaxed text-slate-600">
            Smart Catalog — це сучасний інтернет-магазин електроніки,
            аудіотехніки, аксесуарів та рішень для розумного дому. Ми збираємо
            перевірені гаджети, які роблять роботу й відпочинок комфортнішими.
          </p> {/* Закриваємо вступний параграф */}
        </header> {/* Закриваємо шапку сторінки */}

        {/* Секція з трьома картками переваг магазину */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Проходимося по масиву ADVANTAGES і рендеримо картку для кожної переваги */}
          {ADVANTAGES.map((item) => (
            // Картка окремої переваги магазину
            <article
              key={item.title} // Унікальний ключ для React
              className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs" // Стилі картки переваги
            >
              {/* Заголовок переваги */}
              <h2 className="text-base font-semibold text-slate-900">
                {item.title}
              </h2> {/* Закриваємо заголовок переваги */}
              {/* Текст опису переваги */}
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p> {/* Закриваємо опис переваги */}
            </article> // Закриваємо картку переваги
          ))}
        </section> {/* Закриваємо секцію переваг */}

        {/* Секція контактної інформації та графіка роботи магазину */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
          {/* Заголовок блоку контактів */}
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Контакти та графік роботи
          </h2> {/* Закриваємо заголовок контактів */}

          {/* Сітка з контактними даними у дві колонки на широких екранах */}
          <dl className="mt-6 grid grid-cols-1 gap-6 text-sm sm:grid-cols-2">
            {/* Блок адреси шоуруму */}
            <div>
              <dt className="font-medium text-slate-400">Адреса</dt> {/* Підпис поля */}
              <dd className="mt-1 font-medium text-slate-900">
                м. Київ, вул. Технологічна, 14
              </dd> {/* Значення адреси */}
            </div> {/* Закриваємо блок адреси */}

            {/* Блок графіка роботи */}
            <div>
              <dt className="font-medium text-slate-400">Графік роботи</dt> {/* Підпис поля */}
              <dd className="mt-1 font-medium text-slate-900">
                Пн–Нд: 09:00 – 20:00
              </dd> {/* Значення графіка роботи */}
            </div> {/* Закриваємо блок графіка роботи */}

            {/* Блок телефону підтримки */}
            <div>
              <dt className="font-medium text-slate-400">Телефон</dt> {/* Підпис поля */}
              <dd className="mt-1 font-medium text-slate-900">
                +380 (44) 123-45-67
              </dd> {/* Значення номера телефону */}
            </div> {/* Закриваємо блок телефону */}

            {/* Блок електронної пошти */}
            <div>
              <dt className="font-medium text-slate-400">Електронна пошта</dt> {/* Підпис поля */}
              <dd className="mt-1 font-medium text-slate-900">
                support@smartcatalog.ua
              </dd> {/* Значення email */}
            </div> {/* Закриваємо блок email */}
          </dl> {/* Закриваємо список контактів */}
        </section> {/* Закриваємо секцію контактів */}
      </div> {/* Закриваємо центрований контейнер */}
    </main> // Закриваємо основний тег сторінки main
  ); // Завершення return сторінки AboutPage
} // Завершення компонента AboutPage
