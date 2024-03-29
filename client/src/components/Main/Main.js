import React, { useEffect, useState, useRef } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import { Sortable } from '@shopify/draggable';
import Board from '../Board/Board';
import Row from 'react-bootstrap/Row';
import BoardModal from '../BoardModal/BoardModal'
import Button from 'react-bootstrap/Button';
import { useAuth0 } from "@auth0/auth0-react";




function Main(props) {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [boards, setBoards] = useState([])
  const [modalOpen, showModal] = useState(false);

  const saveOrder = async (arr) => {
    console.log('result: ', arr)
    console.log('boards: ', boards)
    const res = await getAccessTokenSilently();
    const jwt = res;
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
      url: '/boards',
      method: 'put',
      baseURL: process.env.REACT_APP_BACKEND,
      data: {
        new_order: arr
      }
    }
    await axios(config);

  }

  const getBoards = async () => {
    console.log(user, isAuthenticated)
    console.log(props)
    if (isAuthenticated) {
      const res = await getAccessTokenSilently();
      const jwt = res;
      console.log('jwt', jwt, 'res', res)
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
        baseURL: process.env.REACT_APP_BACKEND,
        url: '/boards',
        method: 'post',
        data: {
          user_id: user.email
        }
      }
      const response = await axios(config)
      setBoards(response.data);
      console.log(user, isAuthenticated)
    }
  }
  const $draggable = useRef()
  console.log($draggable)
  useEffect(() => {
    const sort = new Sortable($draggable.current, {
      draggable: '.container',
      mirror: {
        constrainDimensions: true,
        cursorOffsetX: 60,
        cursorOffsetY: 60,
      }
    })

    getBoards()


    sort.on('sortable:start', (e) => console.log('sortable:start: ', e.dragEvent.data.source.style.rotate = '3.5deg'));
    sort.on('sortable:sort', () => console.log('sortable:sort'));
    sort.on('sortable:sorted', () => console.log('sortable:sorted'));
    sort.on('sortable:stop', (e) => console.log('sortable:stop: ', saveOrder(Array.from(sort.getDraggableElementsForContainer(e.newContainer)).map((object, idx) => ({ id: object.id, board_order: idx + 1 })))));

    return () => {
      sort.destroy();
    }
  }, [isAuthenticated]);
  console.log(boards.map(value => value.id));
  console.log(user, isAuthenticated)

  return (
    <>
      <Header
        getBoards={getBoards}
        isAuthenticated={isAuthenticated}
      />
      <Row style={{ 'overflowX': 'auto', 'whiteSpace': 'nowrap' }}>
        <div ref={$draggable}>
          {boards.length > 0 &&
            boards.map(obj => {
              return (

                <Board
                  key={obj.id}
                  data={obj}
                  getBoards={getBoards}
                  jwt={getAccessTokenSilently}
                />

              )
            })
          }
          <Button onClick={showModal} variant="secondary" size="lg" className="ms-3" style={{ width: "272px" }}>
            Add a Board!
          </Button>
        </div>
        <BoardModal
          show={modalOpen}
          showModal={showModal}
          getBoards={getBoards}
        />
      </Row>
    </>
  )
}

export default Main;
