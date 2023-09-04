/*const db = require("./server");
const userInput = require("./userInput");
const Table = require("console.table");


const departmentQuery = () => {
    const departmentSql = `SELECT * FROM department`;

    db.query(departmentSql, (err, result) => {
        if (err) {
            console.error("Error fetching data from database!", err);
        }
        console.log("\n");
        console.table(result);
        //return showMenu();
        return;
    });
}

const rolesQuery = () => {
    const rolesSql = `SELECT roles.id, roles.title, roles.salary, department.name AS name FROM roles JOIN department ON roles.department_id = department.id`;

    db.query(rolesSql, (err, result) => {
        if (err) {
            console.error("Error fetching data from database!", err);
            }
        console.log("\n");
        console.table(result);
        //return showMenu();
        return;
    });
}

const employeesQuery = () => {
    const employeeSql = `SELECT employee.id, employee.first_name, employee.last_name, roles.title AS title, department.name AS Department, roles.salary AS Salary, employee.manager_id AS Manager
    FROM employee
    JOIN roles ON employee.role_id = roles.id
    JOIN department ON roles.department_id = department.id`;

    db.query(employeeSql, (err, result) => {
        if (err) {
            console.error("Error fetching data from database!", err);
        }
        console.log("\n");
        console.table(result);
        //return showMenu();
        return;
    })
};

const addDepartment = () => {
    const sql = "";

    db.query(sql, (err, result) => {
        if (err) {
            console.err("Error fetching data from database!", err);
        }
        console.log("\n");
        console.table(result);
        //return showMenu();
    });
};

const addRole = () => {
    const sql = "";

    db.query(sql, (err, result) => {
        if (err) {
            console.err("Error fetching data from database!", err);
        }
        console.log("\n");
        console.table(result);
        //return showMenu();
    });
};

const addEmployee = () => {
    const sql = "";

    db.query(sql, (err, result) => {
        if (err) {
            console.err("Error fetching data from database!", err);
        }
        console.log("\n");
        console.table(result);
        //return showMenu();
    });
};

const updateEmployee = () => {
    const sql = "";

    db.query(sql, (err, result) => {
        if (err) {
            console.err("Error fetching data from database!", err);
        }
        console.log("\n");
        console.table(result);
        //return showMenu();
    });
};

module.exports = { 
    departmentQuery, 
    rolesQuery, 
    employeesQuery, 
    addDepartment, 
    addRole, 
    addEmployee, 
    updateEmployee,
};*/