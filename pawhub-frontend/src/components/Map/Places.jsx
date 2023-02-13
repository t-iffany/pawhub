import { getGeocode, getLatLng } from "use-places-autocomplete";
import Autocomplete from "react-google-autocomplete";
import API_KEY from "../api_keys";

export default function Places(props) {
  const handleSelect = async (val) => {
    // geocode takes in object that has an address (whatever we select)
    const results = await getGeocode({ address: val.formatted_address });
    const { lat, lng } = getLatLng(results[0]);

    props.circleRef.current = true;

    props.setLocation({ lat, lng });
  };

  return (
    <Autocomplete
      className="search"
      apiKey={API_KEY.googleAPIKey}
      style={{ width: "100%" }}
      onPlaceSelected={handleSelect}
      options={{
        types: ["geocode"],
        componentRestrictions: { country: ["ca"] },
      }}
    />
  );
}
