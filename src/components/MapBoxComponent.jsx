import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibXNhYmlkNzciLCJhIjoiY2xpZTIzaWh4MDZqazNkcGRoNHpxZ3d5MCJ9.7udU4s-plvymOXOvY6XSFw";

const MapBoxComponent = () => {
  const mapContainerRef = useRef(null);
  const longitude = -74.006;
  const latitude = 40.7128;

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude],
      zoom: 12,
    });

    map.addControl(new mapboxgl.NavigationControl());

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
    });
    map.addControl(directions, "top-left");

    return () => {
      map.remove();
    };
  }, [longitude, latitude]);

  return (
    <div className="mapContainer">
      <div ref={mapContainerRef} style={{ width: "100%", height: "400px" }} />
    </div>
  );
};

export default MapBoxComponent;
