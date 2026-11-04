# TsundereGram — сайт

Лендинг TsundereGram: https://warashl.github.io/

- Один файл `index.html` — стили и скрипты внутри, сборка не нужна.
- Главный экран: руки из точек (LED-полутон) рисуются на `<canvas>` в реальном времени из одной картинки-источника, медленно двигаются и «рассыпаются» в новую позу.
- Ниже: фишки (с фильтром), режимы приватности, платформы (Android / Windows), частые вопросы.
- Шрифт Inter (Google Fonts). Аватарка TsundereGram встроена в `index.html`.
- Деплой: GitHub Actions (`.github/workflows/pages.yml`) при пуше в `main` копирует `index.html` и собирает `og.jpg` из `site/assets/og.jpg.b64`.
