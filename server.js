const express = require("express");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const connection = mysql.createConnection(
    {
        host: '127.0.0.1',
      // MySQL username,
        user: 'root',
      // MySQL password
        password: 'password',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

/*db.query(`SELECT roles.id, roles.title, roles.salary, department.name AS name
FROM roles
JOIN department ON roles.department_id = department.id`, (err, results) => {
    if (err) {
        console.log(err);
    } else {
        console.log(results);
    }
});*/

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    //console.log(`Server running on port ${PORT}`);
});

module.exports = connection;