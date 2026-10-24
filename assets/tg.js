// Telegram WebApp initData: ishonchli aniqlash + har so'rovga qo'shish.
// Muammo: ba'zi klientlarda initData sahifa ochilganda bo'sh bo'ladi va keyin
// to'ladi; sahifalar orasida o'tishda URL hash (#tgWebAppData) yo'qoladi.
// Yechim: live -> hash -> sessionStorage (12 soatgacha) -> kutish (10s).
(function () {
  var KEY = "tg_init_v5";
  var MAX_AGE = 12 * 3600;
  var BASE = "https://maintenance-production-d87e.up.railway.app";

  // Nisbiy yo'l ("/api/...") GitHub Pages'ga emas, backendga ketishi kerak.
  function full(url) {
    return (typeof url === "string" && url.charAt(0) === "/") ? BASE + url : url;
  }

  function live() {
    try {
      var tg = window.Telegram && window.Telegram.WebApp;
      return (tg && tg.initData) || "";
    } catch (e) { return ""; }
  }
  function fromUrl() {
    try {
      var s = (location.hash || "") + "&" + (location.search || "");
      var m = s.match(/tgWebAppData=([^&]+)/);
      return m ? decodeURIComponent(m[1]) : "";
    } catch (e) { return ""; }
  }
  function fresh(d) {
    if (!d) return "";
    try {
      var m = d.match(/(?:^|&)auth_date=(\d+)/);
      if (!m) return d;
      var age = Math.floor(Date.now() / 1000) - parseInt(m[1], 10);
      return age <= MAX_AGE ? d : "";
    } catch (e) { return d; }
  }
  function cached() {
    try { return fresh(sessionStorage.getItem(KEY) || ""); } catch (e) { return ""; }
  }
  function save(d) {
    if (!d) return;
    try { sessionStorage.setItem(KEY, d); } catch (e) {}
  }
  function pick() {
    var d = fresh(live()) || fresh(fromUrl()) || cached() || fresh(window.tgInitData || "");
    if (d) save(d);
    return d;
  }

  window.tgInitData = pick();
  window.tgHasInit = function () { return !!pick(); };
  window.tgInitLen = function () { return pick().length; };
  window.tgRefreshInit = function () { window.tgInitData = pick(); return window.tgInitData; };

  try {
    var tg = window.Telegram && window.Telegram.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      tg.setHeaderColor && tg.setHeaderColor("#0f1216");
      tg.setBackgroundColor && tg.setBackgroundColor("#0f1216");
      tg.onEvent && tg.onEvent("viewportChanged", function () { tg.expand && tg.expand(); });
    }
  } catch (e) {}

  // initData tayyor bo'lguncha kutadi; bo'lmasa "" bilan qaytaradi.
  function wait(cb, ms) {
    var end = Date.now() + (ms || 10000);
    (function tick() {
      var d = pick();
      if (d || Date.now() > end) return cb(d || "");
      setTimeout(tick, 100);
    })();
  }

  window.tgWaitInit = wait;
  window.tgReady = function (cb) { wait(cb, 10000); };

  // initData yo'q bo'lsa so'rovni umuman yubormaymiz (serverda 401 shovqini bo'lmasin)
  // va foydalanuvchiga tushunarli xabar ko'rsatamiz.
  var NOINIT = "Ilovani Telegram ichida oching";
  function banner() {
    try {
      if (document.getElementById("tgNoInit")) return;
      var d = document.createElement("div");
      d.id = "tgNoInit";
      d.textContent = "⚠️ " + NOINIT + " — ma'lumot yuklanmaydi";
      d.style.cssText = "position:fixed;left:0;right:0;bottom:0;z-index:99999;padding:10px 14px;" +
        "background:#7f1d1d;color:#fff;font:500 13px/1.4 -apple-system,system-ui,sans-serif;text-align:center";
      (document.body || document.documentElement).appendChild(d);
    } catch (e) {}
  }
  function noInitResp() {
    var body = JSON.stringify({ ok: false, error: NOINIT, _noInit: true });
    var r = {
      ok: false, status: 0, statusText: "NO_INIT",
      headers: { get: function () { return "application/json"; } },
      text: function () { return Promise.resolve(body); },
      json: function () { return Promise.resolve(JSON.parse(body)); }
    };
    r.clone = function () { return r; };
    return r;
  }
  window.tgNoInitError = NOINIT;

  window.tgFetch = function (url, opts) {
    opts = opts || {};
    return new Promise(function (resolve, reject) {
      wait(function (d) {
        if (!d) { banner(); resolve(noInitResp()); return; }
        var h = opts.headers || {};
        h["X-Tg-Init"] = d;
        opts.headers = h;
        fetch(full(url), opts).then(resolve, reject);
      }, 8000);
    });
  };

  // JSON qaytaradi (Response emas) — sahifalarda to'g'ridan-to'g'ri ishlatiladi.
  window.tgJson = function (url, opts) {
    return window.tgFetch(url, opts).then(function (r) {
      return r.text().then(function (t) {
        var j;
        try { j = JSON.parse(t); } catch (e) { j = { ok: false, error: "server javobi noto'g'ri" }; }
        j._status = r.status;
        if (r.status === 401) {
          // initData eskirgan/bo'sh: keshni tozalaymiz, keyingi ochishda yangilanadi
          try { sessionStorage.removeItem(KEY); } catch (e) {}
          banner();
        }
        return j;
      });
    });
  };
})();

/* auto-update guard: sahifalar uchun */
(function(){try{
 var VER=32, k='tmt_ver';
 fetch('../version.json?_='+Date.now(),{cache:'no-store'}).then(function(r){return r.json()}).then(function(j){
  if(!j||!j.ver) return;
  var have=+(sessionStorage.getItem(k)||0);
  if(j.ver!==VER && have!==j.ver){sessionStorage.setItem(k,j.ver);location.replace(location.pathname+'?v='+j.ver);}
 }).catch(function(){});
}catch(e){}})();
