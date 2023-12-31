const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const PORT = process.env.PORT || 3001;

// Connect to employee_cms database
const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: "root",
    password: "Denver",
    database: "employee_cms",
  },
  console.log(`Connected to the department_db database.`)
);

const init = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "Add department",
          "View all roles",
          "Add roles",
          "View all employees",
          "Add an employee",
          "Update an employee's role",
        ],
        name: "options",
      },
    ])
    .then((answers) => {
      switch (answers.options) {
        case "View all departments":
          viewAllDepartments();
          break;

        case "Add department":
          addDept();
          break;

        case "View all roles":
          viewAllRoles();
          break;

        case "Add roles":
          addNewRole();
          break;

        case "View all employees":
          viewAllEmployees();
          break;

        case "Add an employee":
          addNewEmployee();
          break;

        case "Update an employee's role":
          updateEmployeeRole(); 
          break;
      }
    });
};

// goes here if "add department" is selected
const addDept = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter new department name",
        name: "new_dept",
      },
    ])
    .then((answers) => {
      addDepartment(answers.new_dept);
    });
};

// goes here if "add roles" is selected
const addNewRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter new role",
        name: "new_role",
      },
      {
        type: "input",
        message: "Enter salary",
        name: "new_salary",
      },
      {
        type: "input",
        message: "Enter department",
        name: "dept_name",
      },
    ])
    .then((answers) => {
      addRole(answers.new_role, answers.dept_name, answers.new_salary);
    });
};

// goes here if "add employee" is selected
const addNewEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter employee's first name",
        name: "newemp_first",
      },
      {
        type: "input",
        message: "Enter employee's last name",
        name: "newemp_last",
      },
      {
        type: "input",
        message: "Enter job title",
        name: "newemp_job_title",
      },
      {
        type: "input",
        message: "Select department",
        name: "newemp_department",
      },
      {
        type: "input",
        message: "Enter manager's name",
        name: "newemp_manager",
      },
      {
        type: "input",
        message: "Enter salary", 
        name: "newemp_salary",
      },
    ])
    .then((answers) => {
      addEmployee(
        answers.newemp_first,
        answers.newemp_last,
        answers.newemp_job_title,
        answers.newemp_department,
        answers.newemp_manager,
        answers.newemp_salary 
      );
    });
};


// shows all departments in table
const viewAllDepartments = () => {
  const query = "SELECT * FROM departments";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving departments", err);
      return;
    }
    console.table(results);
    init();
  });
};

// adds new department to table
const addDepartment = (newDeptName) => {
  const query = "INSERT INTO departments (dept_name) VALUES (?)";
  db.query(query, [newDeptName], (err, results) => {
    if (err) {
      console.error("Error adding department", err);
      return;
    }
    console.table(results);
    viewAllDepartments();
  });
};

// shows all roles in table
const viewAllRoles = () => {
  const query = `
    SELECT r.role_id, r.job_title, d.dept_name, r.salary
    FROM roles r
    JOIN departments d ON r.department_name = d.dept_name`;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving roles", err);
      return;
    }
    console.table(results);
    init();
  });
};

// adds new role to table
const addRole = (newRole, deptName, salary) => {
  const query = "INSERT INTO roles (job_title, department_name, salary) VALUES (?, ?, ?)";
  db.query(query, [newRole, deptName, salary], (err, results) => {
    if (err) {
      console.error("Error adding new role", err);
      return;
    }
    console.table(results);
    viewAllRoles();
  });
};

// show all employees in table
const viewAllEmployees = () => {
  const query = `
    SELECT e.emp_id, e.last_name, e .first_name, e.job_title, e.department_name, e.salary, e.manager
    FROM employees e
    JOIN departments d ON e.department_name = d.dept_name`;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving employees", err);
      return;
    }
    console.table(results);
    init();
  });
};

// adds new employee to table
const addEmployee = (firstName, lastName, jobTitle, departmentName, manager, salary) => {

  const salaryValue = parseFloat(salary);

  const query =
    "INSERT INTO employees (first_name, last_name, job_title, department_name, manager, salary) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [firstName, lastName, jobTitle, departmentName, manager, salaryValue], 
    (err, results) => {
      if (err) {
        console.error("Error adding new employee", err);
        return;
      }
      viewAllEmployees();
    }
  );
};

//updates existing employee's role
const updateEmployeeRole = () => {
  const employeeChoices = [];
  const query = "SELECT emp_id, CONCAT(first_name, ' ', last_name) AS full_name FROM employees";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving employee list", err);
      return;
    }
    results.forEach((employee) => {
      employeeChoices.push({
        name: employee.full_name,
        value: employee.emp_id,
      });
    });

    inquirer
      .prompt([
        {
          type: "list",
          message: "Select an employee to update their role:",
          choices: employeeChoices,
          name: "employeeId",
        },
        {
          type: "input",
          message: "Enter the new role for the employee:",
          name: "newRole",
        },
      ])
      .then((answers) => {
        const updateQuery = "UPDATE employees SET job_title = ? WHERE emp_id = ?";
        db.query(updateQuery, [answers.newRole, answers.employeeId], (updateErr, updateResults) => {
          if (updateErr) {
            console.error("Error updating employee role", updateErr);
          }
          init();
        });
      });
  });
};


init();
