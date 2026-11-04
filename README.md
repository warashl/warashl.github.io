# TsundereGram — сайт

Исходники сайта https://warashl.github.io/ — неофициального клиента Telegram **TsundereGram** для Android и Windows.

- Стек: React + Vite + Tailwind CSS v4 (`@tailwindcss/vite`) + Motion + Lucide + hls.js.
- `src/` — страница: фоновое видео (`BackgroundVideo`), стеклянная навигация (`Navbar`), главный экран со скачиванием (`Hero`).
- `site/assets/*.b64` — картинки (иконки, превью для соцсетей) в base64; `scripts/decode-assets.mjs` раскодирует их в `public/assets` перед сборкой.
- Локально: `npm install && npm run dev`, сборка — `npm run build` (результат в `dist/`).
- `.github/workflows/pages.yml` собирает сайт и публикует его на GitHub Pages при каждом пуше в `main`.
- Android APK публикуется в [релизах](https://github.com/warashl/warashl.github.io/releases) этого репозитория, Windows-версия — в [TsundereGram-Desktop](https://github.com/warashl/TsundereGram-Desktop/releases).
