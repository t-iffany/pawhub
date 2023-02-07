import { useState } from "react";
import { TextField, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from 'axios'

export default function DiscussionForm() {
  const categories = ["Swap", "Meetup", "Other"];

  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    content: "",
    category: "Swap",
    user_id: 1,
  });

  const handleChange = (e) => {
    setNewDiscussion({ ...newDiscussion, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    if (newDiscussion.title === "" || newDiscussion.content === ""){
      alert("Please fill all required fields.");
      return;
    }

    axios
      .post("http://localhost:3001/api/discussions", newDiscussion)
      .then((res) => {})
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <FormControl fullWidth>
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
            {categories.map((category) => (
              <MenuItem value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleClick}>
          Post
        </Button>
    </div>
  );
}
