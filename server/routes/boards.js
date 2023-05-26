'use strict';

let express = require('express');
let router = express.Router();
const pg = require('pg');
const client = require('../db')
const format = require('pg-format');
require('dotenv').config();


router.post('/', (req, res) => {
  console.log('getting boards for', req.body)
  const values = [req.body.user_id]
  const SQL = `select * from boards where user_id = $1 order by board_order;`
  client.query(SQL, values)
    .then(response => {
      res.status(200).send(response.rows);
    })
})


router.put('/', (req, res) => {
  console.log('saving board order')
  const values = req.body.new_order.map(obj => {
    return [`(${obj.id}, ${obj.board_order})`].join(',')
  }).join(',')
  const SQL = format('UPDATE boards AS b set board_order = c.board_order FROM (values %s) as c(id, board_order) where c.id = b.id;', values)
  
    try {
      client.query(SQL)
        .then(result => {
          console.log(result.rowCount)
        })
    }
    catch(e) {
      console.log(e)
    }
})

router.delete('/', (req, res) => {
  console.log('deleting board');
  // delete the board and all the notes associated with it
  const SQL = `DELETE from boards where id=$1;`;
  const values = [req.body.board.id];
  console.log('values: ', values)
  client.query(SQL, values, (err, result) => {
    if (err) {
      console.log(err.stack)
    } else {
      const SQL = `DELETE from notes where board_id=$1`
      const values = [req.body.board.id]
      client.query(SQL, values, (err, result) => {
        if (err) {
          console.log(err.stack)
        } else {
          console.log('deleted board and notes');
          console.log('res.body', res.body);
          res.status(200).send(result.body)
        }
      })
    }
  })
})

module.exports = router;