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
  const query = "SELECT employees.id, employees.name, employees.email, employees.salary, employees.address, categories.name as category FROM employees INNER JOIN categories ON employees.category_id = categories.id";
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      return res.send({ error: "Database error" });
    }
    return res.send({ message: "Employees fetched successfully!", employees: result });
  });
});
router.delete("/delete_employee/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
        if (err) {
            console.error(err);
            return res.send({ error: "Database error" });
        }
        return res.send({ message: "Employee deleted successfully!" });
    });
});
router.post("/update_employee", (req, res) => {
    const { id, name, email, salary, address, category_id } = req.body;
    db.query("UPDATE employees SET name = ?, email = ?, salary = ?, address = ?, category_id = ? WHERE id = ?", [name, email, salary, address, category_id, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.send({ error: "Database error" });
        }
        return res.send({ message: "Employee updated successfully!" });
    });
}
);

router.get("/categories", (req, res) => {
  db.query("SELECT * FROM categories", (err, result) => {
    if (err) {
      console.error(err);
      return res.send({ error: "Database error" });
    }
    return res.send({ message: "Categories fetched successfully!", categories: result });
  });
});
router.get("/category_count", (req, res) => {
  db.query("SELECT count(*) as Count FROM categories", (err, result) => {
    if (err) {
      console.error(err);
      return res.send({ error: "Database error" });
    }
    return res.send({ message: "Categories fetched successfully!", categories: result });
  });
});
router.get("/admin_count", (req, res) => {
  db.query("SELECT count(*) as Count FROM admin", (err, result) => {
    if (err) {
      console.error(err);
      return res.send({ error: "Database error" });
    }
    return res.send({ message: "Admin fetched successfully!", admin: result });
  });
});

router.get("/employee_count", (req, res) => {
  db.query("SELECT count(*) as Count FROM employees", (err, result) => {
    if (err) {
      console.error(err);
      return res.send({ error: "Database error" });
    }
    // console.log(result);
    return res.send({ message: "Employees fetched successfully!", employees: result });
  });
});

module.exports = router;
