
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
    return inquirer.prompt([  
        {
            type: "input",
            name: "name",
            message: "What is the name of the role?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter a role name!")
                    return false;
                };
            }
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?",
            validate: salaryInput => {
                if (isNaN(salaryInput)) {
                    console.log("Please enter a salary for this role!")
                    return false;
                } else {
                    return true;
                };
            }
        }
    ]).then(answer => { 
        const params = [answer.name, answer.salary];
        const sql = `SELECT * FROM department`;
        db.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
            const departments = result.map(({name, id}) => ({name: name, value: id}));
            inquirer.prompt([
                {
                    type: "list",
                    name: "departments",
                    message: "What department does this role belong to?",
                    choices: departments
                }
            ]).then(departmentAnswer => {
                const department = departmentAnswer.departments;
                params.push(department);
                const sql = `INSERT INTO roles (title, salary, department_id)
                VALUES (?, ?, ?)`;
                db.query(sql, params, (err) => {
                    if (err) {
                        throw err;
                    } 
                    console.log("\n");
                    console.log("Role Added!");
                    return showMenu();
                });
            });
        });
    });
}

const addEmployee = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "first",
            message: "What is the employees first name?",
            validate: firstInput => {
                if (firstInput) {
                    return true;
                } else {
                    console.log("Please enter a first name!")
                    return false;
                };
            }
        },
        {
            type: "input",
            name: "last",
            message: "What is the employees last name?",
            validate: lastInput => {
                if (lastInput) {
                    return true;
                } else {
                    console.log("Please enter a last name!")
                    return false;
                };
            }
        }
    ]).then(answer => {
        const params = [answer.first, answer.last];
        const sql = `SELECT * FROM roles`;
        db.query(sql, (err, result) => {
            if (err) {
                throw err;
            } 
            const roles = result.map(({title, id}) => ({name: title, value: id}));
            inquirer.prompt([
                {
                    type: "list",
                    name: "role",
                    message: "What is the employees role?",
                    choices: roles
                }
            ]).then(answer => {
                const role = answer.role;
                params.push(role);
                const sql = `SELECT * FROM employee`;
                db.query(sql, (err, result) => {
                    if (err) {
                        throw err;
                    }
                const managers = result.map(({first_name, last_name, id}) => ({name: `${first_name} ${last_name}`, value: id}));
                managers.push({name: "No Manager", value: null});
                inquirer.prompt([
                    {
                        type: "list",
                        name: "manager",
                        message: "Who is the employee's manager?",
                        choices: managers
                    }
                ]).then(answer => {
                    const manager = answer.manager;
                    params.push(manager);
                    const sql = `INSERT INTO employee (first_name, last_name, role_id,manager_id)
                    VALUES (?, ?, ?, ?)`;
                    db.query(sql, params, (err) => {
                        if (err) {
                            throw err;
                        }
                        console.log("\n");
                        console.log("Employee Added!");
                        return showMenu();
                    });
                });
            });
        });
    });
});
}

const updateEmployee = () => {
    const sql = `SELECT first_name, last_name, id FROM employee`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        const employees = result.map(({first_name, last_name, id}) => ({name: `${first_name} ${last_name}`, value: id}));
    inquirer.prompt([
        {
            type: "list",
            name: "employee",
            message: "Which employee's role would you like to update?",
            choices: employees
            }
    ]).then(answer => {
        const employee = answer.employee;
        const params = [employee];
        const sql = `SELECT title, id FROM roles`;
        db.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
            const roles = result.map(({title, id}) => ({name: title, value: id}));
            inquirer.prompt([
                {
                    type: "list",
                    name: "role",
                    message: "What is the employee's new role?",
                    choices: roles
                }
            ]).then(answer => {
                const roles = answer.role;
                params.unshift(roles);
                const sql = `UPDATE employee
                SET role_id = ?
                WHERE id = ?`;
                db.query(sql, params, (err) => {
                    if (err) {
                        throw err;
                    }
                console.log("\n");
                console.log("Employee Updated!");
                return showMenu();
                })
            })
        });
    });
});
}
initialize();
module.exports = { showMenu };