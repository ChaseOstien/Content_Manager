const db = require("./server");

const departmentQuery = async (data) => {
    const departmentSql = "SELECT * FROM department";

    db.query(departmentSql, (err, result) => {
        if (err) {
            console.error("Error fetching data from database!", err);
            return;
        }
        console.table(result);
    });
}

const rolesQuery = async (data) => {
    const rolesSql = "SELECT roles.id, roles.title, roles.salary, department.name AS name FROM roles JOIN department ON roles.department_id = department.id";

    db.query(rolesSql, (err, result) => {
        if (err) {
            console.error("Error fetching data from database!", err);
            return;
        }
        
        console.table(result);
    });
}

module.exports = { departmentQuery, rolesQuery, };