// Flow the content blocks into fixed A4 pages; a block never splits across pages.
(async function(){
  await document.fonts.ready;
  const flow = document.getElementById("flow");
  const blocks = Array.from(flow.children);
  const report = [];
  let page = null, bodyEl = null, n = 1; // cover is page 1
  const newPage = () => {
    n++;
    page = document.createElement("section"); page.className = "page";
    page.innerHTML = '<div class="pg-body"></div><footer><span>מדריך לקובץ האקסל · ניהול תקציב</span><span>עמוד ' + n + '</span></footer>';
    flow.before(page); bodyEl = page.querySelector(".pg-body");
  };
  for(const b of blocks){
    if(!page || (b.classList.contains("np") && bodyEl.children.length)) newPage();
    bodyEl.appendChild(b);
    if(bodyEl.scrollHeight > bodyEl.clientHeight + 1 && bodyEl.children.length > 1){
      bodyEl.removeChild(b); newPage(); bodyEl.appendChild(b);
    }
    if(bodyEl.scrollHeight > bodyEl.clientHeight + 1) report.push("page " + n + " overflows by " + (bodyEl.scrollHeight - bodyEl.clientHeight) + "px");
  }
  const fill = [];
  document.querySelectorAll(".page .pg-body").forEach((bd, i) => fill.push("p" + (i + 2) + ":" + Math.round(Array.from(bd.children).reduce((a, c) => Math.max(a, c.offsetTop + c.offsetHeight), 0) / bd.clientHeight * 100) + "%"));
  flow.remove();
  window.__report = { pages: n, problems: report, fill };
  window.__ready = true;
})();
