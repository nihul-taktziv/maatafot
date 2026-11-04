#!/usr/bin/env python3
"""Build the desktop version (maatafot.html) from the phone version (index.html).

The desktop file opens by double-click with no server, so it:
- embeds a small favicon instead of linking to icon files and the manifest
- sets window.__BUILD = "file"
- drops the service worker registration

Run from the repo root after every change to index.html:
    python3 tools/build-desktop.py
"""
import base64, io, sys
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent.parent
src = (root / "index.html").read_text(encoding="utf-8")

buf = io.BytesIO()
Image.open(root / "icon-192.png").resize((64, 64), Image.LANCZOS).save(buf, "PNG", optimize=True)
favicon = '<link rel="icon" type="image/png" href="data:image/png;base64,' + base64.b64encode(buf.getvalue()).decode() + '">'

PWA_HEAD = ('<link rel="manifest" href="manifest.webmanifest">\n'
            '<link rel="apple-touch-icon" href="icon-180.png">\n'
            '<link rel="icon" type="image/png" sizes="192x192" href="icon-192.png">\n'
            '<script>window.__BUILD="pwa";</script>')
SW = ('<script>\n'
      'if("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")){\n'
      '  window.addEventListener("load", function(){ navigator.serviceWorker.register("sw.js").catch(function(){}); });\n'
      '}\n'
      '</script>\n')

for name, block in (("head links", PWA_HEAD), ("service worker", SW)):
    if src.count(block) != 1:
        sys.exit(f"index.html: expected exactly one {name} block")

out = src.replace(PWA_HEAD, favicon + '\n<script>window.__BUILD="file";</script>').replace(SW, "")
(root / "maatafot.html").write_text(out, encoding="utf-8")
print("maatafot.html built")
