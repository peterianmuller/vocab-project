var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var axios = require('axios');
var path = require('path');
var request = require('request');
let oxford = require('oxford-dictionaries-api');
var https = require('https');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

let appId = require('./config').appId;
let appKey = require('./config').appKey;

// currently testing out new npm package that is wrapper for oxford dictionary API
let oxforddictionaries = new oxford(appId, appKey);
oxforddictionaries.entries({ word_id: 'box' }).then(data => {
	data.results.forEach(datum => {
		datum.lexicalEntries.forEach(entry => {});
	});
});

// To run when testing API call directly without npm wrappers
// request(options2, callback);

var server = app.listen(3000, () => {
	console.log('server started');
});
