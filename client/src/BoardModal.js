import React from 'react';
import Modal from 'react-bootstrap/Modal';

import BoardForm from './BoardForm'

export default function BoardModal(props) {

  return (
    <>
      <Modal show={props.show} onHide={() => props.showModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new Board!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BoardForm
            showModal={props.showModal}
            getBoards={props.getBoards}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
