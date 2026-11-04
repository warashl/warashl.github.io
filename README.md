# TsundereGram — сайт

Лендинг TsundereGram: https://warashl.github.io/

- Один файл `index.html` — стили и скрипты внутри, сборка не нужна.
- Анимации: GSAP 3.12.5 + ScrollTrigger и плавный скролл Lenis 1.1.13 (подключаются с CDN).
- Картинки и видео загружаются с CloudFront.
- Деплой: GitHub Actions (`.github/workflows/pages.yml`) копирует `index.html` в GitHub Pages при пуше в `main`.
- `site/assets/*.b64` — старые картинки бренда, на сайте сейчас не используются.
