const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.log("db baglantisi alinmadi", err.message);
    return;
  } else {
    console.log("baglanti quruldu");
    connection.release();
  }
});

/// select data db
app.get("/listen", function (req, res) {
  pool.query("SELECT * FROM dataman", (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });
});

app.get("/insert", function (req, res) {
  const query_data = "INSERT INTO  dataman (name) VALUES(?)";

  pool.query(query_data, ["Vusal"], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    } else {
      res.json({ message: "insert db", results });
    }
  });
});

app.get("/update/:id", (req, res) => {
  const id_table = req.params.id;

  const new_name = "Serxan";

  const query_update = "UPDATE dataman SET name=? WHERE id_man =? ";

  pool.query(query_update, [new_name, id_table], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    } else {
      res.json({ message: "Update olundu", results });
    }
  });
});

app.get("/delete/:id", (req, res) => {
  const idList = req.params.id;

  const query_Delete = "DELETE FROM dataman WHERE id_man = ? ";

  pool.query(query_Delete, [idList], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    } else {
      res.json({ message: "Delete db", results });
    }
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//Iism&she7272
