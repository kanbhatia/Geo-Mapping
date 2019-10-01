// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
    center: [41.099017, -114.113293],
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
        mag = quake.properties.mag;
        place = quake.properties.place;
        if (mag <1) {
            color = "#CCFF99";
        }
        else if (mag <2) {
            color = "#66FF99";
        }
        else if (mag <3) {
            color = "#FF9999";
        }
        else if (mag <4) {
            color = "#ff9966";
        }
        else if (mag <5) {
            color = "#ff5050";
        }
        else {
            color = "#ff0000";
        }
        L.circle([lat, lon], {
            color: "black",
            weight: 0.5,
            fillColor: color,
            fillOpacity: 1,
            radius: mag*20000
        }).bindPopup("<h1>" + place + "</h1> <hr> <h3> Magnitude: " +mag+ "</h3>").addTo(myMap);
    });
};

function markerColor(d) {
    return d === 1  ? "#CCFF99" :
           d === 2  ? "#66FF99" :
           d === 3 ? "#FF9999" :
           d === 4 ? "#ff9966" :
           d === 5 ? "#ff5050" :
                        "#ff0000";
}

var legend = L.control({position: 'bottomright'});

 legend.onAdd = function () {
     var div = L.DomUtil.create('div', 'info legend'),
         magnitudes = [0, 1, 2, 3, 4, 5];
     for (var i = 0; i < magnitudes.length; i++) {
         div.innerHTML +=
             '<i style="background:' + markerColor(magnitudes[i] + 1) + '"></i> ' +
     + magnitudes[i] + (magnitudes[i + 1] ? ' - ' + magnitudes[i + 1] + '<br>' : ' + ');
     }
     return div;
 };
 legend.addTo(myMap);


var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
d3.json(url, earthquake);