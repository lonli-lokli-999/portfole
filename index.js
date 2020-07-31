	'use strict';

const express	= require('express');
const app		= express();
const path		= require( 'path' );
const port		= process.env.PORT || 4000;

app.use( express.static(path.join(__dirname, 'public') ) );

app.get('/', (req, res) => {
	res.sendFile('./public/index.html', { root : __dirname });
});

app.listen(port, () => {
	console.log(__dirname);
	console.log("Listening Port " + `http://localhost:${port}`);
});
