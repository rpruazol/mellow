'use strict';

let express = require('express');
let router = express.Router();
const pg = require('pg');
const client = require('../db')
const format = require('pg-format');
require('dotenv').config();

router.post('/', (req, res) => {
  console.log('creating new board', req.body)
  const SQL = 'INSERT INTO boards (name, board_order, created_at, user_id) VALUES ($1, $2, NOW(), $3) RETURNING *'
  const values = [req.body.title, (req.body.board_order)+1, req.body.user_id]
  client.query(SQL, values, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log('created board: ', res.rows[0]);
    }
  })
  res.status(200).send(req.body);
})

module.exports = router;