require('dotenv').config()
const mysql=require('mysql');
const sgMail=require('@sendgrid/mail');

sgMail.setApiKey(process.env.SEND_MAIL_API_KEY);

const newUser=(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const email=req.body.email;

    const db_pass=process.env.DB_PASS;
    const db_name=process.env.DB_NAME;
    const db_user=process.env.DB_USERNAME;
    const db_host=process.env.DB_HOST;

    const message={
        to:email,
        from:process.env.EMAIL_ACCOUNT,
        subject:`Welcome ${username}`,
        text:'Thank you for joining the community.'
    }

    const sendMail=async ()=>{
        await sgMail.send(message);
        console.log('email sent');
    }
    
    // create a connection to the database
    const connection=mysql.createConnection({
        host:db_host,
        user:db_user,
        password:db_pass,
        database:db_name
    });
    
    // if statement to check wheather the user has filled all the fields in the form
    if (username.length>0 && password.length>0 && email.length>0){
    //connect to the database
    connection.connect((err)=>{
        if (err) throw err;

        const sql1='SELECT username FROM accounts WHERE username=?';
        connection.query(sql1,[username],(err,row)=>{
            if (err) throw err;
            // check if the username exists
            if(row && row.length>0){
                console.log('Row already exists');
                res.send('Username already taken');
                res.end();
            }
            else{
                // sql statement to insert the new records
                const sql2='INSERT INTO accounts (username,email,password) VALUES (?)';
                const values=[username,email,password];
                connection.query(sql2,[values],(err,results,fields)=>{
                    if(err) throw err;
                    console.log(`Records inserted: ${results}`);
                    //send email to new user
                    sendMail().catch(err=>{
                        console.log(err);
                    });
                    res.redirect('/index.html');
                });
            }
        });
    }); // end of connection to the database

} // end of root if statement

else{
    res.send('Please fill out all fields');
    res.end();
}
}

module.exports={newUser};