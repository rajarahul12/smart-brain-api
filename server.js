const express=require('express');
const bodyParser=require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');

//Handlers Importing
const register=require('./controllers/register');
const signin=require('./controllers/signin');
var profile=require('./controllers/profile');
var image=require('./controllers/image');

const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'rahul123',
    database : 'smart-brain'
  }
});

const app = express();

//BODY PARSER
app.use(bodyParser.json());
//CORS
app.use(cors());


app.get("/",(req,res) => {
	res.send(database.users);
});


//Signing IN
app.post("/signin", (req,res)=>{signin.handleSignin(req , res , db , bcrypt)});

//Registering
app.post("/register",(req,res) => { register.handleRegister(req , res ,db , bcrypt) } );


//Getting USER DATA for the Profile Page
app.get('/profile/:id',(req,res) => { profile.handleProfileGet(req,res,db) });


//Increasing the entries
app.put('/image',(req,res)=>{ image.handleImage(req,res,db)});

//POST request for CLARIFAI API
app.post('/imageUrl', (req,res) => { image.handleApiCall(req,res)})


app.listen(3000,()=>{
	console.log('app is running on port 3000');
})


/* --END POINTS
/ --> res = This is working
/signin --> POST = success/fail
/register --> POST = user
/profile:userId --> GET = user
/image --> PUT = updated count/user object

*/