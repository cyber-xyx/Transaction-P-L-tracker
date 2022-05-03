import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { toast } from "react-toastify";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import NativeSelect from "@material-ui/core/NativeSelect";
// import { use } from "../../../server/routes/getData";



const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [uuid, setUuid] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5001/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      console.log(parseData);
      //setName(parseData.user_name);
      setUuid(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const [trade, setTrade] = useState({
    sellData: {},
    buyData: {},
    gains: 0,
    valid: false,
  });
  const coinList = [
    { id: 0, name: "None Selected" },
    { id: 1, name: "bitcoin" },
    { id: 2, name: "ethereum" },
    { id: 3, name: "tezos" },
    { id: 4, name: "cardano" },
  ];

  const [buyDate, setBuyDate] = useState("");
  const [sellDate, setSellDate] = useState("");
  const [coin, setCoin] = useState(coinList.name);
  const [volume, setVol] = useState(null);

  const calcGains = () => {
    setTrade({
      ...trade,
      gains:
        (trade.sellData.market_data?.current_price.usd -
          trade.buyData.market_data?.current_price.usd) *
        volume,
    });
  }; //... means keep all key/value pairs, only change what following

  const coingeckoUrl = (coin, date) => {
    return `https://api.coingecko.com/api/v3/coins/${coin}/history?date=${date}&localization=false`;
  };

  const coingeckoFetch = async (buy, coin, date) => {
    fetch(coingeckoUrl(coin, date)).then((response) =>
      response.json().then((jsonData) => {
        if (buy) {
          setTrade({ ...trade, buyData: jsonData });
        } else {
          setTrade({ ...trade, sellData: jsonData });
        }
      })
    );
  };

  const handleBuyChange = (e) => {
    let val = e.target.value;
    setBuyDate(val);
    coingeckoFetch(true, coin, val);
  };

  const handleSellChange = (e) => {
    let val = e.target.value;
    setSellDate(val);
    coingeckoFetch(false, coin, val);
  };

  const handleCoinChange = (e) => {
    let val = e.target.value;
    setCoin(val);
    coingeckoFetch(null, coin, val);
  };

  const submitTrade = async () => {
    try {
      let user_id = uuid;
      let token = coin;
      let buy_date = buyDate;
      let sell_date = sellDate;
      let amount = volume;

      const body = {user_id, token, buy_date, sell_date, amount}
      const res = await fetch("http://localhost:5001/insertdata/", {  
      method: "POST",
        headers: { jwt_token: localStorage.token,  "Content-type": "application/json" },
        body: JSON.stringify(body)
      }
      )
      ;
      
    } catch (err) {
      console.error(err.message);
    }

  }
  
  return (
    <div>
      <h1 className="header"> 📈🚀Welcome {name}, Caclculate your Returns 😢📉 </h1>
      <Box className="box">
        <div className="top-row">
          <Box>
            <h2> 🏦 Select Coin </h2>
            <NativeSelect
              defaultValue={coin}
              onChange={(val) => handleCoinChange(val)}
            >
              {coinList.map((item) => (
                <option key={item.id}>{item.name}</option>
              ))}
            </NativeSelect>
          </Box>
          <Box>
            <h2>Enter Buy Date </h2>

            <TextField
              placeholder="dd-mm-yyyy"
              format="dd-mm-yyyy"
              helperText="Insert date in the correct format"
              defaultValue={buyDate}
              onChange={(val) => handleBuyChange(val)}
            />
          </Box>

          <Box>
            <h2>Enter Sell Date</h2>
            <TextField
              placeholder="dd-mm-yyyy"
              helperText="Insert date in the correct format"
              className="text-inputs"
              defaultValue={sellDate}
              onChange={(val) => handleSellChange(val)}
            />
          </Box>
          <Box>
            <h2> 💰 Enter Amount of Tokens</h2>
            <TextField
              placeholder="Number of Tokens"
              className="text-inputs"
              value={volume}
              onChange={(e) => setVol(e.target.value)}
            />
          </Box>
        </div>
        <div className="bottom-row"></div>
        <Button variant="contained" color="primary" onClick={submitTrade}>
          Post to DB
        </Button>
        <h3>
          You bought {trade.buyData.name} at:{" "}
          {trade.buyData.market_data?.current_price.usd.toFixed(2)} USD
        </h3>
        <h3>
          You sold {trade.buyData.name} at:{" "}
          {trade.sellData.market_data?.current_price.usd.toFixed(2)} USD
        </h3>
        <h1 style={{ color: trade.gains < -1 ? "red" : "green" }}>
          🤑💸 Returns: ${trade.gains.toFixed(2)} USD 💸🤑
        </h1>

      </Box>
     
      <h1 className="header">Your past transactions</h1>
      <Box className="box">


      </Box>

      <button onClick={e => logout(e)} className="header">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
