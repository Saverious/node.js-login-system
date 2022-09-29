const express = require('express');
const session = require('express-session');
const path = require('path');
const helmet=require('helmet');
const app = express();

//calling the routes
const homeRoute=require('./routes/homeRoute');
const authRoute=require('./routes/authRoute');
const authNewUserRoute=require('./routes/authNewUserRoute');
 
// session to determine wheather the user is logged in or not
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

// mounting each route to its corresponding router
app.use('/home',homeRoute);
app.use('/login',authRoute);
app.use('/authNewUser',authNewUserRoute);

// http://localhost:3000/
app.get('/',(req, res)=>{
	// Render login.html
	res.sendFile(path.join(__dirname,'/login.html'));
});

app.get('/index.html',(req,res)=>
{
	// render index.html
	res.sendFile(path.join(__dirname,'/index.html'));
});

app.get('/createAcc',(req,res)=>{
	// render newAcc.html
	res.sendFile(path.join(__dirname,'/newAcc.html'));
});

app.listen(3000);
