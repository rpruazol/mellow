import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import { useAuth0 } from "@auth0/auth0-react";

export default function NoteForm(props) {
  const [noteTitle, setTitle] = useState(props.boardObj.title) || useState('');
  const [noteDescription, setDescription] = useState(props.boardObj.description) || useState('');
  const { getAccessTokenSilently } = useAuth0();
  console.log('current title', noteTitle)
  console.log('current description', noteDescription)
  console.log('current status', props.state)

  const createNote = async (e) => {
    console.log('creating note')
    e.preventDefault()
    if(window.confirm('are you sure?')) {
      const jwt = await getAccessTokenSilently();
      console.log('noteTitle ', noteTitle);
      console.log('noteDescription ', noteDescription);
      console.log('token: ', jwt)
      const config = {
        url: '/notes',
        method: 'post',
        baseURL: process.env.REACT_APP_BACKEND,
        headers: { Authorization: `Bearer ${jwt}` },
        data: {
          title: noteTitle,
          description: noteDescription,
          board_id: props.boardObj.id,
          board: props.boardObj.name
        }
      }
      await axios(config);
      props.showModal(false);
      props.getNotes(props.boardObj.id);
    } else {
      return
    }
  }
  const editNote = async (e) => {
    e.preventDefault()
    console.log('editing note')
    const config = {
      headers: { Authorization: `Bearer ${await getAccessTokenSilently()}` },
      url: '/notes',
      method: 'put',
      baseURL: process.env.REACT_APP_BACKEND,
      data: {
        id: props.boardObj.id,
        title: noteTitle,
        description: noteDescription
      }
    }
    console.log(config.data)
    await axios(config);
    props.showModal(false);
    props.getNotes(props.boardObj.id);
  }


  return (

  

    <Form onSubmit={props.state ? (e) => editNote(e) : (e) => createNote(e)}>
      <Form.Group className="mb-3" controlId="note-title">
        <Form.Label>Note Title</Form.Label>
        <Form.Control
          type="text"
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          defaultValue={props.boardObj.title || noteTitle}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="note-description">

        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          onChange={(e) => setDescription(e.target.value)} 
          defaultValue={props.boardObj.description || noteDescription}
          />
      </Form.Group>

      <Button variant="secondary" onClick={() => props.showModal(false)}>
        Close
      </Button>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}