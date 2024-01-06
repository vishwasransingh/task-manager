# Task Management Application

This is a task management application with a Spring Boot backend and a React.js frontend. The application provides user authentication, real-time task updates, and various operations (CRUD) on tasks. The communication between the frontend and backend is secured using Spring Security and JSON Web Tokens (JWT).



## Table of Contents


- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)

- [Configuration](#configuration)
  - [Configuring database connection](#configuring-database-connection)
  - [Configuring data-source credentials](#configuring-data-source-credentials)


- [Usage](#usage)
  - [Login](#login)
  - [Welcome Page](#welcome-page)
  - [Task List](#task-list)



- [Features](#features)
  - [Real-time Updates](#real-time-updates)
  - [Task Operations](#task-operations)
  - [Security](#security)

- [Demonstration Videos](#demonstration-videos)

## Getting Started

### Prerequisites
The PC should have :

- [Node.js](https://nodejs.org/) installed
- [Maven](https://maven.apache.org/) installed
- [MySQL](https://www.mysql.com/) database setup
- Compatible browser
- JDK 17+

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/vishwasransingh/task-manager.git
   ```

2. Navigate to the backend module:

   ```bash
   cd your-path-where-repository-is-cloned/backend
   ```

3. Build and run the backend:

   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

4. Navigate to the frontend module:

   Open another instance of command-prompt / terminal and run below commands :

   ```bash
   cd frontend
   ```

5. Install frontend dependencies:

   ```
   npm install
   ```

6. Start the frontend:

   ```
   npm start
   ```

## Configuration
### Configuring database connection
  Navigate to `\task-manager\backend\src\main\resources`. Locate `application.properties` 
  file there and edit the following properties as per need :
  1. Configuring data-source URL :
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
```
  Note : The app requires a ready-made MySQL database created for this purpose. The table creation is managed by the Spring Boot but the the user needs to create the database beforehand. For creating database, type below in MySQL command line client:
```sql
CREATE DATABASE your_database_name;
```

  2. Configuring data-source credentials :
```bash
spring.datasource.username=root
spring.datasource.password=root
```

### Configuring login credentials
  - Navigate to `\task-manager\backend\src\main\java\com\taskmanager\jwt`. Locate `application.properties` file.
  - You can configure user-name and password from here:
```bash
# Define your username and password properties
security.username=admin
security.password=12345
```
Note: Currently username is `admin` and password is `12345`.
## Usage

### Login

Upon starting the application, the login page will be displayed. Enter valid credentials to proceed to the welcome page.

### Welcome Page

After successful login, users will be redirected to the welcome page. From here, they can navigate to the task list page.

### Task List

The task list page displays tasks fetched in real-time from the backend, which, in turn, retrieves them from the MySQL database. The page allows users to perform various operations on tasks, such as adding, deleting, updating, and toggling completion status using checkboxes.

## Features

### Real-time Updates

The application provides real-time updates of the task list, ensuring that users always have the latest information.

### Task Operations

Users can perform the following operations on tasks:

1. **Add Task:** Add a new task to the list.

https://github.com/vishwasransingh/task-manager/assets/142225419/a7d3e4ef-bbb5-4cd5-ae49-73260ab0a21f

2. **Delete Task:** Remove an existing task from the list.

https://github.com/vishwasransingh/task-manager/assets/142225419/fd4950aa-0f8e-4f84-8631-f62ecc29cd91

3. **Update Task:** Modify the details of an existing task.

https://github.com/vishwasransingh/task-manager/assets/142225419/a2269475-e2c7-4120-b9c0-f3fee510c757
 
4. **Toggle Completion:** Change the completion status of a task.

https://github.com/vishwasransingh/task-manager/assets/142225419/5f92add6-ec46-42f9-a1a9-cb344399d9d9

### Security
- JWT and Spring Security
: The communication between the frontend and backend is secured using JSON Web Tokens (JWT) and Spring Security. This ensures a secure and authenticated interaction between the modules.

## Demonstration Videos

1. Starting application :
   
https://github.com/vishwasransingh/task-manager/assets/142225419/133e6396-c059-4fb0-b4a1-0c8fd4dd2cde

2. Logging in :
   
https://github.com/vishwasransingh/task-manager/assets/142225419/6939571b-c9d7-4f26-a061-cf837f264ff2

3. Wrong credentials :
   
https://github.com/vishwasransingh/task-manager/assets/142225419/8bba600c-783f-46f1-bec5-a85725bbfa60

4. Navigation bar :
   
https://github.com/vishwasransingh/task-manager/assets/142225419/9f978ac1-61d1-4fcd-bfb9-55ee64249dd8

5. Retrieving task-list :
   
https://github.com/vishwasransingh/task-manager/assets/142225419/48330ad8-3ced-4417-8d71-6d4ea40831c4

6. Logging out :
   
https://github.com/vishwasransingh/task-manager/assets/142225419/b8c79258-c50e-42cd-ad7b-ef38229cf547


   







