# ניהול תקציב (maatafot)

Budget PWA in Hebrew (RTL). Data lives only on the device (localStorage), no server. Hosted on GitHub Pages from `main` at https://nihul-taktziv.github.io/maatafot/.

- `index.html` is the whole app (HTML, CSS, JS in one file). It is the source of truth.
- `maatafot.html` is the desktop build. Never edit it by hand: after any change to `index.html` run `python3 tools/build-desktop.py`.
- After any change that ships to users, bump `CACHE` in `sw.js` (`maatafot-vNN`) and the matching example in `README.md`, so installed phones pick up the update.
- Test in headless Chromium at 390x844: welcome → tour → onboarding → home, then each tab. Coach balloons (`#cSkip`) cover the page after each navigation.
- Copyright: © בנימין אמבאו (Binyamin Ambaw), all rights reserved, see `LICENSE`. Keep the footer lines on the welcome screen and in Settings.
- User-facing text is Hebrew; reply to the owner in Hebrew.
