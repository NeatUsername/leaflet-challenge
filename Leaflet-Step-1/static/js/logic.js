// Creating map object
var myMap = L.map("map", {
  center: [37.79, -28.30],
  zoom: 3
});

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Store API query variables
var baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson";

// Assemble API query URL
var url = baseURL;

// Grab the data with d3
d3.json(url).then(function(response) {
  // console.log(response)

  // Create a new marker cluster group
  // var markers = L.markerClusterGroup();

  // Loop through data

  /* Testing small subset of data only */
  // for (var i = 0; i < 11; i++) {

  for (var i = 0; i < response.features.length; i++) {

    // Set the data location & magnitude properties to a variable
    var location_lat = response.features[i].geometry.coordinates[1];
    var location_long = response.features[i].geometry.coordinates[0];
    var eq_coord = [location_lat, location_long];
    var depth = response.features[i].geometry.coordinates[2];
    var magnitude = response.features[i].properties.mag

    // console.log(location_lat)
    // console.log(location_long)
    // console.log(eq_coord)
    // console.log(depth)
    // console.log(magnitude)

    console.log(Math.max(depth))

    // Condiitional formatting based on depth data [ See Exercise 1-7 for my inspiration]
    var color = "";
    if (depth < 10) {
      color = "green";
    }
    else if (depth >= 10 && depth < 30) {
      color = "yellowgreen";
    }
    else if (depth >= 30 && depth < 50) {
      color = "Yellow";
    }
    else if (depth >= 50 && depth < 70) {
      color = "orange";
    }
    else if (depth >= 70 && depth < 90) {
      color = "orangered";
    }
    else {
      color = "red";
    }

    
    // Circle graphics layer
    L.circle(eq_coord, {
      Opacity: 0.2,
      fillOpacity: 0.45,
      radius: magnitude * 40000,
      color: "purple",
      weight: 1,
      fillColor: color,
  }).bindPopup("<h3>" + "Test: Location Name Placeholder" +
  "</h3><hr><p>" + "Test:  Event Date Placeholder" + "</p>").addTo(myMap);


    // // Check for location property
    // if (location) {
    //   console.log(location)
    //   //     // Add a new marker to the cluster group and bind a pop-up
    //   //     markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
    //   //       .bindPopup(response[i].features.properties.mag));
    //   //   }

    //   // }

    //   // // Add our marker cluster layer to the map
    //   // myMap.addLayer(markers);

    // }
  }
});
