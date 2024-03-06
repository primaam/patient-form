const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;
// db
const createDb = "CREATE DATABASE IF NOT EXISTS patient";
const createTable = `CREATE TABLE IF NOT EXISTS detail
    (
        id int NOT NULL AUTO_INCREMENT,
        patient_name VARCHAR(255),
        patient_id VARCHAR(255),
        date DATE,
        treatment_desc VARCHAR(255),
        medic_pres VARCHAR(255),
        cost DECIMAL(15,2),
        PRIMARY KEY (id)
    )
`;
// const changeColumn = `ALTER TABLE detail MODIFY `
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "patient",
});

db.connect(function (error) {
    if (error) {
        console.error(error);
    } else {
        console.info("Connected to Database");
    }
});

db.query(createDb, (err, res) => {
    if (err) throw err;
    console.log("Database created");
});

db.query(createTable, (err, res) => {
    if (err) throw err;
    console.log("Table created");
});

// db.query(changeColumn, (err, res) => {
//     if (err) throw err;
//     console.log("successs");
// });

app.post("/add_patient", (req, res) => {
    const patientDetails = req.body;
    const sql = `INSERT INTO detail SET ?`;

    db.query(sql, patientDetails, (err, result) => {
        if (err) throw err;
        res.send("success");
    });
});

app.get("/", (req, res) => {
    const query = `SELECT * FROM detail ORDER BY id DESC LIMIT 5`;

    db.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(JSON.stringify(result));
    });
});

app.listen(port, () => {
    console.log("listening", port);
});

module.exports = db;
