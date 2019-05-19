var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var axios = require('axios');
var parser = require('xml2json');
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

app.get('/lookup', (req, res) => {
	console.log(req.query.word.toLowerCase());
	var lookup = dict.definitions(req.query.word.toLowerCase());
	console.log(`lookup is: ${lookup}`);
	lookup.then(
		function(response) {
			console.log('response is:', response);
			for (var i = 0; i < response.results[0].lexicalEntries.length; i++) {
				console.log(response.results[0].lexicalEntries[i].entries[0].senses[0].definitions[0].definitions);
			}
			var examples = dict.examples(req.query.word.toLowerCase());
			examples.then(function(examplesResponse) {
				var examplesAndDef = response.results.concat(examplesResponse);
				res.json(examplesAndDef);
			});
		},
		function(err) {
			console.log(err);
		}
	);
});

var server = app.listen(8080);
