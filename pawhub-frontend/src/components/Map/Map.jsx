import { React, useCallback, useMemo, useRef, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Places from "./Places";

export default function Map() {
  const [location, setLocation] = useState();

  // MapRef is an instance of <GoogleMap />
  const mapRef = useRef();
  // Coordinates for Oakridge Mall
  const center = useMemo(() => ({ lat: 49.232332, lng: -123.116773 }), []);
  const options = useMemo(
    () => ({
      mapId: "30817c9c0541d59e",
      disableDefaultUI: true,
    }),
    []
  );

  // a function that generates a version on initial render, and won't re-generate unless dependencies change (we have none in arr)
  // (for optimization of re-rendering)
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDRii-QG1bSXUWEz7bypIOSrFS7y68PDtM",
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="map-page-container">
      <div className="map-controls">
        <h1 className="map-text">Search</h1>

        <Places
          setLocation={(position) => {
            setLocation(position);
            mapRef.current?.panTo(position);
          }}
        />
      </div>

      <div className="map">
        <GoogleMap
          zoom={12}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        ></GoogleMap>
      </div>
    </div>
  );
}
