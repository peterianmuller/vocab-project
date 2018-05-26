var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var axios = require('axios');
var parser = require('xml2json');

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`));

let keySpan = require('./config').keyWebsterSpanish;
let keyEng = require('./config').keyWebsterEng;

app.get('/lookup', (req, res) => {
	console.log(req);
	console.log('right route');
	axios
		.get(`https://www.dictionaryapi.com/api/v1/references/collegiate/xml/${req.query.word}?key=${keyEng}`)
		.catch(function(error) {
			console.log(`error is: ${error}`);
		})
		.then(response => {
			var json = parser.toJson(response.data);
			res.send(json);
		});
});

var server = app.listen(8080);
