import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import User from './User';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Header(props) {
  console.log(props)
  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ "borderBottom": "1px solid grey" }}>
        <Container className="ms-3">
    <Router>
      <Routes>
              <Route
              exact
              path="/"
                element={props.isAuthenticated ?
                  <>
                    <LogoutButton>Logout</LogoutButton>
                    <User>User</User>
                  </>
                  :
                  <>
                  <LoginButton>Login</LoginButton>
                  </>
                }
                />
      </Routes>
      </Router>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;