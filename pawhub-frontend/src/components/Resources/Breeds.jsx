import { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup } from "react-bootstrap";
import BreedsItem from "./BreedsItem";
import { TextField } from "@mui/material";

export default function Breeds() {
  const [breedList, setBreedList] = useState([]);
  const [query, setQuery] = useState(null);

  const options = {
    method: "GET",
    url: "https://dog-breeds2.p.rapidapi.com/dog_breeds",
    headers: {
      "X-RapidAPI-Key": "130e464c97mshc8ce165f8b9cc32p1ce945jsn99be0d1d68f1",
      "X-RapidAPI-Host": "dog-breeds2.p.rapidapi.com",
    },
  };

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  function filterByQuery(breedsList, query) {
    return breedsList.filter((breed) =>
      breed.breed.toLowerCase().includes(query.toLowerCase())
    );
  }

  console.log(breedList);
  console.log(query);

  useEffect(() => {
    axios
      .request(options)
      .then((res) => {
        console.log(res.data);
        setBreedList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1 className="page-header">Breeds</h1>

      <TextField
        id="outlined-basic"
        label="Search for any dog!"
        variant="outlined"
        className="breed-search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ListGroup>
        {breedList &&
          !query &&
          breedList.map((breed) => {
            return (
              <BreedsItem
                key={breed.id}
                breed={breed.breed}
                origin={breed.origin}
                img={breed.img}
                onClick={() => openInNewTab(breed.url)}
              />
            );
          })}

        {breedList &&
          query &&
          filterByQuery(breedList, query).map((breed) => {
            return (
              <BreedsItem
                key={breed.id}
                breed={breed.breed}
                origin={breed.origin}
                img={breed.img}
                onClick={() => openInNewTab(breed.url)}
              />
            );
          })}
      </ListGroup>
    </div>
  );
}
