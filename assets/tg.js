// Telegram WebApp: initData'ni so'rovlarga qo'shadi.
// Ba'zi klientlarda (Telegram Desktop, eski WebView) initData sahifa
// yuklangandan keyin keladi — shuning uchun har so'rovda qayta o'qiladi.
(function () {
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
  function pick() {
    return live() || fromUrl() || window.tgInitData || "";
  }

  window.tgInitData = pick();
  try {
    var tg = window.Telegram && window.Telegram.WebApp;
    if (tg) { tg.ready(); tg.expand(); tg.setHeaderColor && tg.setHeaderColor("#0f1216"); }
  } catch (e) {}

  // initData kechikib kelsa — 200ms da tekshirib turamiz (5 soniya).
  var tries = 0;
  var timer = setInterval(function () {
    if (!window.tgInitData) window.tgInitData = pick();
    if (window.tgInitData || ++tries > 25) clearInterval(timer);
  }, 200);

  window.tgFetch = function (url, opts) {
    opts = opts || {};
    var h = opts.headers || {};
    var d = pick();
    if (d) h["X-Tg-Init"] = d;
    opts.headers = h;
    return fetch(url, opts);
  };

  // initData tayyor bo'lgach cb(data) chaqiradi (yoki 3s dan keyin "" bilan).
  window.tgReady = function (cb) {
    if (pick()) return cb(pick());
    var n = 0;
    var t = setInterval(function () {
      var d = pick();
      if (d) { clearInterval(t); cb(d); }
      else if (++n > 15) { clearInterval(t); cb(""); }
    }, 200);
  };
})();
