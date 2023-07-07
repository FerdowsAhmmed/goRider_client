import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibXNhYmlkNzciLCJhIjoiY2xpZTIzaWh4MDZqazNkcGRoNHpxZ3d5MCJ9.7udU4s-plvymOXOvY6XSFw";

const MapBoxComponent = ({ onOriginLogged, onDestinationLogged }) => {
  const longitude = 90.4125; 
  const latitude = 23.8103; 

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "mapContainerRef",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude],
      zoom: 8,
    });

    map.addControl(new mapboxgl.NavigationControl());

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
    });
    map.addControl(directions, "top-left");

    // Set default origin and destination
    // directions.setOrigin([90.4071, 23.8103]); 
    // directions.setDestination([longitude, latitude]);

    // Log the new location when the directions origin or destination changes
    directions.on("origin", (e) => {
      logLocation("Origin", e.feature.geometry.coordinates, onOriginLogged);
    });

    directions.on("destination", (e) => {
      logLocation("Destination", e.feature.geometry.coordinates, onDestinationLogged);
    });

    // Simulate a click event to trigger the directions
    const mapContainer = document.getElementById("mapContainerRef");
    mapContainer.addEventListener("click", () => {
      directions._onClickGeolocate();
    });

    return () => {
      map.remove();
    };
  }, [longitude, latitude]);

  const logLocation = (locationType, coordinates, callback) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=${mapboxgl.accessToken}`
    )
      .then((response) => response.json())
      .then((data) => {
        const placeName = data.features[0].place_name;
        const loggedData = {
          locationType,
          placeName,
          coordinates,
          additionalInfo: data.features[0].properties,
        };
        callback(loggedData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return <div id="mapContainerRef" className="w-full h-full"></div>;
};

export default MapBoxComponent;
