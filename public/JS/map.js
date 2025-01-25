let map = L.map('map').setView([cordinate[1], cordinate[0]], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// ? Adding Marker
L.marker([cordinate[1], cordinate[0]]).addTo(map);

// ? Adding circle
L.circle([cordinate[1], cordinate[0]], {
  fillColor: '#f5d3d7',
  fillOpacity: 0.5,
  radius: 500
}).addTo(map);

// ? Pop up for marker
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

console.log(cordinate);
console.log(cordinate[1], cordinate[0]);