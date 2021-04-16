# What is this?

This repository involves simply creating a restful service using nodejs and mongodb. The basic 4 operations of the Restful service (GET, POST, UPDATE, DELETE) are done with a simple example. The basic authentication system and basic database operations (CRUD) required for a restful service have been made. JWT was used for the authentication system. In addition, it has been shown how the authorizations will be in a simple way in restful service.

The aim of this project is to write a general restful service with nodejs and mongodb and show how the login and authorization systems will be. In addition, it is to provide the order of the written codes and to apply a design pattern.

## Installation

1. Clone the repository
2. Install mongodb and create a database
3. Run ```npm install``` in the root of the folder to install dependencies.
4. Fill in the fields in the env.sample file and save it as .env

Example .env file:
```note
PORT=3000
MONGODB_CONNECT_STRING=mongodb://localhost/node-api
LOGIN_JWT_TOKEN=123456789
```
5. Run ```node app.js```


## Usage
```note
Note: What is done in this code is not logical. 
Because in this code, it is aimed to show the necessary operations for the restful service. 
So please focus only on how the core transactions and login system work.
```

Transactions that can be done with end points;
1. List all users => GET - localhost: 3000 / api / users /
2. Add users => POST - localhost: 3000 / api / users /
3. User logs in => POST - localhost: 3000 / api / users / login 
4. Logged in user sees own information => GET - localhost: 3000 / api / users / me
5. Logged in user updates own information => PATCH - localhost: 3000 / api / users / me
6. Logged in user with admin authorization deletes the user whose id is entered => DELETE - localhost: 3000 / api / users /: id 

```note
Note: An end point is not created to give admin authorization. 
You can manually set the isAdmin option to true in the database.
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
