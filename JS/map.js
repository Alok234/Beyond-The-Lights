/* MAP MODULE
   Map-এর জায়গা/বর্ণনা বদলাতে data/places.js সম্পাদনা করুন।
*/
window.initDiwaliMap = function(){
  const mapElement = document.getElementById("map");
  if(!mapElement || !window.L || !window.DIWALI_PLACES) return;
  if(mapElement.dataset.initialized) return;
  mapElement.dataset.initialized = "true";

  const places = window.DIWALI_PLACES;
  const map = L.map("map",{scrollWheelZoom:false}).setView([25.5,83.5],5);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:"&copy; OpenStreetMap contributors",maxZoom:12
  }).addTo(map);

  const buttons = document.getElementById("mapButtons");
  const info = document.getElementById("placeInfo");

  function showPlace(place,index){
    info.innerHTML = `<div class="kicker">HISTORICAL LOCATION</div>
      <h3>${place.name}</h3><p><b>${place.title}</b></p><p>${place.text}</p>`;
    buttons.querySelectorAll(".map-btn").forEach((b,i)=>b.classList.toggle("active",i===index));
    map.flyTo(place.coords,7,{duration:.7});
  }

  places.forEach((place,index)=>{
    const marker = L.marker(place.coords).addTo(map);
    marker.bindPopup(`<b>${place.name}</b><br>${place.title}`);
    marker.on("click",()=>showPlace(place,index));
    const button = document.createElement("button");
    button.className = "map-btn";
    button.textContent = place.name;
    button.addEventListener("click",()=>showPlace(place,index));
    buttons.appendChild(button);
  });
  setTimeout(()=>map.invalidateSize(),250);
};