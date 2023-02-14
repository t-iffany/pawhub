import { useState } from "react";
import { TextField, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from 'axios';
import './DiscussionForm.css';

export default function DiscussionForm({currentUser, setOpenPopup}) {
  const categories = ["Swap", "Meetup", "Other"];

  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    content: "",
    category: "Swap",
    user_id: currentUser.id,
  });

  const style = {
    width: "100%",
    marginBottom: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    border: "solid 2px black",
    fontFamily: "Poppins, Sans-Serif"
  };

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
      <form className="form-wrapper" onSubmit={handleSubmit}>
        <label className="label">Post title</label>
          <TextField
            sx={style}
            name="title"
            className="textfield"
            id="title"
            variant="outlined"
            onChange={handleChange}
            value={newDiscussion.title}
          />
          <br></br>

          <label className="label">Start a discussion</label>
          <TextField sx={style}
            name="content"
            id="content"
            className="textfield"
            multiline
            minRows={3} maxRows={4}
            onChange={handleChange}
            value={newDiscussion.content}
          />
          <br></br>

          <label className="label">Select the discussion category</label>
          <Select sx={style}
            labelId="category"
            className="textfield"
            id="category"
            value={newDiscussion.category}
            onChange={handleChange}
            name="category"
          >
            
            {categories.map((category, id) => (
              <MenuItem value={category} key={id}>{category}</MenuItem>
            ))}
          </Select>
          <br></br>
          <Button sx={{border: "solid 2px black", fontWeight: "bold"}} id="button"className="button" type="submit" variant="contained">
            Add Discussion
          </Button>
      </form>
    </div>
  );
}