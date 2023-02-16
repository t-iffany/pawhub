import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile({ currentUser, setCurrentUser }) {
  const [state, setState] = useState({ users: [], images: [] });
  const [editMode, setEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  console.log("current user", currentUser);

  let imageCount = () => {
    if (state.images) {
      return state.images.filter((image) => image.user_id === currentUser.id)
        .length;
    }
  };

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/api/users"),
      axios.get("http://localhost:3001/api/images"),
    ])
      // Our res is an array of the response received: [{users}, {images}]
      .then((response) => {
        setState((prev) => ({
          ...prev,
          users: response[0].data,
          images: response[1].data,
        }));

        // console.log("state useeffect", state);
      })

      .catch((err) => console.log(err));
  }, [editMode, uploading]);

  // create an edit form and button that toggles the display of the form
  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUploading(true);
    // send PUT request to the server to update the user information
    axios
      .put(`http://localhost:3001/api/users/${currentUser.id}`, {
        username: event.target.username.value,
        dog_name: event.target.dog_name.value,
        breed: event.target.breed.value,
        description: event.target.description.value,
      })
      .then((res) => {
        // update user information in the state
        // setState({ users: [...state.users, res.data] });
        setState((prevState) => {
          const updatedUsers = prevState.users.map((user) => {
            if (user.id === currentUser.id) {
              return res.data;
            }
            return user;
          });
          // console.log(res.data);
          setCurrentUser(res.data);
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          setEditMode(false);
          // alert("Edits Saved!");
          return { ...prevState, users: updatedUsers };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpload = (event) => {
    event.preventDefault();
    setUploading(true);

    const imageData = new FormData();
    imageData.append("file_data", selectedFile);
    imageData.append("user_id", currentUser.id);

    axios
      .post("http://localhost:3001/api/images", imageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setEditMode(true);
        setUploading(false);
        setSelectedFile(null);
        // alert("Upload Successful");
        // reset the file input
        document.querySelector("input[type='file']").value = "";
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
        setSelectedFile(null);
        console.log("selectedFile: ", selectedFile);
      });
  };

  const handleDelete = (event, imageId) => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to delete this image?")) {
      setUploading(true);

      axios
        .delete(`http://localhost:3001/api/images/${imageId}`, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          // console.log("res.data: ", res.data);
          setState((prevState) => ({
            ...prevState,
            images: res.data,
          }));

          setEditMode(true);
          setUploading(false);
          // alert("Image Deleted!");
        })
        .catch((err) => {
          console.log(err);
          setUploading(false);
        });
    }
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="profile-page">
      <div className="profile-info">
        <div className="avatar-div">
          <Avatar
            alt="avatar"
            src={
              currentUser
                ? `data:image/jpeg;base64,${currentUser.avatar}`
                : "user.avatar not found"
            }
            sx={{ width: 130, height: 130 }}
          />
          <button className="profile-edit-button" onClick={handleEdit}>
            Edit
          </button>
        </div>

        <div className="profile-user-info">
          <div>
            <div className="profile-header">
              <div className="profile-username">
                {currentUser ? currentUser.username : "user.username not found"}
              </div>
              <div>{imageCount()} posts</div>
            </div>
          </div>

          <ul>
            <li>
              Name:{" "}
              {currentUser ? currentUser.dog_name : "user.breed not found"}
            </li>
            <li>
              Breed: {currentUser ? currentUser.breed : "user.breed not found"}
            </li>
            <li>
              Description:{" "}
              {currentUser
                ? currentUser.description
                : "user.description not found"}
            </li>
          </ul>
        </div>
      </div>

      {editMode ? (
        <>
          <form className="edit-form" onSubmit={handleSubmit}>
            <input
              className="edit-form-input"
              type="text"
              name="username"
              defaultValue={currentUser ? currentUser.username : "username"}
            />
            <input
              className="edit-form-input"
              type="text"
              name="dog_name"
              defaultValue={currentUser ? currentUser.dog_name : "dog_name"}
            />
            <input
              className="edit-form-input"
              type="text"
              name="breed"
              defaultValue={currentUser ? currentUser.breed : "breed"}
            />
            <textarea
              className="edit-form-input"
              type="text"
              name="description"
              defaultValue={
                currentUser ? currentUser.description : "description/content"
              }
            />
            <button className="edit-form-button" type="submit">
              Save
            </button>
            <button
              className="edit-form-button"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </form>
          <form className="edit-form" onSubmit={handleUpload}>
            <input
              type="file"
              name="image"
              onChange={handleFileSelect}
              accept="image/*"
            />
            <button
              className="upload-image"
              type="button"
              onClick={handleUpload}
            >
              Upload Image
            </button>
          </form>
          <div className="edit-images">
            <div> Saved images: </div>
            {state.images &&
              state.images
                .filter((image) => image.user_id === currentUser.id)
                .reverse()
                .map((image, index) => (
                  <div key={index}>
                    <img
                      className="saved-images"
                      key={index}
                      src={`data:image/jpeg;base64,${image.file_data}`}
                      alt={currentUser.dog_name}
                      width="210"
                      height="210"
                    />
                    <button
                      className="delete-button"
                      type="button"
                      onClick={(event) => handleDelete(event, image.id)}
                    >
                      Delete Image
                    </button>
                  </div>
                ))}
          </div>
        </>
      ) : (
        <div className="profile-images">
          {state.images &&
            state.images
              .filter((image) => image.user_id === currentUser.id)
              .reverse()
              .map((image, index) => (
                <img
                  className="profile-image"
                  key={index}
                  src={`data:image/jpeg;base64,${image.file_data}`}
                  alt={currentUser.dog_name}
                />
              ))}
        </div>
      )}
    </div>
  );
}
