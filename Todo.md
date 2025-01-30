Case Study: Expense Tracker with Analysis

Objective
The goal of this project is to create a backend for an expense-tracking application with
minimalistic frontend functionality. The backend will support user registration, login,
adding transactions, and simple analysis using a pie chart to display expenses by
category. Participants will use AWS Lambda for serverless architecture, PostgreSQL for
data management, and JWT for basic authentication.

Project Overview and Requirements
1. User Authentication (JWT-based)
1. User Registration: Implement a Lambda function that allows new users to register
using an email and password.
2. User Login: Implement a Lambda function that allows existing users to log in with
an email and password.
3. JWT Authentication: Use JWT tokens for session management. On successful
login, a token should be returned to the user to authorize future transactions.
Note: Password hashing is optional
2. Expense Management
1. Add Transaction: Allow users to add a transaction with the following details:
● Amount: The value of the expense.
● Category: Type of expense (e.g., groceries, transportation).
● Date: Date of the transaction.
2. Delete Transaction: Enable users to delete a transaction by specifying its ID.
3. Database: Store user and transaction data in a PostgreSQL database, using a
simple structure to manage users and expenses.
3. Analysis for Expense Summary
1. Pie Chart Visualization: Use a pie chart on the Frontend to show the breakdown
of expenses by category
Note: Make sure the primary focus is on how efficiently you code the backend to
manage the data retrieval and aggregation necessary for the visualization.

Deliverables
1. GitHub Repository
● Code Structure: Organize the code with folders for Lambda functions,
database setup, and frontend components.
● Clear Organization: Follow a modular structure, keeping files and
functions organized by feature (e.g., auth, transactions, analysis).
● Note: Your GitHub repository should be accessible to
fundsroomtech@gmail.com

2. Documentation
● README File: Provide a README that includes:
● Setup Instructions: Steps to set up the project locally, including
database setup, environment variable configuration, and
installation commands.
● API Guide: Document each API endpoint (registration, login, add
transaction, delete transaction, and expense visualization), with
example requests and responses.

3. Demo
● Deployed Lambda Functions: If possible, provide a deployed version of
the Lambda functions for testing, or local testing setup instructions.
● Screenshots or Video Demo: Include visuals (screenshots or video) of the
frontend showcasing:
● Registration and login process
● Adding a transaction
● The pie chart of expense analysis

Evaluation Criteria

1. Completeness:
● The project should meet the core requirements:
● Functional JWT-based authentication
● Transaction management (adding, deleting)
● pie chart analysis of expenses by category

2. Database Integration:
● Efficient use of PostgreSQL for managing users and transactions,
including basic aggregation for analysis.

3. Frontend Presentation:
● The frontend should showcase the key features (registration, adding
transactions, and pie chart).
4. Documentation and Organization:
● Clear instructions in the README and organized code in the GitHub
repository.

Tech Stack
Participants are expected to use the following technologies:
1. Backend:
● Node.js with AWS Lambda for a serverless architecture.
● TypeScript
● JWT handling user authentication.
● AWS API Gateway for routing requests to Lambda functions.
2. Database:
● PostgreSQL for data management.
● Optionally use Drizzle ORM or plain SQL queries to interact with the
database.
3. Frontend:
● HTML/CSS and JavaScript for creating a simple UI for user registration,
login, adding transactions, analysis

This version of the case study includes the tech stack participants should use and provides a
clear breakdown of requirements, and deliverables.