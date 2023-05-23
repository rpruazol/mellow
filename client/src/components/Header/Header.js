import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import LoginButton from '../LoginButton/LoginButton';
import LogoutButton from '../LogoutButton/LogoutButton';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


function Header(props) {
  const { user, isAuthenticated, isLoading } = useAuth0();

  console.log(props)
  return (
    <>
      <Navbar id="header" bg="dark" variant="dark" style={{ "borderBottom": "1px solid grey" }}>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                props.isAuthenticated ?
                  <>
                    <h2>Welcome {user.given_name}</h2>
                    <h2 style={{ padding: "10x" }}>(Not you?
                      )</h2>
                    <LogoutButton />
                  </>
                  :
                  <LoginButton>Login</LoginButton>
              }
            />
          </Routes>
        </Router>
      </Navbar>
    </>
  );
}

export default Header;