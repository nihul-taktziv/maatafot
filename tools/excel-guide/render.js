// Render tools/excel-guide/out/guide.html to madrich-excel.pdf (A4) and report layout problems.
// Usage: node tools/excel-guide/render.js [--png]   (--png also writes page previews to out/)
const { chromium } = require("playwright");
const path = require("path");
const dir = __dirname, root = path.resolve(dir, "../..");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 794, height: 1123 } });
  await p.goto("file://" + path.join(dir, "out/guide.html"));
  await p.waitForFunction(() => window.__ready === true, null, { timeout: 30000 });
  const rep = await p.evaluate(() => window.__report);
  console.log("pages:", rep.pages, rep.problems.length ? "PROBLEMS: " + rep.problems.join("; ") : "no overflow", "| fill:", rep.fill.join(" "));
  if (process.argv.includes("--png")) {
    const pages = await p.$$(".page");
    for (let i = 0; i < pages.length; i++) await pages[i].screenshot({ path: path.join(dir, "out", `p${String(i + 1).padStart(2, "0")}.png`) });
  }
  await p.pdf({ path: path.join(root, "madrich-excel.pdf"), format: "A4", printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 }, preferCSSPageSize: true });
  await b.close();
})();
