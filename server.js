var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var axios = require('axios');

app.use(bodyParser.json());

app.use(express.static(`${__dirname}/public`));

var teams = [];

app.get('/nba', (req, res) => {
	console.log('right route');
	axios
		.get('http://data.nba.net/data/10s/prod/v1/2017/players.json', {
			headers: {
				// not sure why/if we need this!
				// 'Access-Control-Allow-Origin': '*',
				// 'Content-Type': 'application/json;charset=UTF-8'
			}
		})
		.catch(function(error) {
			console.log(`error is: ${error}`);
		})
		.then(response => {
			res.send(response.data.league.standard);
		});
});

var server = app.listen(8080);
