// Telegram WebApp: initData'ni so'rovlarga qo'shadi.
(function () {
  var initData = "";
  try {
    var tg = window.Telegram && window.Telegram.WebApp;
    initData = (tg && tg.initData) || "";
    if (tg) { tg.ready(); tg.expand(); tg.setHeaderColor && tg.setHeaderColor("#0f1216"); }
  } catch (e) { initData = ""; }
  window.tgInitData = initData;
  window.tgFetch = function (url, opts) {
    opts = opts || {};
    var h = opts.headers || {};
    if (initData) h["X-Tg-Init"] = initData;
    opts.headers = h;
    return fetch(url, opts);
  };
})();
