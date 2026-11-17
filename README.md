# گنجینه ی کتاب (نسخه‌ی GitHub Pages)

سایت کاملاً ایستا است و به Node.js یا هیچ سرور/API نیاز ندارد.

- اطلاعات در **IndexedDB** مرورگر ذخیره می‌شود و با F5، Ctrl+F5 و بستن مرورگر پاک نمی‌شود.
- اطلاعات قدیمی `localStorage` (کلید `ganjine_local`) یک‌بار و بدون تکرار به IndexedDB منتقل می‌شود (localStorage حذف نمی‌شود).
- Service Worker (`sw.js`) و `manifest.webmanifest` اجرای آفلاین و نصب به‌صورت اپ را فراهم می‌کنند.
- **مهم:** داده‌ها مخصوص هر مرورگر/دستگاه است. برای انتقال یا پشتیبان‌گیری از «تنظیمات ← پشتیبان‌گیری و بازیابی» استفاده کنید.
- اختیاری: فایل پشتیبان را با نام `seed.json` کنار `index.html` بگذارید تا مرورگرهای جدید (که هنوز داده ندارند) با آن شروع کنند.

## فایل‌هایی که باید در GitHub باشند
index.html، sw.js، manifest.webmanifest، .nojekyll، logo.png، bootstrap.rtl.min.css، bootstrap.bundle.min.js،
bootstrap-icons.min.css، bootstrap-icons.woff2، bootstrap-icons.woff، vazirmatn.css، vazirmatn-*.woff2 (۴۰۰ تا ۹۰۰)، xlsx.full.min.js

برای انتشار: Settings ← Pages ← Deploy from a branch ← main / root.
