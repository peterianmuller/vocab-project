var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var axios = require('axios');
var parser = require('xml2json');

app.use(bodyParser.json());

let key = require('./config').keyWebsterSpanish;
console.log(key);

app.use(express.static(`${__dirname}/public`));

var teams = [];

app.get('/lookup', (req, res) => {
	console.log(req);
	console.log('right route');
	axios
		.get(`https://www.dictionaryapi.com/api/v1/references/spanish/xml/${req.query.word}?key=${key}`)
		.catch(function(error) {
			console.log(`error is: ${error}`);
		})
		.then(response => {
			var json = parser.toJson(response.data);
			console.log(json);
			//res.send(response);
			res.send(json);
		});
});

var server = app.listen(8080);
