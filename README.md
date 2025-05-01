This is a base node js project template, which anyne can use it has been prepared, by keeping some of the most important code principles and project management recommendations. Feel free to change anything.

`src` -> Insidethe src folder all the source code regarding the project will reside, this will not include any knid of tests. (You might want to make seperate tests folder)

Lets take a look inside the `src` folder

- `config` -> In this folder anything and everything regarding any configurations o: setup of a library or module will be done. For example: setting up `dotenv` so that we can use the environment variables anywhere in a cleaner fashsion, this is done in the `server-config.js`. One more example can be to setup you logging library that can help you to prepare meaningful logs, so configuration for this library should also be done here.

- `routes` -> In the routes folder, we regirter a route and the corresponding middleware and controller to it.

- `middlewares` -> they are just going to intercept the incoming requests where we can write our validators, authenticators etc.

- `controllers` -> they are kind of the last middlewares as psot them you call your business layer to execute the business logic. In controllers we just recieve the incoming request and data and then pass it to the business layer, and once business layer returns an output, we structure the API reponse in controllers and send the output.

- `repositories` -> this folder contains all the logic using which we interact the DB by writing queries, all the raw queries will go here.

- `services` -> contains the business logic and interacts with repositories for the data from database.

- `utils` -> contains helper methods, error classes etc.

- Inside the `src/config` folder create a file named as `config.json` and erite the following code:
```
{
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
- or alternatively you can go inside your src folder and run the command: ``` npx sequelize init ```

- By executing the above command you will get migrations and seeders folder along with a config.json inside the config folder.

- If you are setting up your development environment, then write the username of your db, password of your db and in dialect mention whatever db you are using. For Example: mysql, mariadb, etc

- If you are setting up test or production environment, make sure you also replace the host with the hosted db url.