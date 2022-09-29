const home=(req,res)=>{
	// If the user is loggedin
	if (req.session.loggedin) {
		res.redirect('/index.html');
	} else {
		res.send('Please login to view this page!');
		res.end();
	}
	res.end();

}

module.exports={home};