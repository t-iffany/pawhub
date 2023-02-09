import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

export default function Places(props) {
  const {
    // Is the script ready to use?
    ready,
    // State of the search box
    value,
    setValue,
    // Status of whether or not we received any, and the suggestion data
    suggestions: { status, data },
    // When we select one, this removes the list from the screen
    clearSuggestions,
  } = usePlacesAutocomplete();

  // console.log(status, data);

  const handleSelect = async (val) => {
    setValue(val, false);
    clearSuggestions();

    // geocode takes in object that has an address (whatever we select)
    const results = await getGeocode({ address: val });
    // console.log(results);

    const { lat, lng } = await getLatLng(results[0]);
    props.setLocation({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="combobox-input"
        placeholder="Where are you located?"
      />
      <ComboboxPopover>
        {status === "OK" &&
          data.map(({ place_id, description }) => (
            <ComboboxOption
              className="combobox-option"
              key={place_id}
              value={description}
            />
          ))}
      </ComboboxPopover>
    </Combobox>
  );
}
