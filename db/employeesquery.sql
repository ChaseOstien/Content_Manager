SELECT employee.id, employee.first_name, employee.last_name, roles.title AS title, department.name AS Department, roles.salary AS Salary, employee.manager_id AS Manager
FROM employee
JOIN roles ON employee.role_id = roles.id
JOIN department ON roles.department_id = department.id;


