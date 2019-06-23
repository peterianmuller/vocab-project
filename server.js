var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var axios = require('axios');
let Dictionary = require('oxford-dictionary');

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`));

let appId = require('./config').appId;
let appKey = require('./config').appKey;

let config = {
	app_id: appId,
	app_key: appKey,
	source_lang: 'en'
};

var dict = new Dictionary(config);

app.get('/', (req, res) => {
	res.render('index.html');
});

app.get('/lookup', (req, res) => {
	var lookup = dict.definitions(req.query.word.toLowerCase());
	console.log(`lookup is: ${lookup}`);
	lookup.then(
		response => {
			console.log('response is:', response);
			for (var i = 0; i < response.results[0].lexicalEntries.length; i++) {
				console.log(response.results[0].lexicalEntries[i].entries[0].senses[0].definitions[0].definitions);
			}
			var examples = dict.examples(req.query.word.toLowerCase());
			examples.then(examplesResponse => {
				var examplesAndDef = response.results.concat(examplesResponse);
				res.json(examplesAndDef);
			});
		},
		err => {
			console.log(`err is: ${err}`);
		}
	);
});

var server = app.listen(8080);
