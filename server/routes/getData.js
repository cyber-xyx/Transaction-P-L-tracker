const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");
const { response } = require("express");
const { parse: uuidParse } = require("uuid");


router.get("/", (req, res) => {
  const id = req.body;
  pool.query("SELECT * FROM txn WHERE user_id::text = 'c76d3b50-c287-49b3-b163-240b61bbdb6b'", (error, results) => {
         if (error) {
           res.send(error)
          //  res.json({blah: 'blah'})
          //  throw error
         }
         res.status(200).send(results)
       })
  });
  module.exports = router;
