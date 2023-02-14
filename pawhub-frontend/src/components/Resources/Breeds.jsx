import { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup } from "react-bootstrap";
import BreedsItem from "./BreedsItem";
import { TextField } from "@mui/material";
import Spinner from "react-bootstrap/Spinner";
import ReactPaginate from "react-paginate";

export default function Breeds() {
  const [breedList, setBreedList] = useState([]);
  const [query, setQuery] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // console.log(breedList);

  const options = {
    method: "GET",
    url: "https://dog-breeds2.p.rapidapi.com/dog_breeds",
    headers: {
      "X-RapidAPI-Key": "130e464c97mshc8ce165f8b9cc32p1ce945jsn99be0d1d68f1",
      "X-RapidAPI-Host": "dog-breeds2.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then((res) => {
        setBreedList(res.data);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  const openInNewTab = (url) => {
    window.open(url, "_blank");
  };

  function filterByQuery(breedsList, query) {
    return breedsList.filter((breed) =>
      breed.breed.toLowerCase().includes(query.toLowerCase())
    );
  }

  const breedListOutput = (breedList, query) => {
    if (query) {
      return filterByQuery(breedList, query);
    }

    return breedList;
  };

  function BreedListItems({ currentItems }) {
    return (
      <>
        {currentItems.map((breed) => {
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
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    const filteredList = breedListOutput(breedList, query);
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = filteredList.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filteredList.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % filteredList.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    return (
      <>
        <ListGroup>
          <BreedListItems currentItems={currentItems} />
        </ListGroup>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </>
    );
  }

  // console.log("breedlistoutput", breedListOutput());

  return (
    <div>
      <h1 className="page-header">Breeds</h1>

      <div className="breed-page">
        {!loaded && (
          <Spinner className="spinner" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}

        {loaded && (
          <TextField
            id="outlined-basic"
            label="Search for any dog!"
            variant="outlined"
            className="breed-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        )}

        <PaginatedItems itemsPerPage={10} />
      </div>
    </div>
  );
}
