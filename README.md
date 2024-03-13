# Project Overview:

This project is aimed at building an API using Node.js with Express server to handle user input. The API will validate the input data according to predefined rules and store validated data in a MySQL database using Prisma ORM. Additionally, the API will generate a PDF document containing user information and return the path to the generated PDF file in the API response.

## Requirements
- Node.js
- Prisma ORM
- MySQL server
- Express.js
- Body-parser
- Express-validator
- PDFKit
- fs (File System module)


# Project Setup Instructions:
### 1.Clone Repository
```
git clone <repository_url>

```
### 2.Navigate to Project Directory:

`cd <project_directory>`

### 3.Install Dependencies:

`npm install`


**To set up your MySQL database and configure Prisma to connect to it, follow these steps:**

Install MySQL: If you haven't already, install MySQL on your system. You can download and install MySQL from the official website: MySQL Downloads.

Create a Database: Once MySQL is installed, open a terminal or command prompt and log in to MySQL with a user account that has sufficient privileges to create databases. Then, create a new database for your application.
**For example:**
`CREATE DATABASE your_database_name;`

# Install Prisma CLI: 

**Install the Prisma CLI globally on your system using npm:**

`npm install prisma -g`

**Initialize Prisma: In your project directory, initialize Prisma by running the following command:**

`prisma init`

This command initializes a new Prisma project and creates a prisma directory with some default files.

**Configure Prisma to use MySQL: After initializing Prisma, configure it to use MySQL as the database provider. Open the prisma/schema.prisma file and replace its contents with the following:**

prisma

```
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

Define your Data Model: In the schema.prisma file
### define your data model. For example:
schema.prisma

```
model User {
  id           Int      @id @default(autoincrement())
  firstName    String
  lastName     String
  phoneNumber  String
  emailAddress String
}
```


**Replace DATABASE_URL with the connection URL for your MySQL database. For local development, the URL might look like**

`mysql://username:password@localhost:3306/your_database_name.`


**Prisma Client: 
Generate the Prisma client by running the following command:**

`prisma generate`

This command generates the Prisma Client based on your data model.

# snapshots of outputs


## 1.In these Response we get user created and path of the pdf

<img width="943" alt="Api response" src="https://github.com/surendrayadavcse/swivl-assignment_2/assets/155749543/f2009a0d-79b9-4a73-a798-8373ff5d1d99">

## 1.data in the pdf what we post to database 

<img width="942" alt="pdf created output" src="https://github.com/surendrayadavcse/swivl-assignment_2/assets/155749543/53389fda-f81b-421e-a094-d10c63865a43">
