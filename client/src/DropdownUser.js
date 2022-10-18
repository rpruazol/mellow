import Dropdown from 'react-bootstrap/Dropdown';
import React from 'react';
import { BrowserRouter as Routes, Route, NavLink } from "react-router-dom";
import User from './User';


function DropdownUser(props) {
  console.log(props)
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {props.user.given_name}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <NavLink to="user-profile">
            <h2>Profile</h2>
          </NavLink>
        </Dropdown.Menu>
      </Dropdown>
      <Routes>
        <Route path="user-profile" element={<User />} />
      </Routes>
    </>
  );
}

export default DropdownUser;