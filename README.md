# Graphql, TypeScript Backend boiler plate code with User authentication. Uses PostgresSQL and TypeORM. Can be edited to your preferences.

# Uses redis to store session which is more secure than token based authentication since the code for storing cookies isn't exposed in the frontend. One example of a vulnerability is XSS attack, It happens when an attacker can run javascript on your frontend application. This means that the attacker can just access the token that is stored in the localStorage. Cookies are not accessible by javascript; hence it is safe from xss attacks.

### To use typescript compiler, Use npm run watch

### To start the server using nodemon, Use npm run dev

### To start the server without nodemon, use npm run start

### To Create new migration, Use npm run run-migration





