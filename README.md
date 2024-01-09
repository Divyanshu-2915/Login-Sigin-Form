This is a simple React application that provides user registration (sign up) and login functionality, featuring form validation on both the client and server sides.
The application uses React for the front end and Axios for making HTTP requests to a backend server. 
The backend server is assumed to be running at `http://127.0.0.1:8000`.

## Features - 

  #User Registration (Sign Up): New users can register by providing a username, email, and password. The application checks for various conditions, such as valid email format, strong       password requirements, and matching password and confirm password.

  #User Login: Existing users can log in with their username, email, and password. The application performs client-side validation for each field and communicates with the backend to       authenticate the user.

  #Form Validation: The application performs client-side form validation to ensure that users provide valid inputs. Error messages are displayed for each field that fails validation.

  #Error Handling: The application handles errors gracefully, displaying specific error messages for different scenarios, such as invalid username, email, password, or general server-      side errors.

  #Navigation: Users can navigate between the registration and login forms using navigation links.

## Project Structure - 

  #App.js: The main component that sets up the React Router for navigation between different pages.

  #Main.js: The landing page component with links to the registration and login pages.

  #SignIn.js: Component for user registration (sign up) with form validation and error handling.

  #Login.js: Component for user login with form validation and error handling.

## Used - 
  React Router - for routing in React applications.
  Axios - for making requests to the backend server.
  useState - for managing the state of States and Messages.
  Arrow Functions - for using useState variables in a react function without any error.
  Regex Expression - for checking the standard format for input fields.
  
