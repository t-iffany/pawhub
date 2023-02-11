import './App.css';
import DiscussionList from './components/Discussion/DiscussionList';
import NavigationBar from './components/NavigationBar';
import Map from './components/Map/Map';
import Login from './components/Login';
import SignUp from './components/User/SignUp';
import Profile from './components/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from "react";
import DiscussionDetails from './components/Discussion/DiscussionDetails';
import Footer from './components/Footer';
import Explore from './components/Explore';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!currentUser) {
      setCurrentUser(userInfo);
    }
  }, [currentUser]);

  return (
    <Router>
      <div className="App">
        <NavigationBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <div className="content">
          <Routes>
            <Route path="/map" element={<Map currentUser={currentUser} />} />
            <Route path="/discussions" element={<DiscussionList currentUser={currentUser} />} />
            <Route path="/discussions/:id" element={<DiscussionDetails currentUser={currentUser} />} />
            <Route path="/login" element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="/signup" element={<SignUp currentUser={currentUser} />} />
            <Route path="/explore" element={<Explore currentUser={currentUser} />} />
            <Route path="/profile" element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

