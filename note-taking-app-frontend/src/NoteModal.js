import React from 'react';
import Modal from 'react-bootstrap/Modal';
import NoteForm from './NoteForm';

export default function NoteModal(props) {

  return (
    <>
      <Modal show={props.show} onHide={() => props.showModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new Note!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NoteForm
          boardObj={props.boardObj}
          showModal={props.showModal}
          getNotes={props.getNotes}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
