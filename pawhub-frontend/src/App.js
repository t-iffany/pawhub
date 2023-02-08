import './App.css';
import DiscussionList from './components/Discussion/DiscussionList';
import NavigationBar from './components/NavigationBar';
import Map from './components/Map';
import Login from './components/Login';
import SignUp from './components/User/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/").then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setCurrentUser(user);
          setIsAuthenticated(true);
        })
        .catch(err => console.log(err));
      } else {
        setCurrentUser(null);
        setIsAuthenticated(true);
      }
    });
  }, []);

  if (!isAuthenticated) {
    return <div></div>;
  }

  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <div className="content">
          <Routes>
            <Route path="/map" element={<Map />} />
            <Route path="/discussions" element={<DiscussionList />} />
            <Route path="/login" element={<Login setCurrentUser={setCurrentUser}/>} />
            <Route path="/signup" element={<SignUp />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
