'use strict';

let express = require('express');
let router = express.Router();
require('dotenv').config();

const pg = require('pg');
const client = require('../db')


router.get('/', (req, res) => {
  console.log('getting notes')
  const SQL = `select * from notes where board_id='${req.query.id}';`
  client.query(SQL)
    .then(response => {
      res.status(200).send(response.rows);
    })
})


router.delete('/', (req, res) => {
  console.log('deleting note')
  const SQL = 'DELETE FROM notes WHERE id=$1';
  const params = [req.body.id]

  client.query(SQL, params, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log(res.rows[0]);
    }
  })
  res.status(200).send(req.body);
})

router.post('/', (req, res) => {
  console.log('creating note')
  const SQL = 'INSERT INTO notes (title, description, board, board_id, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING *'
  const values = [req.body.title, req.body.description, req.body.board, req.body.board_id];
  client.query(SQL, values, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log(res.rows[0]);
    }
  })
  res.status(200).send(req.body);

})

router.put ('/', (req, res) => {
  console.log('editing note', req.body)
  const values = [req.body.title, req.body.description, req.body.id];
  const SQL = 'UPDATE notes SET title=$1, description=$2, updated_at=NOW() WHERE board_id=$3 RETURNING *';
  client.query(SQL, values, (err, res) => {
    if(err) {
      console.log(err.stack)
    } else {
      console.log(res);
    }
  })
  res.status(200).send(req.body);
})

module.exports = router;