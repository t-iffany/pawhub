import { useState } from "react";
import { TextField, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function DiscussionForm() {

  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    content: "",
    category: "",
    user_id: 1,
  });

  const handleChange = (e) => {
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

  return (
    <div>
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
    </div>
  );
}
