'use strict';
const {describe, it} = require('mocha');
const {expect} = require('chai');

const calculateNextState = require('../src/calculator.js');

function longCalculation(myString){
    let s = null, i;
    for (i in myString) {
        s = calculateNextState(s, myString[i]);
    }
    return s;
}


let temp;

describe('calculateNextState', function() { //empty
    it('empty input should return empty string', ()=> {
        temp = JSON.parse(calculateNextState(null, ""));
        expect(temp.display).to.equal("")
    });

    it('should ignore request', () => {
        temp = JSON.parse(calculateNextState(null, "*"));
        expect(temp.display).to.equal("")
    });

    it('should return 1 digit', () => {
        temp = JSON.parse(calculateNextState(null, "1"));
        expect(temp.display).to.equal("1")
    });

    it('should return concatenation of first 2 digits', () => {
        temp = JSON.parse(longCalculation("12"));
        expect(temp.display).to.equal("12");
    });

    it('should return first number after operator', () => {
        temp = JSON.parse(longCalculation("12+"));
        expect(temp.display).to.equal("12")
    });

    it('should return second number after operator', () => {
        temp = JSON.parse(longCalculation("1+2"));
        expect(temp.display).to.equal("2")
    });

    it('should return concatenation of second number after operator', () => {
        temp = JSON.parse(longCalculation("12+34"));
        expect(temp.display).to.equal("34")
    });

    it('should return sum calculation', () => {
        temp = JSON.parse(longCalculation("12+34="));
        expect(temp.display).to.equal("46")
    });

    it('should return sub calculation', () => {
        temp = JSON.parse(longCalculation("12-34="));
        expect(temp.display).to.equal("-22")
    });

    it('should return mult calculation', () => {
        temp = JSON.parse(longCalculation("12*34="));
        expect(temp.display).to.equal("408")
    });

    it('should return div calculation', () => {
        temp = JSON.parse(longCalculation("12/3="));
        expect(temp.display).to.equal("4")
    });

    it('should return last result', () => {
        temp = JSON.parse(longCalculation("12-34=+"));
        expect(temp.display).to.equal("-22")
    });

    it('should return last input', () => {
        temp = JSON.parse(longCalculation("12-34=+2"));
        expect(temp.display).to.equal("2")
    });

    it('should return sum after sub calculation', () => {
        temp = JSON.parse(longCalculation("12-34=+2="));
        expect(temp.display).to.equal("-20")
    });

    it('should return answer according to the insertion order', () => {
        temp = JSON.parse(longCalculation("1+1*2="));
        expect(temp.display).to.equal("4")
    });

    it('should ignore all operators but the last one', () => {
        temp = JSON.parse(longCalculation("5+-*2="));
        expect(temp.display).to.equal("10")
    });

    it('should work with equal in the middle of calculation', () => {
        temp = JSON.parse(longCalculation("10=+5="));
        expect(temp.display).to.equal("15")
    });
});
