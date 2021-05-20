require("dotenv").config();
const express = require('express');
const cors = require('cors');
const PORT = 5000;
const bodyParser = require('body-parser');
const app = express();
const {initalizeConnection} = require("./dbconnection/db.connection.js");
const {sendDataToDb} = require("./dbconnection/sendData");
const {errorHandler} = require("./middlewares/error-handler.js");
const {routeHandler} = require("./middlewares/route-handler.js");
const videoRouter = require("./routes/video-router");
const userRouter = require("./routes/user-router");

app.use(cors());
app.use(bodyParser.json());

initalizeConnection();


app.get('/', (req, res) => {
  res.send('Youflix VideoLibrary Backend')
});

app.use("/videos",videoRouter);
app.use("/users",userRouter);

app.use(errorHandler);
app.use(routeHandler);

app.listen(PORT, () => {
  console.log(`server started on port http://localhost:${PORT}/`);
});