const express = require("express");
const { users } = require("./router");
const connectDB = require("./config/db");

const app = express();

connectDB();

// Middleware
app.use(express.json());
app.use("/api/users", users);

const port = process.env.PORT | 4000;
app.listen(port, () => console.log(`Server is listening on port: ${port}`));
