const mysql=require('mysql');
require('dotenv').config();

const login=(req,res) =>{

// Capture the input fields	
const password = req.body.password;
const username=req.body.username;

// Ensure the input fields exists and are not empty
if (username && password) 
{
	const db_pass=process.env.DB_PASS;
    const db_name=process.env.DB_NAME;
    const db_user=process.env.DB_USERNAME;
    const db_host=process.env.DB_HOST;

// creating a connection to nodelogin database
const connection = mysql.createConnection({
	host:db_host,
	user:db_user,
	password:db_pass,
	database:db_name
});

connection.connect((err)=>
	{
		if (err) throw err;
		console.log('200,connected to database');

		// Execute SQL query that'll select the account from the database based on the specified username and password
		const sql='SELECT * FROM accounts WHERE username= ? AND password= ?';
		connection.query(sql, [username, password],(err, results, fields)=>{
			if (err) throw err;
			// If the account exists
			if (username.length > 0 && password.length>0) {
				// Authenticate the user
				req.session.loggedin = true;
				req.session.username = username;
				console.log(req.body);
				// Redirect to home page
				res.redirect('/home');
			} else {
				res.send('User does not exist,proceed to create a new account');
			}			
			res.end();
		}); 
	});
 } else {
		res.send('Please enter Username and Password!');
		res.end();
	}
}

module.exports={login};