import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ListOfUsers from './Components/Pages/ListOfUsers';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<ListOfUsers/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;