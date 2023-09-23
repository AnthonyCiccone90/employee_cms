
DROP DATABASE IF EXISTS employee_cms;
CREATE DATABASE employee_cms;
USE employee_cms;

CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE employees (
  emp_id INT AUTO_INCREMENT PRIMARY KEY,
  last_name VARCHAR(30) NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  job_title VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  dept_id INT,
  salary VARCHAR(30) NOT NULL,
  manager VARCHAR(30) NOT NULL
  );

ALTER TABLE employees
MODIFY COLUMN salary VARCHAR(30) NOT NULL DEFAULT '0';


CREATE table roles (
  role_id INT AUTO_INCREMENT PRIMARY KEY,
  job_title VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  salary VARCHAR(30) NOT NULL
)

