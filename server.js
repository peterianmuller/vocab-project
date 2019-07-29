var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var request = require('request');
let oxford = require('oxford-dictionaries-api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.set('view engine', 'ejs');

let appId = require('./config').appId;
let appKey = require('./config').appKey;

// currently testing out new npm package that is wrapper for oxford dictionary API
let oxforddictionaries = new oxford(appId, appKey);

app.get('/lookup', (req, res) => {
	console.log('req.query.word is:', req.query.word);
	oxforddictionaries
		.entries({ word_id: req.query.word })
		.then(data => {
			//console.log(data);
			data.results.forEach(datum => {
				datum.lexicalEntries.forEach(entry => {
					entry.entries.forEach(example => {
						//console.log(example.senses);
						example.senses.forEach(sense => {
							console.log('sense is: ', sense);
							if (sense.subsenses) {
								sense.subsenses.forEach(subsense => {
									console.log('sense is:', sense);
									console.log('subsense is:', subsense);
								});
							}
						});
					});
				});
			});
			res.render('results', { word: data });
		})
		.catch(error => {
			console.log(`error is: ${error}`);
		});
});

app.get('/', (req, res) => {
	res.sendFile('index.html');
});

var server = app.listen(3000, () => {
	console.log('server started');
});
