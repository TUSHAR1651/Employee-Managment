const express = require("express");
const db = require("../utils/db");
const jwt = require("jsonwebtoken"); 
const router = express.Router();
const bycypt = require("bcrypt"); 
const multer = require("multer");
const path = require("path");

router.post("/adminLogin", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;


  db.query(
    "SELECT * FROM admin WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ error: "Database error" });
      }

      if (result.length > 0) {
        const email = result[0].email;
        
        const token = jwt.sign({ email: email }, "mysecretkey", {
          expiresIn: "1d",
        });

        res.cookie("token", token, { httpOnly: true });
        return res.json({ message: "Login success!" });
      } else {
        return res.send({ message: "Wrong email/password!" });
      }
    }
  );
});



router.post("/register", (req, res) => {
  console.log(req.body);
  const { name, email, password, salary, address, category_id } = req.body;
  bycypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error(err);
      return res.send({ error: "Error hashing password" });
    }

    db.query(
      "INSERT INTO employees (name, email, password, salary, address, category_id) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, hash, salary, address, category_id],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.send({ error: "Database error" });
        }
        return res.json({ message: "Employee added successfully!" });
      }
    );
  }
  );  
  
});
    

router.post("/add_category", (req, res) => {
    const { category } = req.body;
    db.query("INSERT INTO categories (name) VALUES (?)", [category], (err, result) => {
        if (err) {
            console.error(err);
            return res.send({ error: "Database error" });
        }
        return res.json({ message: "Category added successfully!" });
    });
});
router.get("/employees", (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if (err) {
            console.error(err);
            return res.send({ error: "Database error" });
        }
        return res.send({ message: "Employees fetched successfully!", employees: result });
    });
});
router.get("/categories", (req, res) => {
  db.query("SELECT * FROM categories", (err, result) => {
    if (err) {
      console.error(err);
      return res.send({ error: "Database error" });
    }
    return res.send({ message: "Categories fetched successfully!", categories: result });
  });
});

module.exports = router;
