import { useState } from "react";
import { TextField, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from 'axios';

export default function DiscussionForm({currentUser, setOpenPopup}) {
  const categories = ["Swap", "Meetup", "Other"];

  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    content: "",
    category: "Swap",
    user_id: currentUser.id,
  });

  const handleChange = (e) => {
    setNewDiscussion({ ...newDiscussion, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newDiscussion.title === "" || newDiscussion.content === ""){
      alert("Please fill all required fields.");
      return;
    }

    axios
      .post("http://localhost:3001/api/discussions", newDiscussion)
      .then((res) => setOpenPopup(false))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
          <TextField
            name="title"
            id="title"
            label="Title"
            variant="outlined"
            onChange={handleChange}
            value={newDiscussion.title}
          />
          <TextField
            name="content"
            id="content"
            label="Discussion Content"
            multiline
            maxRows={4}
            onChange={handleChange}
            value={newDiscussion.content}
          />

          <Select
            labelId="category"
            id="category"
            value={newDiscussion.category}
            label="Category"
            onChange={handleChange}
            name="category"
          >
            {categories.map((category, id) => (
              <MenuItem value={category} key={id}>{category}</MenuItem>
            ))}
          </Select>
        
          <Button type="submit" variant="contained">
            Add Discussion
          </Button>
      </form>
    </div>
  );
}
