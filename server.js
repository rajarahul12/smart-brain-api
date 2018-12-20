const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const morgan = require("morgan");

//Handlers Importing
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

//Auth middleware for protecting routes / endpoints
const auth = require("./controllers/authorization");

/* For Heroku
const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});
*/

//For Localhost

console.log("URI", process.env.POSTGRES_URI);

const db = knex({
  client: "pg",
  connection: process.env.POSTGRES_URI
  /*
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: "",
    database: process.env.POSTGRES_DB
  }*/
});

const app = express();

const whitelist = ["http://localhost:3001"];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

//Applying Middlewares
//MORGAN for logging
app.use(morgan("combined"));
//CORS
app.use(cors());
//BODY PARSER
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("it is working");
});

// console.log("check");

//Signing IN
app.post("/signin", signin.signinAuthentication(db, bcrypt));

//Registering
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

//Getting USER DATA for the Profile Page
app.get("/profile/:id", auth.requireAuth, (req, res) => {
  profile.handleProfileGet(req, res, db);
});

//Endpoint for Updating the user data
app.post("/profile/:id", auth.requireAuth, (req, res) => {
  profile.handleProfileUpdate(req, res, db);
});

//Increasing the entries
app.put("/image", auth.requireAuth, (req, res) => {
  image.handleImage(req, res, db);
});

//POST request for CLARIFAI API
app.post("/imageUrl", auth.requireAuth, (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3000, () => {
  console.log(`app is running on port 3000`);
});

/* --END POINTS
/ --> res = This is working
/signin --> POST = success/fail
/register --> POST = user
/profile:userId --> GET = user
/image --> PUT = updated count/user object

*/
