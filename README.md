# Data Base Proyect 1-2
Web App for music streaming.

## Spofity
This is a custom music streaming app based on spotify data, using the technologies marked in Table 1 to meet the requirements of the project.

### Table 1
|Technology|Requirement|
| ---------- |:---------:|
|PostgreSQL  |Relational Database to storage a custom schema, create complex queries, procedures, triggers, views and indexes.  |
|Node JS Express | Serves the data to the web application, manage/protect routes and accounts authentication. |
|React | Show data on a esthetic UI, limit role functions, play songs and have an easy development by reusing components |

## Instalation

### PostgreSQL
It needs a PostgreSQL instance and a database called `spofity`.
In the repo root is the backup database file to restore the data used by the develop team.

### Node JS Express
The API need Node JS installed. Then use
```
npm install
```
command to install all the dependence packages.

Change the password to your PostgreSQL instance on `connection.js` file.

To run the API use
```
npm start
```
The server runs on localhost at port 3000 by default. The frontend already is configured to connect to this base URL.

### React
The Spofity Web App need Node JS installed too. Then use
```
npm install
```
command to install all the dependece packages.

It doesn't needs any changes.

To run the Spofity Web App use
```
npm start
```
It runs the development webpack serve on localhost at port 8080.

To build the production bundle use
```
npm run build
```
And the production bundled files will be outputted on the `./dist` folder.