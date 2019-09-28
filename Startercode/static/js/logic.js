// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
    center: [45.52, -122.67],
    zoom: 5
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: "pk.eyJ1Ijoia2FuYmhhdGlhIiwiYSI6ImNrMTNuZXpsZzAzZWszY3J0bjkxODlsMTkifQ.xnTkF-5CwkzoWs8MpjiyQA"
}).addTo(myMap);

function earthquake(quake) {
    (quake.features).forEach(quake => {
        lon = quake.geometry.coordinates[0];
        lat = quake.geometry.coordinates[1];

        L.circle([lat, lon], {
            color: "green",
            fillColor: "green",
            fillOpacity: 0.75,
            radius: 5000
        }).addTo(myMap);
    });





}
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
d3.json(url, earthquake);