// Bo'lim ochilganda: "yangi" banner ko'rsatadi va o'qilgan deb belgilaydi.
// <body data-sec="tasks"> bo'lishi shart.
(function () {
  function start() {
    var sec = "";
    try { sec = (document.body.getAttribute("data-sec") || "").toLowerCase(); } catch (e) {}
    if (!sec || !window.tgJson) return;

    function bar(n) {
      try {
        var d = document.createElement("div");
        d.className = "notifbar";
        var s = document.createElement("span");
        s.textContent = "\uD83D\uDD14 " + n + " ta yangi — pastda";
        var x = document.createElement("i");
        x.textContent = "yopish";
        x.onclick = function () { if (d.parentNode) d.parentNode.removeChild(d); };
        d.appendChild(s); d.appendChild(x);
        var host = document.querySelector(".wrap") || document.body;
        host.insertBefore(d, host.firstChild);
        setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); }, 9000);
      } catch (e) {}
    }

    window.tgJson("/api/webapp/me").then(function (j) {
      if (j && j.ok && j.counts && j.counts[sec] > 0) bar(j.counts[sec]);
      window.tgJson("/api/tmt/seen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: sec })
      });
    }).catch(function () {});
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
