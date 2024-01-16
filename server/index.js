require("dotenv").config();
const express = require('express');
const cors = require('cors'); 
const app = express();

const userRouter = require("./routes/user.route");
const postRouter = require("./routes/posts.route");

app.use(cors()); 
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

app.listen(8080, () => {
    console.log("server is running");
});