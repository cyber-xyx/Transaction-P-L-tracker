const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");
const { response } = require("express");


router.post("/", (req, res) => {
  const id = req.body.user_id;
  pool.query("SELECT * FROM txn WHERE user_id::text = $1", [id], (error, results) => {
         if (error) {
           res.send(error)
          //  res.json({blah: 'blah'})
          //  throw error
         }
         res.status(200).send(results.rows)
       })
  });
  module.exports = router;
