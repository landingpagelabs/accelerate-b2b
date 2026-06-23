# Accelerate B2B Mini CMS

Next.js + Sanity starter for landing pages built from reusable block sections.

## Як працює
- `studio/` містить Sanity Studio для редагування сторінок
- `app/` рендерить сторінки з CMS за допомогою секцій
- `Page` документ з масивом `sections` дозволяє будувати сторінки як ACF-блоки

## Quick start: seed demo content

1. Copy `studio/.env.example` to `studio/.env` and fill `NEXT_PUBLIC_SANITY_PROJECT_ID` and `SANITY_STUDIO_API_TOKEN`.
2. From project root run:

```bash
npm run studio      # starts Sanity Studio at http://localhost:3334
npm run studio:seed # seeds demo `home` page and sample `Post` into your Sanity project (requires tokens)
```


## Створення
1. Скопіюй `.env.local.example` у `.env.local`
2. Заповни `NEXT_PUBLIC_SANITY_PROJECT_ID` та `NEXT_PUBLIC_SANITY_DATASET`

## Запуск
- `npm install`
- `npm run dev` — запустити Next.js
- `npm run studio` — запустити Sanity Studio

## Як створити сторінку
1. Запусти Sanity Studio
2. Створи документ `Page`
3. Додай `slug` = `home`
4. Додай потрібні секції: Hero, Feature, Content, Testimonial, Stats, CTA, Logo Grid

## Додати блог
1. У Sanity Studio створи документ `Post`
2. Встанови `title`, `slug`, `publishedAt`, `mainImage` та `body`
3. Відкрий `/posts` у Next.js для списку публікацій

## Деплой на Vercel
- Підключи репозиторій до Vercel
- Додай змінні середовища: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_STUDIO_API_TOKEN`
- Встанови `NODE_ENV=production` за замовчуванням
