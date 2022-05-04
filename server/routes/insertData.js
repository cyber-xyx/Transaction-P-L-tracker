const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

router.post("/", authorize, (req, res) => {
    const { user_id, token, buy_date, sell_date, amount, buy_volume, sell_volume } = req.body;
  
    try {
       let newData = pool.query("INSERT INTO txn (user_id, token, buy_date, sell_date, amount, buy_volume, sell_volume) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", 
        [user_id, token, buy_date, sell_date, amount, buy_volume, sell_volume]);
        return res.json({status: 'ok', message: 'all done'});

    } catch (err) {
      console.error(err.message);
      res.status(500).send("txn adding error");
    }
  });
  module.exports = router;
