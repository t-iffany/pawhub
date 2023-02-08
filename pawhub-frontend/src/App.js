import './App.css';
import DiscussionList from './components/Discussion/DiscussionList';
import NavigationBar from './components/NavigationBar';
<<<<<<< HEAD
import Map from './components/Map';
=======
import Login from './components/Login';
>>>>>>> c08991c (Add login route, create login_controller, add basic auth to Login.jsx)
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <div className="content">
          <Routes>
            <Route path="/map" element={<Map />} />
            <Route path="/discussions" element={<DiscussionList />} />
            <Route path="/login" element={<Login />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
