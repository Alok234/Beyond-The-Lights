/* MAIN MODULE
   নতুন অধ্যায় যোগ করতে chapters তালিকায় ফাইলের নাম যোগ করুন।
   অধ্যায়ের লেখা বদলাতে সংশ্লিষ্ট chapters/*.html ফাইল সম্পাদনা করুন।
*/
const chapterFiles = [
 "chapters/01-introduction.html",
 "chapters/02-ancient-history.html",
 "chapters/03-ramayana.html",
 "chapters/04-krishna.html",
 "chapters/05-lakshmi.html",
 "chapters/06-five-days.html",
 "chapters/07-bengal.html",
 "chapters/08-bangladesh.html",
 "chapters/09-other-traditions.html",
 "chapters/10-world-map.html",
 "chapters/11-timeline.html",
 "chapters/12-culture.html",
 "chapters/13-interactive-diya.html",
 "chapters/14-humanity.html",
 "chapters/15-sources.html"
];

async function loadChapters(){
  const target = document.getElementById("chapters");
  try{
    const sections = await Promise.all(chapterFiles.map(async file=>{
      const response = await fetch(file);
      if(!response.ok) throw new Error("ফাইল পাওয়া যায়নি: "+file);
      return await response.text();
    }));
    target.innerHTML = sections.join("\n");
    initializeInteractions();
  }catch(error){
    target.innerHTML = `<div class="loading">
      অধ্যায় লোড করা যায়নি। GitHub Pages বা কোনো local web server দিয়ে
      ওয়েবসাইটটি চালান।<br><small>${error.message}</small>
    </div>`;
    console.error(error);
  }
}

function initializeInteractions(){
  const menuButton = document.getElementById("menuButton");
  const navlinks = document.getElementById("navlinks");
  menuButton.addEventListener("click",()=>navlinks.classList.toggle("show"));
  navlinks.querySelectorAll("a").forEach(a=>{
    a.addEventListener("click",()=>navlinks.classList.remove("show"));
  });

  function updateProgress(){
    const top = window.scrollY;
    const max = document.documentElement.scrollHeight-window.innerHeight;
    document.getElementById("progress").style.width =
      (max>0 ? top/max*100 : 0)+"%";
  }
  window.addEventListener("scroll",updateProgress,{passive:true});
  updateProgress();

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(!reduceMotion && "IntersectionObserver" in window){
    const observer = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },{threshold:.1});
    document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
  }else{
    document.querySelectorAll(".reveal").forEach(el=>el.classList.add("visible"));
  }

  const diya = document.getElementById("diya");
  if(diya){
    const messages = [
      "আলো জ্বালুক জ্ঞানের পথে।",
      "অন্ধকার যত গভীর হোক, আশার মূল্য কমে না।",
      "সহমর্মিতাই মানুষের সবচেয়ে সুন্দর আলো।",
      "ভিন্নতার মধ্যেও সম্মান বেঁচে থাকুক।",
      "একটি ছোট ভালো কাজও পৃথিবীকে আলোকিত করতে পারে।"
    ];
    let i=0;
    function light(){
      diya.classList.add("lit");
      document.getElementById("diyaMessage").textContent=messages[i];
      i=(i+1)%messages.length;
    }
    diya.addEventListener("click",light);
    diya.addEventListener("keydown",e=>{
      if(e.key==="Enter"||e.key===" "){e.preventDefault();light();}
    });
  }

  document.querySelectorAll(".promise").forEach(button=>{
    button.addEventListener("click",()=>{
      document.querySelectorAll(".promise").forEach(b=>b.classList.remove("selected"));
      button.classList.add("selected");
      document.getElementById("promiseResult").textContent =
        "আমার অঙ্গীকার: "+button.textContent+"।";
    });
  });

  if(window.initDiwaliMap) window.initDiwaliMap();
}

loadChapters();
