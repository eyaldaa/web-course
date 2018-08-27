const express = require('express')
const bodyParser = require('body-parser');
const calculateNextState = require('./calculator.js');
const app = express()

app.use(bodyParser.json());

app.post('/calculate', function(req, res) {
	var state = req.body['calculatorState'];
	if (state){
		state = JSON.stringify(state);
	}
	var input = req.body['input'];
	console.log(state);
	console.log(input)
	console.log();
	var result = calculateNextState(state, input);

	res.json(JSON.parse(result))
})

app.listen(3000, () => console.log('listening...'))
