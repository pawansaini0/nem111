const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { instaRouter } = require("./routes/insta.routes");
require("dotenv").config()
const cors=require("cors")

const app = express();
app.use(express.json());
app.use(cors())

app.get("/", (req, res)=>{
res.send("<h1>Welcome</h1>")
})

app.use("/users", userRouter);
app.use("/posts", instaRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to DB!");
  } catch (error) {
    console.log(error.message);
  }
});
