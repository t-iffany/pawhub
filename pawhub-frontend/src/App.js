import './App.css';
import DiscussionList from './components/Discussion/DiscussionList';
import NavigationBar from './components/NavigationBar';
import Map from './components/Map/Map';
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

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
