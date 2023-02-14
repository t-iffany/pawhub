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
  DirectionsRenderer,
} from "@react-google-maps/api";
import Places from "./Places";
import {
  libraries,
  closeOptions,
  defaultLat,
  defaultLng,
  getUrl,
  petStoreIcon,
  vetIcon,
  homeIcon,
  mapId,
} from "../../helpers/GooglePlacesAPI";
import axios from "axios";
import InfoBox from "./InfoBox";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Spinner from "react-bootstrap/Spinner";
import Slider from "./Slider";
import Distance from "./Distance";
import API_KEY from "../api_keys";

/* eslint-disable no-undef */

export default function Map() {
  const [state, setState] = useState({
    location: null,
    selectedCenter: null,
    placeType: null,
    nearbyLocations: [],
    circle: false,
    radius: 5000,
    directions: null,
  });

  // console.log("place type", placeType);
  // console.log("nearby", state.nearbyLocations);
  // console.log("opening hours", selectedCenter);
  // console.log("circle", state.circle);
  // console.log(state.nearbyLocations);
  // console.log("directions", state.directions);
  console.log("radius", state.radius);

  useEffect(() => {
    // console.log("circleref", circleRef);

    if (state.location) {
      setState((prev) => ({ ...prev, circle: true }));

      if (state.placeType) {
        const currentLat = state.location.lat;
        const currentLng = state.location.lng;

        axios
          .get(getUrl(currentLat, currentLng, state.radius, state.placeType))
          .then((res) =>
            setState((prev) => ({
              ...prev,
              nearbyLocations: res.data.results,
            }))
          )
          .catch((err) => console.log(err));
      }
    }
  }, [state.placeType, state.location, state.radius]);

  // MapRef is an instance of <GoogleMap />. This hook lets us reference this without re-rendering
  const mapRef = useRef();
  const circleRef = useRef();

  // Coordinates for Oakridge Mall
  const center = useMemo(() => ({ lat: defaultLat, lng: defaultLng }), []);
  const options = useMemo(
    () => ({
      mapId,
      disableDefaultUI: false,
    }),
    []
  );

  // a function that generates a version on initial render, and won't re-generate unless dependencies change (we have none in arr)
  // (for optimization of re-rendering)
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  const onCircleLoad = (circle) => {
    circleRef.current = circle;
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY.googleAPIKey,
    libraries,
  });

  const fetchDirections = (position) => {
    if (!state.location) {
      return;
    }

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: state.location,
        destination: state.selectedCenter,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setState((prev) => ({ ...prev, directions: result }));
        }
      }
    );
  };

  if (!isLoaded) {
    return <Spinner animation="border" />;
  }

  return (
    <div className="map-page-container">
      <div className="map-controls">
        <h1 className="map-text">Search</h1>

        <Places
          setLocation={(position) => {
            setState((prev) => ({
              ...prev,
              location: position,
              circle: false,
            }));
            mapRef.current.panTo(position);
          }}
          circleRef={circleRef}
        />

        <ToggleButtonGroup
          className="toggle-buttons"
          type="radio"
          name="options"
        >
          <ToggleButton
            id="tbg-radio-1"
            value={1}
            onClick={() =>
              setState((prev) => ({ ...prev, placeType: "veterinary_care" }))
            }
          >
            Veterinarians
          </ToggleButton>

          <ToggleButton
            id="tbg-radio-2"
            value={2}
            onClick={() =>
              setState((prev) => ({ ...prev, placeType: "pet_store" }))
            }
          >
            Pet Stores
          </ToggleButton>
        </ToggleButtonGroup>

        <Slider
          radius={state.radius}
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              radius: parseInt(e.target.value),
            }))
          }
        />

        {state.directions && (
          <Distance leg={state.directions.routes[0].legs[0]} />
        )}
      </div>

      <div className="map">
        <GoogleMap
          zoom={12}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
          id="google-map"
        >
          {state.directions && (
            <DirectionsRenderer directions={state.directions} />
          )}

          {state.location && (
            <Marker position={state.location} icon={homeIcon} />
          )}

          {circleRef.current && (
            <Circle
              ref={onCircleLoad}
              center={state.location}
              radius={state.radius + 500}
              options={closeOptions}
            />
          )}

          {state.nearbyLocations &&
            state.nearbyLocations.map((location, index) => {
              let lat = location.geometry.location.lat;
              let lng = location.geometry.location.lng;
              return (
                <Marker
                  key={index}
                  position={{ lat, lng }}
                  icon={
                    state.placeType === "pet_store" ? petStoreIcon : vetIcon
                  }
                  onClick={() =>
                    setState((prev) => ({
                      ...prev,
                      selectedCenter: {
                        lat,
                        lng,
                        name: location.name,
                        address: location.vicinity,
                        open: location.opening_hours,
                        rating: location.rating,
                        user_ratings: location.user_ratings_total,
                      },
                    }))
                  }
                />
              );
            })}

          {state.selectedCenter && (
            <InfoWindowF
              onCloseClick={() => {
                setState((prev) => ({ ...prev, selectedCenter: null }));
              }}
              position={{
                lat: state.selectedCenter.lat + 0.00001,
                lng: state.selectedCenter.lng,
              }}
            >
              <InfoBox
                name={state.selectedCenter.name}
                address={state.selectedCenter.address}
                open={state.selectedCenter.open}
                rating={state.selectedCenter.rating}
                user_rating={state.selectedCenter.user_ratings}
                selected={state.selectedCenter}
                fetchDirections={fetchDirections}
              />
            </InfoWindowF>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}
