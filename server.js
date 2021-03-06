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
    connectionString : process.env.DATABASE_URL,
    ssl:true,
  }
});

const app = express();

//BODY PARSER
app.use(bodyParser.json());
//CORS
app.use(cors());


app.get("/",(req,res) => {
	res.send('it is working');
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


app.listen(process.env.PORT || 3000,()=>{
	console.log(`app is running on port ${process.env.PORT}`);
})


/* --END POINTS
/ --> res = This is working
/signin --> POST = success/fail
/register --> POST = user
/profile:userId --> GET = user
/image --> PUT = updated count/user object

*/