import { React, useCallback, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function Map() {
  // const mapRef = useRef();
  // Coordinates for Oakridge Mall
  const center = useMemo(() => ({ lat: 49.232332, lng: -123.116773 }), []);
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
    }),
    []
  );

  const onLoad = useCallback();

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
      </div>

      <div className="map">
        <GoogleMap
          zoom={12}
          center={center}
          mapContainerClassName="map-container"
          options={options}
        ></GoogleMap>
      </div>
    </div>
  );
}
