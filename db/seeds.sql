USE employee_cms;
INSERT INTO departments (dept_name) VALUES
    ("Sales"),
    ("Engineering"),
    ("Legal"),
    ("Accounting"),
    ("Human Resources");


INSERT INTO employees (last_name, first_name, job_title, department_name, dept_id, salary, manager) VALUES
    ("Daniels", "Nicole", "Engineer I", "Engineering", 2, "80k", "Randy"),
    ("Marsh", "Stan", "Sales Associate", "Sales", 1, "50k", "Sheila"),
    ("Turner", "Heidi", "Loan Officer", "Accounting", 4, "60k", "Sharon"),
    ("Broflofski", "Kyle", "Lawyer", "Legal", 3, "120k", "Gerald"),
    ("McCormick", "Kenneth", "CPA", "Accounting", 4, "100k", "Sharon"),
    ("Cartman", "Eric", "Paralegal", "Legal", 3, "40k", "Gerald"),
    ("Stotch", "Leopold", "HR Assistant", "Human Resources", 5, "40k", "Liane"),
    ("Testaburger", "Wendy", "HR Manager", "Human Resources", 5, "100k", "Liane"),
    ("Stevens", "Bebe", "Sales Director", "Accounting", 4, "100k", "Sheila"),
    ("Valmer", "Jimmy", "Engineer II", "Engineering", 2, "100k", "Randy");

INSERT INTO roles (job_title, department_name, salary) VALUES
    ("Sales Associate", "Sales", "50k"),
    ("Sales Director", "Sales", "100k"),
    ("Engineer I", "Engineering", "80k"),
    ("Engineer II", "Engineering", "100k"),
    ("Paralegal", "Legal", "40k"),
    ("Lawyer", "Legal", "120k"),
    ("Loan Officer", "Accoutning", "60k"),
    ("CPA", "Accoutning", "100k"),
    ("HR Assistant", "Human Resources", "40k"),
    ("HR Manager", "Human Resources", "100k");
    