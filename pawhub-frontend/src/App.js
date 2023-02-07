import './App.css';
import DiscussionList from './components/DiscussionList';
import NavigationBar from './components/NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <NavigationBar />
      <DiscussionList />

    </div>
  );
}

export default App;
