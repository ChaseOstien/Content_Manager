INSERT INTO department (id, name)
VALUES  (001, "Engineering"),
        (002, "Finance"),
        (003, "Legal"),
        (004, "Sales");

INSERT INTO roles (id, title, salary, department_id)
VALUES (001, "Sales Lead", 100000, 004),
        (002, "Salesperson", 80000, 004),
        (003, "Lead Engineer", 150000, 001),
        (004, "Software Engineer", 120000, 001), 
        (005, "Account Manager", 160000, 002),
        (006, "Accountant", 125000, 002),
        (007, "Legal Team Lead", 250000, 003), 
        (008, "Lawyer", 190000, 003);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, "John", "Doe", 001, NULL),
        (002, "Mike", "Chan", 002, 001), 
        (003, "Ashley", "Rodriguez", 003, NULL),
        (004, "Kevin", "Tupik", 004, 003), 
        (005, "Kunal", "Singh", 005, NULL), 
        (006, "Malia", "Brown", 006, 005),
        (007, "Sarah", "Lourd", 007, NULL), 
        (008, "Tom", "Allen", 008, 007);
