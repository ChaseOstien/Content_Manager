// Each inquirer prompt will display the same choices
// View All Departments
// View all roles
// view all employees
// add a department
// add a role
// add an employee
// update an employee role

// When each prompt is selected, a specific sql query should be executed on the data base that retrieves the specified data or updates the specified data. It should display the next prompt below the queried data. 
// When a prompt is selected that requires further input, you will need to respond to the further questions and those answers should be inserted into the specified table.

// When one of the prompts asks you a question with options, the prompts will need to pull the current data for those options from the table. 

const inquirer = require("inquirer");
const { departmentQuery, rolesQuery } = require("./getdata");

const showMenu = async () => {
const answers = await inquirer.prompt([
    {
        type: "list",
        message: "What would you like to do?",
        name: "main",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add Department", "Add Role", "Add an Employee", "Update Employee Role", "Exit Program"],
        validate: (value) => {
            if (value) {
                return true;
            } else {
                return "Select an option to continue!"
            }
        }
    }
]);
return answers;
};

const main = async () => {
        console.log("\n");
    for (let count = 0; count < 8; count++) {
        const answers = await showMenu();
            
            const { main } = answers;

            if (main === "View All Departments") {
                console.log("\n");
                await departmentQuery();
            } else if (main === "View All Roles") {
                console.log("\n");
                await rolesQuery();
            } else if (main === "Exit Program") {
                process.exit(0);
            } else {
                console.log("Select a valid choice!");
            }
        };
};
main();