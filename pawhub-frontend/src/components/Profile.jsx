import Avatar from '@mui/material/Avatar';


export default function Profile() {

  return (

    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ width: "25%", height: "50%", backgroundColor: "transparent" }}>
        <div>
          Username
          <Avatar alt={Avatar}
            src="https://www.publicdomainpictures.net/pictures/250000/nahled/dog-puppy-illustration.jpg"
            sx={{ width: 130, height: 130 }}
          />
        </div>
      </div>
      <div style={{ width: "50%", height: "50%", backgroundColor: "transparent" }}>
        Profile
        <ul>
          <li>Name</li>
          <li>Breed</li>
          <li>Description</li>
          <li>Social Media Links</li>
        </ul>
      </div>
    </div>

  );
}
