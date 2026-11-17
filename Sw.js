// Service Worker گنجینه ی کتاب — اجرای آفلاین روی GitHub Pages
const CACHE="ganjine-static-v1";
const PRECACHE=[
  "./","./index.html","./manifest.webmanifest","./logo.png",
  "./bootstrap.rtl.min.css","./bootstrap.bundle.min.js","./bootstrap-icons.min.css",
  "./bootstrap-icons.woff2","./bootstrap-icons.woff","./vazirmatn.css",
  "./vazirmatn-400.woff2","./vazirmatn-500.woff2","./vazirmatn-600.woff2",
  "./vazirmatn-700.woff2","./vazirmatn-800.woff2","./vazirmatn-900.woff2",
  "./xlsx.full.min.js"
];

self.addEventListener("install",e=>{
  e.waitUntil((async()=>{
    const c=await caches.open(CACHE);
    // اگر فایلی وجود نداشت، نصب شکست نخورد
    await Promise.all(PRECACHE.map(u=>c.add(new Request(u,{cache:"reload"})).catch(()=>{})));
    self.skipWaiting();
  })());
});

self.addEventListener("activate",e=>{
  e.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch",e=>{
  const req=e.request;
  if(req.method!=="GET")return;
  const url=new URL(req.url);
  if(!/^https?:$/.test(url.protocol))return;

  // صفحه‌ها: اول شبکه (برای دریافت نسخه‌ی جدید)، در صورت قطعی از حافظه
  if(req.mode==="navigate"){
    e.respondWith((async()=>{
      try{
        const res=await fetch(req);
        if(res&&res.ok){const c=await caches.open(CACHE);c.put("./index.html",res.clone()).catch(()=>{})}
        return res;
      }catch(err){
        return (await caches.match("./index.html"))||(await caches.match("./"))||Response.error();
      }
    })());
    return;
  }

  // بقیه‌ی فایل‌ها: اول حافظه، همزمان به‌روزرسانی در پس‌زمینه
  e.respondWith((async()=>{
    const cached=await caches.match(req);
    const update=fetch(req).then(res=>{
      if(res&&(res.ok||res.type==="opaque")){caches.open(CACHE).then(c=>c.put(req,res.clone())).catch(()=>{})}
      return res;
    }).catch(()=>null);
    return cached||(await update)||Response.error();
  })());
});