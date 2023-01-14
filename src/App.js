import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import jQuery from 'jquery';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from './users/AddUser';
import EditUser from './users/EditUser';
import ViewUser from './users/ViewUser';
import ClientMan from './pages/client/ClientMan';
import Main from './pages/Main';
import CustMan from './pages/cust/CustMan';
import AddCust from './pages/cust/AddCust';
import ViewCust from './pages/cust/ViewCust';
import EditCust from './pages/cust/EditCust';
import RoutMan from './pages/routes/RoutMan';
import AddRoute from './pages/routes/AddRoute';
import EditRoute from './pages/routes/EditRoute';
import AddClient from './pages/client/AddClient';
import ViewClient from './pages/client/ViewClient';
import EditClient from './pages/client/EditClient';
import FreMan from './pages/fre/FreMan';
import AddFre from './pages/fre/AddFre';
import ViewFre from './pages/fre/ViewFre';
import Login from './pages/login/Login';
import { PrivateRoute } from './pages/privateRoute/PrivateRoute';
import { useEffect } from 'react';
import { useState } from 'react';



function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route exact path='/pages/main' element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          } />
          <Route exact path='/adduser' element={
            <PrivateRoute>
              <AddUser />
            </PrivateRoute>
          } />
          <Route exact path='/edituser/:id' element={
            <PrivateRoute>
              <EditUser />
            </PrivateRoute>
          } />
          <Route exact path='/viewuser/:id' element={
            <PrivateRoute>
              <ViewUser />
            </PrivateRoute>
          } />

          <Route exact path='/pages/clientman' element={
            <PrivateRoute>
              <ClientMan />
            </PrivateRoute>
          } />
          <Route exact path='/pages/clientman/addclient' element={
            <PrivateRoute>
              <AddClient />
            </PrivateRoute>
          } />
          <Route exact path='/pages/clientman/viewcli' element={
            <PrivateRoute>
              <ViewClient />
            </PrivateRoute>
          } />
          <Route exact path='/pages/clientman/editcli/:type/:id' element={
            <PrivateRoute>
              <EditClient />
            </PrivateRoute>
          } />

          <Route exact path='/pages/custman' element={
            <PrivateRoute>
              <CustMan />
            </PrivateRoute>
          } />
          <Route exact path='/pages/cust/addcust' element={
            <PrivateRoute>
              <AddCust />
            </PrivateRoute>
          } />
          <Route exact path='/pages/cust/viewcust' element={
            <PrivateRoute>
              <ViewCust />
            </PrivateRoute>
          } />
          <Route exact path='/pages/cust/editcust/:id' element={
            <PrivateRoute>
              <EditCust />
            </PrivateRoute>
          } />

          <Route exact path='/pages/routman' element={
            <PrivateRoute>
              <RoutMan />
            </PrivateRoute>
          } />
          <Route exact path='/pages/routes/addroute' element={
            <PrivateRoute>
              <AddRoute />
            </PrivateRoute>
          } />
          <Route exact path='/pages/routes/editroute/:id' element={
            <PrivateRoute>
              <EditRoute />
            </PrivateRoute>
          } />

          <Route exact path='/pages/freman' element={
            <PrivateRoute>
              <FreMan />
            </PrivateRoute>
          } />
          <Route exact path='/pages/freman/addfre' element={
            <PrivateRoute>
              <AddFre />
            </PrivateRoute>
          } />
          <Route exact path='/pages/freman/viewfre' element={
            <PrivateRoute>
              <ViewFre />
            </PrivateRoute>
          } />
          <Route exact path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
