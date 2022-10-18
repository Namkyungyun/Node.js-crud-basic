const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
  res.json({message: "Hello World!"});
})

//route.js 연결
require("./app/routes/customer")(app);

//포트 넘버 설정
app.listen(3000, () => {
  console.log("Server is running on port 3000");
})