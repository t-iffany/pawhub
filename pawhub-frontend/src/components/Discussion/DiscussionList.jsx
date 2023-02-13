import Buttons from "../controls/Buttons";
import DiscussionListItem from "./DiscussionListItem";
import axios from "axios";
import { useState, useEffect } from "react";
import DiscussionForm from "./DiscussionForm";
import Popup from "../controls/Popup";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function DiscussionList({ currentUser }) {
  const [state, setState] = useState({
    discussions: [],
    users: [],
    comments: [],
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [filter, setFilter] = useState('All');
  const categories = ["All", "Swap", "Meetup", "Other"];

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/api/discussions"),
      axios.get("http://localhost:3001/api/users"),
      axios.get("http://localhost:3001/api/comments"),
    ])
      // Our res is an array of the response received: [{discussions}, {users}]
      .then((res) => {
        setState((prev) => ({
          ...prev,
          discussions: res[0].data,
          users: res[1].data,
          comments: res[2].data,
        }));
      })
      .catch((err) => console.log(err));
  }, [openPopup]);

  const findUserById = (userId) =>
    state.users.find((user) => user.id === userId);

  const commentCount = (discussionId) => {
    return state.comments.filter(
      (comment) => comment.discussion_id === Number(discussionId)
    ).length;
  };

  const handleChange = (e) => {
    setFilter(e.target.value);
  };


  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.sort((a, b) => (b.id > a.id ? 1 : -1))
          .map((discussion) => {
            const user = findUserById(discussion.user_id);
      
            return (
              <Link to={`/discussions/${discussion.id}`} key={discussion.id}>
                <DiscussionListItem
                  title={discussion.title}
                  count={commentCount(discussion.id)}
                  timestamp={discussion.created_at}
                  name={user.username}
                  avatar={user.avatar}
                />
              </Link>
            );
        })}
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
  
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = state.discussions.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(state.discussions.length / itemsPerPage);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % state.discussions.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
  
    return (
      <>
        <Items currentItems={currentItems} />
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

  return (
    <div className="discussion-list">
      <span>Filter by: </span>
      <Select
            labelId="category"
            id="category"
            value={filter}
            label="Category"
            onChange={handleChange}
            name="category"
          >
            {categories.map((category, id) => (
              <MenuItem value={category} key={id}>{category}</MenuItem>
            ))}
      </Select>
      <PaginatedItems itemsPerPage={5} />
      {currentUser && (
        <div>
          <Popup
            title="Create a new discussion"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <DiscussionForm
              currentUser={currentUser}
              setOpenPopup={setOpenPopup}
            />
          </Popup>
          <Buttons variant="outlined" onClick={() => setOpenPopup(true)}>
            Add a discussion
          </Buttons>
        </div>
      )}
    </div>
  );
}
