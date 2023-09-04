
const inquirer = require("inquirer");
const Table = require("console.table");
const db = require("./db/connections");


const showMenu = () => {
inquirer.prompt([
    {
        type: "list",
        message: "What would you like to do?",
        name: "main",
        choices: [
            "View All Departments", 
            "View All Roles", 
            "View All Employees", 
            "Add Department", 
            "Add Role", 
            "Add an Employee", 
            "Update Employee Role", 
            "Exit Program"
        ]
        
    }
]).then(answers => {
        const answer = answers.main;

            if (answer === "View All Departments") {
                departmentQuery();
            } else if (answer === "View All Roles") {
                rolesQuery();
            } else if (answer === "View All Employees") {
                employeesQuery();
            } else if (answer === "Add Department") {
                addDepartment();
            } else if (answer === "Add Role") {
                addRole();
            } else if (answer === "Add an Employee") {
                addEmployee();
            } else if (answer === "Update Employee Role") {
                updateEmployee();
            } else if (answer === "Exit Program") {
                process.exit(0);
            } else {
                console.log("Select a valid choice!");
            }
        });
    };

const initialize = () => {
    showMenu();
}

const departmentQuery = () => {
    const departmentSql = `SELECT * FROM department`;
    
        db.query(departmentSql, (err, result) => {
            if (err) {
                console.error("Error fetching data from database!", err);
            }
            console.log("\n");
            console.table(result);
            return showMenu();
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
            return showMenu();
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
            return showMenu();
        })
    };
    
const addDepartment = () => {
        return inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is the name of the department?",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log("Please enter a department name!")
                        return false;
                    };
                }
            }
        ]).then(answer => {
            const sql = `INSERT INTO department (name)
        VALUES (?);`;
        const params = answer.name;
        db.query(sql, params, (err) => {
            if (err) {
                throw err;
            }
            console.log("\n");
            console.log("Department Added!");
            return showMenu();
        });
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
            return showMenu();
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
            return showMenu();
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
            return showMenu();
        });
    };
initialize();
module.exports = { showMenu };