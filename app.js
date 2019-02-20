const app = require('express')();
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

/* Get the data from the link below:
	https://github.com/benoitvallon/100-best-books/blob/master/books.json
*/
var collections = [];
// Read JSON file
function readBooks(req,res,next){
	fs.readFile('books.json', 'utf-8', function(err, data){
	if (!err){
		console.log("Open file successfully");
		collections = JSON.parse(data);
	} else {
		console.log(err);
	}
	});
};

app.use(bodyParser.json());
app.use(express.urlencoded());
//
// For all cases
app.get('/', function(req,res,next){
	res.send('<h1>Welcome to homepage</h1>');
	next();
});

//
// Shows the all context
app.get('/all', function(req,res,next){
	console.log(collections);
	res.send(collections);
	next();
});

//
// Adds some new book into it.
app.get('/newbook', function(req, res, next){
	res.sendFile(__dirname+'/newbook.html');
});

app.post('/newbook', function(req, res, next){
	readBooks();
	var author = req.body.author;
	var country = req.body.country;
	var imageLink = req.body.imageLink;
	var link = req.body.link;
	var language = req.body.language;
	var page = req.body.page;
	var title = req.body.title;
	var year = req.body.year;

	readBooks(req,res,next);
	if ((author || country || imageLink || link || language || page || title || year) !== '') {
		var obj = {"autor":author, "country":country, "imageLink":imageLink, "link":link, "language":language, 
			"page":page, "title":title, "year":year
		};
		console.log(obj);
		collections.push(obj);

		fs.writeFile('books.json', JSON.stringify(collections), function(err){
			if (err) throw err;
			console.log('Saved!');
		});
		res.send('Complete!');
	} else {
		res.status(404).send('Information not complete');
	}
});

//
// Update specific book
app.get('/updatebook', function(req,res,next){
	res.sendFile(__dirname+'/updateBook.html');
});

app.post('/updatebook', function(req, res, next){

	// Search book
	var author = req.body.author;
	var page = Number(req.body.page);
	var obj = {"author":author, "pages":page};

	console.log(obj);
	readBooks(req,res);
	console.log('Go Back');
	console.log(collections.filter(config =>Object.keys(obj).every(key => config[key] === obj[key])));

	// TODO
	// Override the book information

});

//
// Delete the specific book
app.get('/deletebook', function(req,res,next){
	res.sendFile(__dirname+'/deleteBook.html');
});

app.delete('/deletebook', function(req, res, next){

	// Search book
	var author = req.body.author;
	var page = Number(req.body.page);
	var obj = {"author":author, "pages":page};

	console.log(obj);
	readBooks(req,res);
	console.log('Go Back');
	var target = collections.filter(config =>Object.keys(obj).every(key => config[key] === obj[key]));

	// Delete the target
	if (target !== []){
		delete collection[target];
	} else {
		console.log('Can not find the book');
	}
});


app.listen(4001, function(){
	console.log("Listening on 4001");
});






