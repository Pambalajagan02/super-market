import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Homes from './components/homes/Homes';
import Contact from './components/common/Contact';
import About from './components/common/About';
import AddItem from './components/additems/AddItem';
import Update from './components/update/Update';
import ViewDetails from './components/ViewDetials/ViewDetails';

function App() {
  return ( 
    <Router>
      <Routes>
      <Route path='/'  element={<Homes/>}/>
        <Route path='/contact'  element={<Contact/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path='/additems' element={<AddItem/>}/>
        <Route path="/update/:itemid" element={<Update/>}/>
        <Route path="view/:itemid" element={<ViewDetails/>}/>
      </Routes>

    </Router>
    
    
  );
}

export default App;
