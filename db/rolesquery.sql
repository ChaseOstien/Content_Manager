SELECT roles.id, roles.title, roles.salary, department.name AS name
FROM roles
JOIN department ON roles.department_id = department.id;