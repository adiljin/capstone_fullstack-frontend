import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from './users/AddUser';
import EditUser from './users/EditUser';
import ViewUser from './users/ViewUser';
import ClientMan from './pages/client/ClientMan';
import Main from './pages/Main';
import CustMan from './pages/cust/CustMan';
import RoutMan from './pages/routes/RoutMan';
import AddRoute from './pages/routes/AddRoute';
import EditRoute from './pages/routes/EditRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/pages/main' element={<Main/>}/>
          <Route exact path='/adduser' element={<AddUser/>}/>
          <Route exact path='/edituser/:id' element={<EditUser/>}/>
          <Route exact path='/viewuser/:id' element={<ViewUser/>}/>
          <Route exact path='/pages/clientman' element={<ClientMan/>}/>
          <Route exact path='/pages/custman' element={<CustMan/>}/>
          <Route exact path='/pages/routman' element={<RoutMan/>}/>
          <Route exact path='/pages/routes/addroute' element={<AddRoute/>}/>
          <Route exact path='/pages/routes/editroute/:id' element={<EditRoute/>}/>
        </Routes>

      </Router>
    </div>
  );
}

export default App;
