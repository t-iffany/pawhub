import { React, useCallback, useMemo, useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Circle,
} from "@react-google-maps/api";
import Places from "./places";
import { googleAPIKey, placeType } from "../../helpers/GooglePlacesAPI";

export default function Map() {
  const [location, setLocation] = useState();
  const libraries = ["places"];

  // MapRef is an instance of <GoogleMap />. This hook lets us reference this without re-rendering
  const mapRef = useRef();

  // Coordinates for Oakridge Mall
  const center = useMemo(() => ({ lat: 49.232332, lng: -123.116773 }), []);
  const options = useMemo(
    () => ({
      mapId: "30817c9c0541d59e",
      disableDefaultUI: false,
    }),
    []
  );

  // Map-circle colors
  const closeOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    zIndex: 3,
    fillOpacity: 0.125,
    strokeColor: "#8BC34A",
    fillColor: "#8BC34A",
  };

  // a function that generates a version on initial render, and won't re-generate unless dependencies change (we have none in arr)
  // (for optimization of re-rendering)
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleAPIKey,
    libraries,
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
            mapRef.current.panTo(position);
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
        >
          {location && (
            <>
              <Marker position={location} icon="" />
              <Circle center={location} radius={5000} options={closeOptions} />
            </>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}
