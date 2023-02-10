import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {

  const [state, setState] = useState({ users: [] });
  const [editMode, setEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users")
      .then((response) => {
        if (response.status === 200) {
          setState({ users: response.data });
        } else {
          console.log('Error:', response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [editMode]);

  const findUserById = (userId) => {
    if (!state.users) {
      return;
    }

    return state.users.find((user) => user.id === userId);
  };

  const user = findUserById(3);

  // create an edit form and button that toggles the display of the form
  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // send PUT request to the server to update the user information
    axios.put(`http://localhost:3001/api/users/${user.id}`, {
      username: event.target.username.value,
      dog_name: event.target.dog_name.value,
      breed: event.target.breed.value,
      description: event.target.description.value
    })
      .then(res => {
        // update user information in the state
        setState({ users: [...state.users, res.data] });
      //  setEditMode(false);


        const imageData = new FormData();
        imageData.append("image", selectedFile);
        imageData.append("user_id", user.id);

        axios
          .post("http://localhost:3001/api/images", imageData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            setEditMode(false);
            setUploading(false);
          })
          .catch(err => {
            console.log(err);
            setUploading(false);
          });
      })

      
      .catch(err => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ width: "25%", height: "50%", backgroundColor: "transparent", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div>{user ? user.username : "user not found"}</div>
        <Avatar alt='avatar'
          src={user ? user.avatar : "user.avatar not found"}
          sx={{ width: 130, height: 130 }}
        />
        <button onClick={handleEdit}>Edit</button>
      </div>
      <div style={{ width: "50%", height: "50%", backgroundColor: "transparent" }}>
        {editMode ?
          <form onSubmit={handleSubmit}>
            <input type="text" name="username" defaultValue={user ? user.username : "username"} />
            <input type="text" name="dog_name" defaultValue={user ? user.dog_name : "dog_name"} />
            <input type="text" name="breed" defaultValue={user ? user.breed : "breed"} />
            <textarea type="text" name="description" defaultValue={user ? user.description : "description/content"} />
            <input type="file" name="image" onChange={handleFileSelect} accept="image/*" />
            <button type="button" onClick={handleSubmit} disabled={uploading}>Upload Image</button>
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </form>
          :
          <div>
            Profile
            <ul>
              <li>Name: {user ? user.dog_name : "user.dog_name not found"}</li>
              <li>Breed: {user ? user.breed : "user.breed not found"}</li>
              <li>Description: {user ? user.description : "user.description not found"}</li>
            </ul>
          </div>
        }
      </div>
    </div>
  );
}