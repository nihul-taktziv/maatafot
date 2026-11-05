# ניהול פיננסי (maatafot)

Budget PWA in Hebrew (RTL). Data lives only on the device (localStorage), no server. Hosted on GitHub Pages from `main` at https://nihul-taktziv.github.io/maatafot/.

- `index.html` is the whole app (HTML, CSS, JS in one file). It is the source of truth.
- `maatafot.html` is the desktop build. Never edit it by hand: after any change to `index.html` run `python3 tools/build-desktop.py`.
- After any change that ships to users, bump `CACHE` in `sw.js` (`maatafot-vNN`) and the matching example in `README.md`, so installed phones pick up the update.
- For a change users would notice, also set `APP_VERSION` in `index.html` to the same NN and add a short Hebrew line at the top of `WHATS_NEW`; existing users see it once in a "מה חדש" popup (Settings → מה חדש reopens it). Small fixes can skip `WHATS_NEW`, but keep `APP_VERSION` equal to the cache number.
- `madrich-excel.pdf` is generated from `budget-planning.xlsx` by `tools/excel-guide/` (build.py writes HTML, render.js writes the PDF and reports overflow and page fill; keep one page per sheet). Regenerate after any change to the workbook.
- Test in headless Chromium at 390x844: welcome → tour → onboarding → home, then each tab. Coach balloons (`#cSkip`) cover the page after each navigation.
- Copyright: © בנימין אמבאו (Binyamin Ambaw), all rights reserved, see `LICENSE`. Keep the footer lines on the welcome screen and in Settings.
- User-facing text is Hebrew; reply to the owner in Hebrew.
