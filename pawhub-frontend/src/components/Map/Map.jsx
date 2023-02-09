import {
  React,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Circle,
} from "@react-google-maps/api";
import Places from "./Places";
import {
  googleAPIKey,
  placeType,
  libraries,
  closeOptions,
  radius,
  defaultLat,
  defaultLng,
  getUrl,
} from "../../helpers/GooglePlacesAPI";
import axios from "axios";

export default function Map() {
  const [location, setLocation] = useState();

  useEffect(() => {
    if (location) {
      const currentLat = location.lat;
      const currentLng = location.lng;

      axios
        .get(getUrl(currentLat, currentLng, radius, placeType))
        .then((res) => console.log(res.data.results))
        .catch((err) => console.log(err));
    }
  }, [location]);

  // MapRef is an instance of <GoogleMap />. This hook lets us reference this without re-rendering
  const mapRef = useRef();

  // Coordinates for Oakridge Mall
  const center = useMemo(() => ({ lat: defaultLat, lng: defaultLng }), []);
  const options = useMemo(
    () => ({
      mapId: "30817c9c0541d59e",
      disableDefaultUI: false,
    }),
    []
  );

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
              <Circle
                center={location}
                radius={radius}
                options={closeOptions}
              />
              <Marker />
            </>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}
