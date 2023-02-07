import Buttons from "./Buttons";
import DiscussionListItem from "./DiscussionListItem";
import SimpleContainer from "./SimpleContainer";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { TextField, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function DiscussionList() {
  const [state, setState] = useState({
    discussions: [],
    users: [],
    categories: ["Swap", "Meetup", "Other"],
  });

  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    content: "",
    category: "",
    user_id: 1,
  });

  const handleChange = (e) => {
    console.log("==============", e.target);
    setNewDiscussion({ ...newDiscussion, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    if (newDiscussion.title === "") {
      alert("Message should not be empty.");
      return;
    }

    axios
      .post("http://localhost:3001/api/discussions", newDiscussion)
      .then((res) => {})
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/api/discussions"),
      axios.get("http://localhost:3001/api/users"),
    ])
      // Our res is an array of the response received: [{discussions}, {users}]
      .then((res) => {
        setState((prev) => ({
          ...prev,
          discussions: res[0].data,
          users: res[1].data,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  const findUserById = (userId) =>
    state.users.find((user) => user.id === userId);

  const discussionPosts = state.discussions.map((discussion) => {
    const user = findUserById(discussion.user_id);

    return (
      <DiscussionListItem
        key={discussion.id}
        title={discussion.title}
        timestamp={discussion.created_at}
        name={user.username}
        avatar={user.avatar}
      />
    );
  });

  return (
    <div className="discussion-list">
      <div className="buttons">
        <Buttons variant="outlined">Swap</Buttons>
        <Buttons variant="outlined">Meetup</Buttons>
        <Buttons variant="outlined">Other</Buttons>
        <FormControl fullWidth>
          <TextField
            name="title"
            id="title"
            label="Outlined"
            variant="outlined"
            onChange={handleChange}
            value={newDiscussion.title}
          />
          <TextField
            name="content"
            id="content"
            label="Multiline"
            multiline
            maxRows={4}
            onChange={handleChange}
            value={newDiscussion.content}
          />

          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="category"
            id="category"
            value={newDiscussion.category}
            label="Category"
            onChange={handleChange}
            name="category"
          >
            {state.categories.map((category) => (
              <MenuItem value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleClick}>
          Post
        </Button>
        {newDiscussion.title}
        __
        {newDiscussion.content}
        __
        {newDiscussion.category}
      </div>

      <SimpleContainer>{discussionPosts}</SimpleContainer>
    </div>
  );
}
