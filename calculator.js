
var myOperators = {
    "+": function(s1, s2) {return (Number(s1) + Number(s2)).toString()},
    "-": function(s1, s2) {return (Number(s1) - Number(s2)).toString()},
    "/": function(s1, s2) {return (Number(s1) / Number(s2)).toString()},
    "*": function(s1, s2) {return (Number(s1) * Number(s2)).toString()}
};

var digits = ["0","1","2","3","4","5","6","7","8","9"];

function initializeJsonState(disp) {
    return {
			"display": disp,
            "firstNum": "",
            "secondNum": "",
            "operator": "",
            "isEqualOn": false,
            "inSecondNumber": false
    };
}

function calculateNextState(jsonState, input) {
    if (jsonState == null) {
        var disp = (input in digits) ? input : "";
        jsonState = initializeJsonState(disp);
    } else {
        jsonState = JSON.parse(jsonState);
        var result = null;
        if (input == "=") { //input is =
            var b = "";
            var equal = jsonState.firstNum != "" && jsonState.display != "";
            if (equal) {
                jsonState.secondNum = jsonState.display;
                jsonState.isEqualOn = true;
                jsonState.inSecondNumber = false;
            }
            if (equal || jsonState.isEqualOn) {
                result = myOperators[jsonState.operator](jsonState.firstNum, jsonState.secondNum);
                jsonState.display = result;
                jsonState.firstNum = result;
            }
        } else if (myOperators[input] != null) { //input is an operator
            if (jsonState.isEqualOn) {
                jsonState = initializeJsonState(jsonState.display);
            }
            if (jsonState.inSecondNumber) {
                result = myOperators[jsonState.operator](jsonState.firstNum, jsonState.display);
                jsonState = initializeJsonState(result);
            }
            jsonState.operator = input;
        } else if (input in digits) { //input is a digit
            if (jsonState.operator == "") { //no previous operator => we are in first number
                jsonState.display += input;
            } else {    //there is an operator
                if (jsonState.isEqualOn) { //need to start new state
                    jsonState = initializeJsonState(input);
                } else if (jsonState.firstNum == "") {
                    jsonState.firstNum = jsonState.display;
                    jsonState.display = input;
                    jsonState.inSecondNumber = true;
                } else {
                    jsonState.display += input;
                }

            }
        }
    }
    return JSON.stringify(jsonState);
}

var s = null;

//var a = ["1","2","+","4","3","=","+","1","=","=","=","5","+","-","*","2","="];
var a = ["1","2","+","3","+","1","*","4","=","=","5","+","-","*","2","="];
//var a = ["+","1"];

for (var i in a) {
    s = calculateNextState(s, a[i]);
    //console.log(s);
    console.log(JSON.parse(s).display)
}
