var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var request = require('request');
let oxford = require('oxford-dictionaries-api');

//app.use(bodyParser.json());
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
		.entries({ word_id: req.query.word, filter: 'fields=definitions' })
		.then(data => {
			// console.log(data);
			// create a new data set that shows the word
			let wordInfo = { definitions: [] };
			//console.log('data is:', data);
			data.results.forEach(datum => {
				// from here I can grab the language
				//console.log('datum is:', datum);
				wordInfo.language = datum.language;
				datum.lexicalEntries.forEach(entry => {
					let wordViaCategory = { partOfSpeech: entry.lexicalCategory.text };
					// each of these is a new definition per part of speech
					entry.entries.forEach(example => {
						// console.log('example is: ', example);
						let definitions = { senses: [] };
						example.senses.forEach(sense => {
							definitions.senses.push(sense.definitions);
							if (sense.subsenses) {
								definitions.subsenses = [];
								sense.subsenses.forEach(subsense => {
									definitions.subsenses.push(subsense.definitions);
								});
							}
							wordViaCategory.definitions = definitions;
						});
					});
					wordInfo.definitions.push(wordViaCategory);
				});
			});
			//res.send(data);
			res.render('results', { word: data, wordInfo: wordInfo });
		})
		.catch(error => {
			console.log(`error is: ${error}`);
			res.redirect('/');
		});
});

app.get('/', (req, res) => {
	res.sendFile('index.html');
});

var server = app.listen(3000, () => {
	console.log('server started');
});
