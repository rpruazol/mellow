import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import NoteModal from '../NoteModal/NoteModal';
import { useAuth0 } from "@auth0/auth0-react";



export default function Note(props) {
  const [modalOpen, showModal] = useState(false);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  
  const deleteNote = async (id) => {

    console.log('ids', id);
    if(window.confirm('are you sure')){

      const config = {
        headers: { Authorization: `Bearer ${await getAccessTokenSilently()}` },
        url: '/notes',
        method: 'delete',
        baseURL: process.env.REACT_APP_BACKEND,
        data: {
          id: id,
        }
      }
      const response = await axios(config);
      console.log(response)
      console.log('props: ', props)
      props.getNotes(props.data.board_id)
    }
  }

  return (
    <Card className="mt-3 mb-3" key={props.id}>
      <Card.Body key={props.id}>
        <Card.Title key={props.id}>{props.data.title}</Card.Title>
        <Card.Text>
          {props.data.description}
        </Card.Text>
        <Button variant="primary" onClick={showModal}>Edit</Button>
        <NoteModal
        state='edit'
        boardObj={props.data}
        showModal={showModal}
        show={modalOpen}
        getNotes={props.getNotes}
      />
        <Button variant="primary" onClick={() => deleteNote(props.data.id)}>Delete</Button>

      </Card.Body>
    </Card>
  )
}