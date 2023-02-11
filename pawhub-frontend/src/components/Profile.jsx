import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { imageListItemBarClasses } from '@mui/material';

export default function Profile() {

  const [state, setState] = useState({ users: [], image: { file_data: ""} });
  const [editMode, setEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  //const [userImage, setUserImage] = useState("");

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/api/users")
  //     .then((response) => {
  //       if (response.status === 200) {
  //         setState({ users: response.data });
  //       } else {
  //         console.log('Error:', response.status);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //   // Make a GET request to retrieve the base64 encoded image  
  //   axios
  //     .get(`http://localhost:3001/api/images/1`)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         // access the base64 encoded image data from the response
  //         console.log("response.data: ", response.data)
  //         console.log("response.data.file_data", response.data.file_data)
  //         //setState(`data:image/jpeg;base64,${response.data}`);
  //         // setState((prev) => ({
  //         //   ...prev, image: { file_data: response.data.file_data }
  //         // }))
  //         const data = {...response.data};
  //         setState((prev) => ({
  //           ...prev, image: { file_data: data.file_data }
  //         }))
  //       } else {
  //         console.log('Error:', response.status);
  //       }
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });

  // }, [editMode]);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/api/users"),
      axios.get("http://localhost:3001/api/images/1"),
    ])
      // Our res is an array of the response received: [{discussions}, {users}]
      .then((response) => {

        // const base64 = btoa(
        //   new Uint8Array(response[1].data).reduce((data, byte) => {
        //     return data + String.fromCharCode(byte);
        //   }, '')
        //   );
        

        console.log("response[1].data.file_data", response[1].data.file_data)
        // console.log("base64", base64)

        setState((prev) => ({
          ...prev,
          users: response[0].data,
          image: `data:image/jpeg;base64,${response[1].data.file_data}`
        }));
      })
      .catch((err) => console.log(err));
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
    setUploading(true);
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

        const imageData = new FormData();
        imageData.append("file_data", selectedFile);
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
    // let imageFile = event.target.files[0]

    // if (imageFile) {
    //   const reader = new FileReader();

    //   reader.onload = this._handleReaderLoaded.bind(this)

    //   reader.readAsBinaryString(imageFile)
    // }

    // const handleReaderLoaded = (readerEvt) => {
    //   let binaryString = readerEvt.target.result
    //   this.setState({
    //     base64TextString: btoa(binaryString)
    //   })
    // }
  };

  // const renderImages = () => {
  //   if (!user) {
  //     return null;
  //   }
  
  //   return user.images.map((image) => (
  //     <img key={image.id} src={`data:image/jpeg;base64,${image.file_data}`} alt={`Pic of ${user.dog_name}`} />
  //   ));
  // };

  // const renderImg = () => {
  //   <img src={`data:image/jpeg;base64,${image.file_data}`} alt={`Pic of ${user.dog_name}`} />
  // }
  // const imageURL = `data:image/jpeg;base64,${state.images[0].file_data}`
  // const imageURL = state.images[0].file_data
  // console.log('state.images[0].file_data: ', state.images[0].file_data)
  // console.log('imageURL', imageURL)
  console.log("state.image", state.image)

  // const renderImage = (imageData) => {
  //   return `data:image/jpeg;base64,${imageData}`
  // }

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
            <input 
              type="file" 
              name="image" 
              onChange={handleFileSelect} 
              accept="image/*" 
            />
            {/* <button type="button" onClick={handleSubmit} disabled={uploading}>Upload Image</button> */}
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
            <div>
              Images: { state.image && 
                <img src={state.image} alt="dog" />
              }
              {/* Images: <img src={imageURL ? imageURL : "imageurl not working"} alt="dog" /> */}
              {/* {renderImages()} */}
              {/* {renderImg()} */}
            </div>
          </div>
        }
      </div>
    </div>
  );
}