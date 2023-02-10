import { getGeocode, getLatLng } from "use-places-autocomplete";
import Autocomplete from "react-google-autocomplete";
import { googleAPIKey } from "../../helpers/GooglePlacesAPI";

export default function Places(props) {
  const handleSelect = async (val) => {
    // geocode takes in object that has an address (whatever we select)
    const results = await getGeocode({ address: val.formatted_address });
    const { lat, lng } = getLatLng(results[0]);

    props.setLocation({ lat, lng });
  };

  return (
    <Autocomplete
      apiKey={googleAPIKey}
      style={{ width: "90%" }}
      onPlaceSelected={handleSelect}
      options={{
        types: ["geocode"],
        componentRestrictions: { country: ["ca"] },
      }}
    />
  );
}
