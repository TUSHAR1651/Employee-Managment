if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const db = require("./utils/db");
const adminRoute = require("./Routes/AdminRoute");
const express = require("express");
const cors = require("cors");


const mysql = require("mysql2");
const path = require("path");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/auth", adminRoute);

const port = process.env.PORT;
app.listen(port, () => {    
    console.log(`Server running on port ${port}`);
});
