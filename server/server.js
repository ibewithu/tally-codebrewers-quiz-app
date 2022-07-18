require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const app = express()

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err))

const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const quizRoute = require("./routes/quiz")
const questionRoute = require("./routes/question")
const responseRoute = require("./routes/response")

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/quiz", quizRoute);
app.use("/question", questionRoute);
app.use("/response", responseRoute);

app.listen("5000", () => {
  console.log("Backend is running.");
});
