const express = require("express");
const app = express();
const cors = require("cors");


//middleware

app.use(cors());
app.use(express.json());

//routes
app.use("/auth", require("./routes/jwtAuth"))
app.use("/dashboard", require("./routes/dashboard"));

app.listen(5001, () => {
  console.log(`Server is starting on port 5001`);
});