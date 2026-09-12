# Repository Guidelines

## Project Structure & Module Organization

This directory contains the `mdm` Hexo theme. Page-level EJS templates live in `layout/` (`index.ejs`, `post.ejs`, `archive.ejs`), while reusable UI fragments belong in `layout/partials/`; advertising fragments are further grouped under `layout/partials/ad/`. Browser assets are organized under `source/`: use `source/css/` for styles, `source/js/` for theme behavior, `source/libs/` for vendored components, and `source/pwa-icon/` for installable-app icons. Translations live in `languages/en.yml` and `languages/zh-CN.yml`. Theme options and feature flags are defined in `_config.yml`. Treat files in `HexoWriteTool/` as bundled artifacts, especially the executable.

## Build, Test, and Development Commands

Run Hexo commands from the site root, two levels above this theme:

```powershell
cd ..\..
npm install
npm run server
npm run clean
npm run build
```

`npm install` restores the locked dependencies. `npm run server` starts the local preview server. `npm run clean` removes generated output and caches; follow it with `npm run build` to regenerate the static site. Reserve `npm run deploy` for intentional publishing, not routine validation.

## Coding Style & Naming Conventions

Follow `.editorconfig`: UTF-8, two-space indentation, a final newline, and no trailing whitespace (Markdown is exempt from trimming). Keep EJS page names lowercase and place shared markup in clearly named partials such as `headerbar.ejs`. Use camelCase for JavaScript functions and variables, semicolons, and existing DOM-oriented patterns. Keep CSS selectors descriptive and consistent with established kebab-case names such as `.article-section`.

## Testing Guidelines

There is no automated test suite or coverage threshold. Before submitting, preview the site and manually check the home, post, tag, category, archive, about, and 404 views. Test both desktop and narrow mobile widths, light/dark themes, navigation, scrolling, image loading, code blocks, and any configuration flag you changed. Check the browser console for errors.

## Commit & Pull Request Guidelines

Recent history uses short, action-focused subjects such as `Update _config.yml`. Keep commits focused and use an imperative summary, optionally naming the area: `Fix mobile header spacing`. Pull requests should explain the user-visible change, list configuration impacts, and describe manual checks. Include before/after screenshots for layout or styling changes and link relevant issues.

## Security & Agent Notes

Do not add real API keys, OAuth secrets, or deployment credentials to `_config.yml`; use safe placeholders in examples. Automated agents must preserve existing code comments and must not run build or compilation commands unless the user explicitly requests it.
