import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import { useAuth0 } from "@auth0/auth0-react";


export default function BoardForm(props) {
  const [boardTitle, setTitle] = useState('');
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();

  const createBoard = async (e) => {
    e.preventDefault()
    if (window.confirm('are you sure?')) {
      const res = await getAccessTokenSilently();
      const jwt = res;
      // get count of how many boards exist
      let config = {
        headers: { Authorization: `Bearer ${jwt}` },
        baseURL: process.env.REACT_APP_BACKEND,
        method: 'post',
        url: '/boards',
        user_id: user.email
      }
      let boardCount = await axios(config)

      let postConfig = {
        url: '/new-board',
        method: 'post',
        baseURL: process.env.REACT_APP_BACKEND,
        headers: { Authorization: `Bearer ${jwt}` },
        data: {
          title: boardTitle,
          board_order: (boardCount.data.length),
          user_id: user.email
        }
      }
      console.log('create board payload', postConfig, isAuthenticated)
      await axios(postConfig);
      props.showModal(false);
      props.getBoards();
    } else {
      return
    }
  }



  return (
    <Form onSubmit={(e) => createBoard(e)}>
      <Form.Group className="mb-3" controlId="board">
        <Form.Label>Board Name</Form.Label>
        <Form.Control onChange={(e) => setTitle(e.target.value)}type="text" placeholder="My board" />
      </Form.Group>
      <Button variant="secondary" onClick={() => props.showModal(false)}>
        Close
      </Button>
      <Button variant="primary" type="submit">
        Add Note
      </Button>
    </Form>
  );
}