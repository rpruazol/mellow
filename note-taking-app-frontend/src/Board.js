import React, { useEffect, useState } from 'react';
import NoteModal from './NoteModal';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useAuth0 } from "@auth0/auth0-react";



import Note from './Note';

export default function Board(props) {
  const [modalOpen, showModal] = useState(false);
  const [notes, setNotes] = useState([])
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const getNotes = async (id) => {
    const jwt = await getAccessTokenSilently();
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
      baseURL: process.env.REACT_APP_BACKEND,
      url: `/notes?id=${id}`
    }
    const response = await axios(config)
    setNotes(response.data);
  }

  const deleteBoard = async (obj) => {
    if (window.confirm('Delete this board?  This will also delete all the notes associated with it.')) {
      const jwt = await getAccessTokenSilently();
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
        url: '/boards',
        method: 'delete',
        baseURL: process.env.REACT_APP_BACKEND,
        data: {
          board: obj
        }
      }
      await axios(config);
      props.getBoards();
      getNotes(props.data.id);
    }

  }

  useEffect(() => {
    if (props.data.id)
      getNotes(props.data.id)
  }, [props.data.id]);

  return (
    <Container className="p-3 ms-4 mt-4" style={{ width: '272px' }} key={props.data.id} id={props.data.id} >
      <div key={props.data.id}>
        <div className="board-header" key={props.data.id}>
          <h2>{props.data.name}</h2>
          <DropdownButton
            as={ButtonGroup}
            key={props.data.id}
            id={`dropdown-variants-none`}
            title=""
          >
            <Dropdown.Item key={props.data.id} onClick={() => { deleteBoard(props.data) }} >Delete Board</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>


      {notes.length > 0 &&
        notes.map(obj => {
          return (
            <Note
              key={obj.id}
              getNotes={getNotes}
              data={obj}
            />
          )
        })
      }

      <button onClick={showModal} >
        <span>+ Add a Card</span>
      </button>
      <NoteModal
        boardObj={props.data}
        showModal={showModal}
        show={modalOpen}
        getNotes={getNotes}
      />
    </Container >
  );
}