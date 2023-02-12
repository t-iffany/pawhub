import React, { useState,useEffect } from "react";
import { Dropdown, FormControl } from "react-bootstrap";
import axios from "axios";

const DropdownTypeahead = () => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const getBreeds = {
    method: 'GET',
    url: 'https://dog-breeds2.p.rapidapi.com/dog_breeds',
    headers: {
      'X-RapidAPI-Key': 'da1a663316mshd7457aea6fda466p18c83fjsn5db0b9b1ad56',
      'X-RapidAPI-Host': 'dog-breeds2.p.rapidapi.com'
    }
  };

  useEffect(() => {
    axios.request(getBreeds).then(function (response) {
      const newOpts = (response.data).map((res) => res.breed);
      setOptions(newOpts);
    }).catch(function (error) {
      console.error(error);
    });
  }, []);

  const handleToggle = () => {
    setShowOptions(!showOptions);
  };

  const handleSelect = (selectedOption) => {
    setValue(selectedOption);
    setShowOptions(false);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  //filters the menu based on what's typed
  const filteredOptions = options.filter(
    (option) => option.toLowerCase().indexOf(value.toLowerCase()) !== -1
  );

  return (
    <Dropdown onToggle={handleToggle} show={showOptions}>
      <Dropdown.Toggle
        as={FormControl}
        type="text"
        value={value}
        onChange={handleChange}
      />
      <Dropdown.Menu>
        {filteredOptions.map((option) => (
          <Dropdown.Item
            key={option}
            onClick={() => handleSelect(option)}
          >
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownTypeahead;
