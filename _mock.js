/* QA mock — fake Telegram WebApp + API responses */
(function(){
  var MOCK = {
    me:{ok:true,name:"Karimboy Xolmirzayev",manager:true,role:"manager"},
    staff:{ok:true,staff:[{cid:1054482233,name:"Karimboy Xolmirzayev",branch:"Chilonzor"},{cid:6147423013,name:"Xushnud Amirkulov",branch:"Yunusobod"}]},
    tasks:{ok:true,tasks:[
      {id:1,title:"Chilonzor — 3-qavat oynalarni tozalash",note:"Ehtiyot bo‘ling, 2 ta oyna ochilmaydi",status:"active",deadline:"2026-10-26",assignee_name:"Karimboy Xolmirzayev",repeat:"daily"},
      {id:2,title:"Konditsioner filtrlari",status:"active",deadline:"2026-10-24",assignee_name:"Xushnud Amirkulov",repeat:"once"},
      {id:3,title:"Yunusobod — suv nasosi tekshiruvi",status:"active",deadline:null,assignee_name:"Karimboy Xolmirzayev",repeat:"weekly"}
    ]},
    ranking:{ok:true,scope:["Chilonzor","Yunusobod"],rows:[
      {rank:1,name:"Xushnud Amirkulov Mutallabovich",score:20,branch:"Chilonzor",rooms_done:3,photos:2,tasks_done:1,overdue:0},
      {rank:2,name:"Karimboy Xolmirzayev",score:14,branch:"Yunusobod",rooms_done:2,photos:1,tasks_done:0,overdue:0},
      {rank:3,name:"Aziz Karimov",score:0,branch:"Chilonzor",rooms_done:0,photos:0,tasks_done:0,overdue:1}
    ],coords:[{rank:1,name:"Xurshid",score:10,branches:["Chilonzor"],rooms_done:5,rooms_total:12,ontime:1,overdue:0}]},
    report:{ok:true,date:"25.10.2026",period:"today",att_total:2,att:{Chilonzor:2},
      branches:{Chilonzor:{done:2,total:6},Yunusobod:{done:3,total:4}},
      tasks:{done:3,active:2,overdue:1,overdue_list:[{title:"Konditsioner filtrlari",name:"Xushnud Amirkulov",deadline:"25.10 18:00"}]},
      top:[{name:"Xushnud Amirkulov",score:20},{name:"Karimboy Xolmirzayev",score:14},{name:"Sardor",score:4}],
      can_send:true},
    attendance:{ok:true,state:"in",t_in:"08:52",t_out:null},
    rooms:{ok:true,manager:true,branch:null,branches:[
      {branch:"Chilonzor",total:6,done:2,rooms:[
        {id:1,name:"101 — Direktor xonasi",photos:2,need:2},{id:2,name:"102 — O'quv xonasi",photos:2,need:2},
        {id:3,name:"201 — IELTS guruhi",photos:0,need:2},{id:4,name:"202 — Kutubxona",photos:1,need:2},
        {id:5,name:"301 — Majlis zali",photos:0,need:2},{id:6,name:"WC — 2-qavat",photos:2,need:2}]},
      {branch:"Yunusobod",total:4,done:3,rooms:[
        {id:7,name:"101 — Qabul",photos:2,need:2},{id:8,name:"102 — A1 guruhi",photos:2,need:2},
        {id:9,name:"201 — B1 guruhi",photos:2,need:2},{id:10,name:"WC",photos:0,need:2}]}]},
    books:{ok:true,updated_at:"25.10.2026 09:40",
      branches:["Chilonzor","Yunusobod"],
      stock:{Chilonzor:{A1:24,A2:18,"B1":12,"B1+":6,Novice:9,"IELTS Standard":15,Copybook:30},
             Yunusobod:{A1:10,A2:8,"B1":5,"B1+":2,Novice:4,"IELTS Standard":7,Copybook:12}},
      orders:[{id:7,status:"zakaz berildi",branch:"Chilonzor",created_at:"23.10.2026",
        items:[{level:"A1",qty:10},{level:"Copybook",qty:20}]}]},
    photos:{ok:true,date:"2026-10-25",branch:"Chilonzor",manager:true,can_manage:true,
      scope:["Chilonzor","Yunusobod"],branches:["Chilonzor","Yunusobod"],
      checked:3,total:4,photos:7,rooms:[
        {branch:"Chilonzor",room:"101 — Direktor xonasi",worker:"Xushnud Amirkulov",cid:6147423013,photos:2,done:true,
         files:[{url:"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><rect width='300' height='300' fill='rgb(70,58,86)'/><circle cx='150' cy='128' r='42' fill='rgb(196,204,216)' opacity='0.55'/><rect x='70' y='196' width='160' height='16' rx='8' fill='rgb(196,204,216)' opacity='0.28'/></svg>",id:"ph1"},{url:"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><rect width='300' height='300' fill='rgb(52,80,74)'/><circle cx='150' cy='128' r='42' fill='rgb(196,204,216)' opacity='0.55'/><rect x='70' y='196' width='160' height='16' rx='8' fill='rgb(196,204,216)' opacity='0.28'/></svg>",id:"ph2"}]},
        {branch:"Chilonzor",room:"102 — O'quv xonasi",worker:"Karimboy Xolmirzayev",cid:1054482233,photos:3,done:true,
         files:[{url:"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><rect width='300' height='300' fill='rgb(84,70,52)'/><circle cx='150' cy='128' r='42' fill='rgb(196,204,216)' opacity='0.55'/><rect x='70' y='196' width='160' height='16' rx='8' fill='rgb(196,204,216)' opacity='0.28'/></svg>",id:"ph3"},{url:"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><rect width='300' height='300' fill='rgb(58,66,92)'/><circle cx='150' cy='128' r='42' fill='rgb(196,204,216)' opacity='0.55'/><rect x='70' y='196' width='160' height='16' rx='8' fill='rgb(196,204,216)' opacity='0.28'/></svg>",id:"ph4"},{url:"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><rect width='300' height='300' fill='rgb(80,56,62)'/><circle cx='150' cy='128' r='42' fill='rgb(196,204,216)' opacity='0.55'/><rect x='70' y='196' width='160' height='16' rx='8' fill='rgb(196,204,216)' opacity='0.28'/></svg>",id:"ph5"}]},
        {branch:"Chilonzor",room:"201 — IELTS guruhi",worker:"Aziz Karimov",cid:999,photos:2,done:true,
         files:[{url:"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><rect width='300' height='300' fill='rgb(48,74,86)'/><circle cx='150' cy='128' r='42' fill='rgb(196,204,216)' opacity='0.55'/><rect x='70' y='196' width='160' height='16' rx='8' fill='rgb(196,204,216)' opacity='0.28'/></svg>",id:"ph6"},{url:"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><rect width='300' height='300' fill='rgb(64,72,84)'/><circle cx='150' cy='128' r='42' fill='rgb(196,204,216)' opacity='0.55'/><rect x='70' y='196' width='160' height='16' rx='8' fill='rgb(196,204,216)' opacity='0.28'/></svg>",id:"ph7"}]},
        {branch:"Chilonzor",room:"202 — Kutubxona",worker:"Aziz Karimov",cid:999,photos:0,done:false,files:[]}
      ]},
    coordinators:{ok:true,branches:["Chilonzor","Yunusobod","Mirzo Ulug'bek"],
      staff:[{cid:1054482233,name:"Karimboy Xolmirzayev",branch:"Chilonzor"},
             {cid:6147423013,name:"Xushnud Amirkulov",branch:"Yunusobod"},
             {cid:777,name:"Xurshid",branch:"Mirzo Ulug'bek"}],
      coordinators:[{cid:777,name:"Xurshid",branches:["Mirzo Ulug'bek"]}]},
    admin:{ok:true,is_owner:true,
      staff:[{cid:1054482233,name:"Karimboy Xolmirzayev",role:"manager",branch:"Chilonzor",status:"active"},
             {cid:6147423013,name:"Xushnud Amirkulov",role:"staff",branch:"Yunusobod",status:"active"}],
      branches:[{name:"Chilonzor",staff:5,done:2,rooms:6},{name:"Yunusobod",staff:3,done:3,rooms:4}],
      coordinators:[{name:"Xurshid",branch:"Mirzo Ulug'bek"}],
      pending:[{cid:888,name:"Yangi Xodim",branch:"Chilonzor",shift:"morning"}]},
  };
  function pick(u){
    if(u.indexOf("/admin/pending")>=0) return {ok:true,pending:MOCK.admin.pending};
    if(u.indexOf("/admin")>=0) return MOCK.admin;
    if(u.indexOf("/coordinators")>=0) return MOCK.coordinators;
    if(u.indexOf("/attendance")>=0) return MOCK.attendance;
    if(u.indexOf("/books")>=0) return MOCK.books;
    if(u.indexOf("/rooms/photos")>=0) return MOCK.photos;
    if(u.indexOf("/rooms")>=0) return MOCK.rooms;
    if(u.indexOf("/report")>=0) return MOCK.report;
    if(u.indexOf("/api/webapp/me")>=0) return MOCK.me;
    if(u.indexOf("/staff")>=0) return MOCK.staff;
    if(u.indexOf("/tasks")>=0) return MOCK.tasks;
    if(u.indexOf("/ranking")>=0) return MOCK.ranking;
    return {ok:true};
  }
  var WA = {
    initData:'query_id=AAHmock&user=%7B%22id%22%3A1054482233%2C%22first_name%22%3A%22Karim%22%7D&auth_date=' + Math.floor(Date.now()/1000) + '&hash=mock',
    initDataUnsafe:{user:{id:1054482233,first_name:"Karimboy",last_name:"Xolmirzayev",username:"karimboiy17"}},
    ready:function(){}, expand:function(){}, close:function(){},
    colorScheme:"dark", themeParams:{}, onEvent:function(){},
    setHeaderColor:function(){}, setBackgroundColor:function(){},
    HapticFeedback:{impactOccurred:function(){},notificationOccurred:function(){}}
  };
  // Force our object over the real SDK (SDK makes initData read-only).
  var store = {WebApp:WA};
  function force(){
    try {
      if (window.Telegram !== store) {
        Object.defineProperty(window, "Telegram", {configurable:true, writable:true, value:store});
      }
      if (store.WebApp.initData !== WA.initData) { store.WebApp = WA; }
    } catch(e) {}
  }
  force();
  var n = 0, iv = setInterval(function(){ force(); if (++n > 60) clearInterval(iv); }, 25);
  var _fetch = window.fetch;
  window.fetch = function(u, o){
    var url = String(u && u.url ? u.url : u);
    if (url.indexOf("up.railway.app") >= 0 || url.indexOf("/api/") === 0) {
      return Promise.resolve({
        ok:true, status:200, headers:{get:function(){return "application/json";}},
        json:function(){ return Promise.resolve(pick(url)); },
        text:function(){ return Promise.resolve(JSON.stringify(pick(url))); }
      });
    }
    return _fetch.apply(window, arguments);
  };
})();
