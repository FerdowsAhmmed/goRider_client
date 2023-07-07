import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibXNhYmlkNzciLCJhIjoiY2xpZTIzaWh4MDZqazNkcGRoNHpxZ3d5MCJ9.7udU4s-plvymOXOvY6XSFw";

const ConfirmMap = ({ destination, origin }) => {
  const longitude = 90.4125;
  const latitude = 23.8103;

  const defaultDestinationLongitude = destination.Longitude;
  const defaultDestinationLatitude = destination.Latitude;
  const defaultOriginLongitude = origin.Longitude;
  const defaultOriginLatitude = origin.Latitude;

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "mapContainerRef",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude],
      zoom: 8,
    });

    // Draw a line between origin and destination coordinates
    map.on("load", () => {
      map.addSource("line", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [
              [defaultOriginLongitude, defaultOriginLatitude],
              [defaultDestinationLongitude, defaultDestinationLatitude],
            ],
          },
        },
      });

      map.addLayer({
        id: "line",
        type: "line",
        source: "line",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#0074D9",
          "line-width": 4,
        },
      });

      // Add markers for origin and destination
      const originMarker = new mapboxgl.Marker({ color: "#FF4136" })
        .setLngLat([defaultOriginLongitude, defaultOriginLatitude])
        .addTo(map);

      const destinationMarker = new mapboxgl.Marker({ color: "#2ECC40" })
        .setLngLat([defaultDestinationLongitude, defaultDestinationLatitude])
        .addTo(map);
    });

    return () => {
      map.remove();
    };
  }, [longitude, latitude]);

  return <div id="mapContainerRef" className="w-full h-full"></div>;
};

export default ConfirmMap;
