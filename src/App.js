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
import MainLogist from './pages/logist/MainLogist';
import MainCust from './pages/cust/MainCust';
import CustMan from './pages/cust/CustMan';
import AddCust from './pages/cust/AddCust';
import ViewCust from './pages/cust/ViewCust';
import EditCust from './pages/cust/EditCust';
import RoutMan from './pages/routes/RoutMan';
import AddRoute from './pages/routes/AddRoute';
import EditRoute from './pages/routes/EditRoute';
import MainClient from './pages/client/MainClient';
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
import { useUser } from './util/userProvider';
import jwt_decode from "jwt-decode";


function App() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    document.title = "Capstone App";
    setRoles(getRolesFromJWT());
  }, []);


  // Check if JTW is empty
  if (localStorage.getItem("jwt") == '""') {
    console.log("NO JWT")
  }

  function getRolesFromJWT() {
    const token = localStorage.getItem("jwt");
    if (token !== '""') {
      const decodedJwt = jwt_decode(localStorage.getItem("jwt"));
      return decodedJwt.authorities;
    }
    return [];
  }
  roles.find((role) => "Role: " + console.log(role.authority))

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

          {/* <Route
            path="/dashboard"
            element={
              roles.find((role) => role.authority === "ROLE_ADMIN") ? (
                <PrivateRoute>
                  <Main />
                </PrivateRoute>
              ) : roles.find((role) => role.authority === "ROLE_SHIP") ? (
                <PrivateRoute>
                  <MainClient />
                </PrivateRoute>
              ) : null
            }
          /> */}
          
          MainLogist

          <Route exact path='/pages/main' element={
            roles.find((role) => role.authority === "ROLE_ADMIN") ? (
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            ) : roles.find((role) => role.authority === "ROLE_SHIP") ? (
              <PrivateRoute>
                <MainClient />
              </PrivateRoute>
            ) : roles.find((role) => role.authority === "ROLE_CUST") ? (
              <PrivateRoute>
                <MainCust />
              </PrivateRoute>
            ) : roles.find((role) => role.authority === "ROLE_LOGIST") ? (
              <PrivateRoute>
                <MainLogist />
              </PrivateRoute>
            ) : null
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
            roles.find((role) => role.authority === "ROLE_ADMIN" || role.authority === "ROLE_SHIP") ? (
              <PrivateRoute>
                <ClientMan />
              </PrivateRoute>
            ) : (
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            )
          } />
          <Route exact path='/pages/clientman/addclient' element={
            roles.find((role) => role.authority === "ROLE_ADMIN" || role.authority === "ROLE_SHIP") ? (
              <PrivateRoute>
                <AddClient />
              </PrivateRoute>
            ) : (
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            )
          } />
          <Route exact path='/pages/clientman/viewcli' element={
            roles.find((role) => role.authority === "ROLE_ADMIN" || role.authority === "ROLE_SHIP") ? (
              <PrivateRoute>
                <ViewClient />
              </PrivateRoute>
            ) : (
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            )
          } />
          <Route exact path='/pages/clientman/editcli/:type/:id' element={
            roles.find((role) => role.authority === "ROLE_ADMIN" || role.authority === "ROLE_SHIP") ? (
              <PrivateRoute>
                <EditClient />
              </PrivateRoute>
            ) : (
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            )
          } />

          <Route exact path='/pages/custman' element={
            roles.find((role) => role.authority === "ROLE_ADMIN" || role.authority === "ROLE_CUST") ? (
              <PrivateRoute>
                <CustMan />
              </PrivateRoute>
            ) : null
          } />
          <Route exact path='/pages/cust/addcust' element={
            roles.find((role) => role.authority === "ROLE_ADMIN" || role.authority === "ROLE_CUST") ? (
              <PrivateRoute>
                <AddCust />
              </PrivateRoute>
            ) : null
          } />
          <Route exact path='/pages/cust/viewcust' element={
            roles.find((role) => role.authority === "ROLE_ADMIN" || role.authority === "ROLE_CUST") ? (
              <PrivateRoute>
                <ViewCust />
              </PrivateRoute>
            ) : null
          } />
          <Route exact path='/pages/cust/editcust/:id' element={
            roles.find((role) => role.authority === "ROLE_ADMIN" || role.authority === "ROLE_CUST") ? (
              <PrivateRoute>
                <EditCust />
              </PrivateRoute>
            ) : null
          } />

          <Route exact path='/pages/routman' element={
            roles.find((role) => role.authority === "ROLE_ADMIN" || role.authority === "ROLE_LOGIST") ? (
              <PrivateRoute>
                <RoutMan />
              </PrivateRoute>
            ) : null
          } />
          <Route exact path='/pages/routes/addroute' element={
            roles.find((role) => role.authority === "ROLE_ADMIN" || role.authority === "ROLE_LOGIST") ? (
              <PrivateRoute>
                <AddRoute />
              </PrivateRoute>
            ) : null
          } />
          <Route exact path='/pages/routes/editroute/:id' element={
            roles.find((role) => role.authority === "ROLE_ADMIN" || role.authority === "ROLE_LOGIST") ? (
              <PrivateRoute>
                <EditRoute />
              </PrivateRoute>
            ) : null
          } />

          <Route exact path='/pages/freman' element={
            roles.find((role) => role.authority === "ROLE_ADMIN" || role.authority === "ROLE_LOGIST") ? (
              <PrivateRoute>
                <FreMan />
              </PrivateRoute>
            ) : null
          } />
          <Route exact path='/pages/freman/addfre' element={
            roles.find((role) => role.authority === "ROLE_ADMIN" || role.authority === "ROLE_LOGIST") ? (
              <PrivateRoute>
                <AddFre />
              </PrivateRoute>
            ) : null
          } />
          <Route exact path='/pages/freman/viewfre' element={
            roles.find((role) => role.authority === "ROLE_ADMIN" || role.authority === "ROLE_LOGIST") ? (
              <PrivateRoute>
                <ViewFre />
              </PrivateRoute>
            ) : null
          } />
          <Route exact path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
