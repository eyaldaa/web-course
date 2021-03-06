var chai = require('chai')
  , chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;


var strCreator = function(state, input){
	return '{"calculatorState":'+state+', "input":'+'"'+input+'"'+'}'
};


function makePromise(to_send){
	return new Promise(function(resolve, reject) {
        	setTimeout(function() {
		    resolve(chai.request('http://localhost:3000')
				  .post('/calculate')
				  .type('application/json')
				  .send(to_send));
        	}, 200);
    	});
};


function longPromise(myString){
	let s = null, i;
	var tempPromise = makePromise(strCreator(s,myString[0]));
	for (i=1; i< myString.length; i++) {
		const input = myString[i];
		tempPromise = tempPromise.then(result => makePromise(strCreator(JSON.stringify(result.body),input)));
	}
	return tempPromise;
	
}

it("should ignore request", function() {
	var testPromise = makePromise(strCreator(null,"*"));
	return testPromise.then(function(res){
        	expect(res.body.display).to.equal("");
    	});
});

it("input is 1 digit", function() {
	var testPromise = makePromise(strCreator(null,"1"));
	return testPromise.then(function(res){
        	expect(res.body.display).to.equal("1");
    	});
});

it("should return concatenation of second number after operator", function() {
	var testPromise = longPromise("12+34");
	return testPromise.then(function(res){
        	expect(res.body.display).to.equal("34");
    	});
});

it("should return sum calculation", function() {
	var testPromise = longPromise("12+34=");
	return testPromise.then(function(res){
        	expect(res.body.display).to.equal("46");
    	});
});

it("should return answer according to the insertion order", function() {
	var testPromise = longPromise("1+1*2=");
	return testPromise.then(function(res){
        	expect(res.body.display).to.equal("4");
    	});
});

it("should work with equal in the middle of calculation", function() {
	var testPromise = longPromise("10=+5=");
	return testPromise.then(function(res){
        	expect(res.body.display).to.equal("15");
    	});
});
