# todo-demo
> ToDo App for demo purposes

## Basic Layout
This repo consists of a backend server (`todo_backend`) and a front end (`todo_frontend`).
The backend is written in Python using Django Rest Framework (DRF) while the front end is written in javascript using React.

## The Goal
My primary focus was to create a usable app in the frameworks that AcreTrader uses. I think that I did accomplish that, although I will say if I could do it over again I would have spend more time on the backend and learning how to set up authentication. As it stands I think I underestimated how long it would take me on the frontend and I was only able to implement some very basic authentication with username and password.

## Learning Moments
One of the key things I learned during this demo was just how much functionality Django gives the user right out of the box. I was very pleased to see that with very little code on my part I had implemented CRUD on a todo object.
I was also pleased to note that migrations work much the same way as Ruby on Rails, so that concept was easy to grasp, as well as object relational mapping.

## Running the app

### todo-demo backend
**NOTE: To run the app you should have python installed.**
1. Create a virtual environment
   ```
   python3 -m venv env
   ```
2. Start venv
   ```
   source env/bin/activate 
   ```
3. Install dependencies
   ```
   pip install -r requirements.txt
   ```
4. Run the server
   ```
   python manage.py runserver
   ```

### todo-demo frontend

**NOTE: To run the app you should have npm installed.**
**NOTE: To run the front end you should be in the /todo_frontend directory.**
1. Install dependencies
   ```
   npm install
   ```
2. Start web app
   ```
   npm start
   ```
   
## Testing the app
The easiest way to test is going to be from the browser (Chrome recommended)   
With both front and back end running locally, navigate to http://localhost:3000/sign-up      
After signing up, testing the required CRUD functionality should be pretty intuitive. Use the UI to add, delete, modify, and view todos.   
**Additional tip:** Create a new account, you will notice that the todos are filtered by user 😱


