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
  InfoWindowF,
} from "@react-google-maps/api";
import Places from "./Places";
import {
  googleAPIKey,
  libraries,
  closeOptions,
  radius,
  defaultLat,
  defaultLng,
  getUrl,
} from "../../helpers/GooglePlacesAPI";
import axios from "axios";
import { Button } from "@mui/material";
import InfoBox from "./InfoBox";

export default function Map() {
  const [location, setLocation] = useState(null);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [placeType, setPlaceType] = useState("");
  const [nearbyLocations, setNearbyLocations] = useState([]);

  // console.log("place type", placeType);
  console.log("nearby", nearbyLocations);
  console.log("opening hours", selectedCenter);

  useEffect(() => {
    if (location && placeType) {
      const currentLat = location.lat;
      const currentLng = location.lng;

      axios
        .get(getUrl(currentLat, currentLng, radius, placeType))
        .then((res) => setNearbyLocations(res.data.results))
        .catch((err) => console.log(err));
    }
  }, [placeType, location]);

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
        <Button
          className="filter"
          variant="contained"
          onClick={() => setPlaceType("veterinary_care")}
        >
          Vets
        </Button>

        <Button
          className="filter"
          variant="contained"
          onClick={() => setPlaceType("pet_store")}
        >
          Pet Stores
        </Button>
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
            </>
          )}

          {nearbyLocations &&
            nearbyLocations.map((location, index) => {
              let lat = location.geometry.location.lat;
              let lng = location.geometry.location.lng;
              return (
                <Marker
                  key={index}
                  position={{ lat, lng }}
                  icon="http://maps.google.com/mapfiles/ms/micons/lightblue.png"
                  onClick={() =>
                    setSelectedCenter({
                      lat,
                      lng,
                      name: location.name,
                      address: location.vicinity,
                      open: location.opening_hours,
                      rating: location.rating,
                      user_ratings: location.user_ratings_total,
                    })
                  }
                />
              );
            })}

          {selectedCenter && (
            <InfoWindowF
              onCloseClick={() => {
                setSelectedCenter(null);
              }}
              position={{
                lat: selectedCenter.lat + 0.00001,
                lng: selectedCenter.lng,
              }}
            >
              <InfoBox
                name={selectedCenter.name}
                address={selectedCenter.address}
                open={selectedCenter.open}
                rating={selectedCenter.rating}
                user_rating={selectedCenter.user_ratings}
              />
            </InfoWindowF>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}
