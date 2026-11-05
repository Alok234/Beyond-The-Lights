BEYOND THE LIGHTS — MODULAR WEBSITE
====================================

কীভাবে ব্যবহার করবেন
--------------------
1. ZIP ফাইল Extract করুন।
2. পুরো "beyond-the-lights" folder GitHub repository-তে upload করুন।
3. ফোল্ডার ও ফাইলের নাম একই রাখুন।
4. GitHub → Settings → Pages → Deploy from a branch → main / root নির্বাচন করুন।
5. প্রকাশিত ওয়েবসাইট খুলে দেখুন।

গুরুত্বপূর্ণ:
- শুধু index.html খুলে iPhone-এর Files app-এ preview করলে chapter fetch কাজ নাও করতে পারে।
  এটি GitHub Pages বা local web server দিয়ে চালাতে হবে।
- ইন্টারনেট প্রয়োজন: Google Fonts, Leaflet map library, OpenStreetMap tiles এবং remote artwork।
- map-এ নতুন জায়গা যোগ/পরিবর্তন: data/places.js
- map-এর আচরণ পরিবর্তন: js/map.js
- animation/menu/diya interaction: js/main.js
- সব design/color/font: css/style.css
- ইতিহাসের লেখা/ছবি পরিবর্তন: chapters ফোল্ডারের সংশ্লিষ্ট HTML ফাইল।
- নতুন অধ্যায় যোগ: chapters-এ নতুন HTML ফাইল তৈরি করে js/main.js-এর chapterFiles তালিকায় ফাইলের path যোগ করুন।
- ইতিহাসের দাবি প্রকাশের আগে নির্ভরযোগ্য বই/গবেষণা দিয়ে যাচাই করুন।

ফোল্ডার:
index.html             মূল পেজ ও navigation
css/style.css          সব ডিজাইন
js/main.js             chapter loader ও interaction
js/map.js              interactive map
data/places.js         map-এর স্থান ও বিবরণ
chapters/              প্রতিটি অধ্যায়ের আলাদা HTML
