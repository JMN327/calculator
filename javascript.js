let xArray = [];
let yArray = [];
let operator;
let dirty;
let precision = 11;
const display = document.querySelector(".display-contents");
const buttons = document.querySelector(".buttons");
const eDisplay = document.querySelector(".e");
const operatorDisplay = document.querySelector(".operator")

initialize();
updateDisplay(["0"])

document.addEventListener('keydown', (event) => handleInput(event.key, event.preventDefault()));

buttons.addEventListener('click', (event) => handleInput(event.target.innerText));

function handleInput(keyText){
  console.log(keyText)
  switch (keyText) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "↰":
    case ".":
    case "±":
    case "F9":
    case "Backspace":
      if (!dirty) {
        initialize();
      }
      operator === null ? updateNumberArray(keyText, xArray, "x") : updateNumberArray(keyText, yArray, "y") 
      break;
    case "+":
      operatorDisplay.innerText = "+"
      handleOperator(add)
      break;
    case "-":
    case "−":
      operatorDisplay.innerText = "−"
      handleOperator(subtract)
      break;
    case "*":
    case "×":
      operatorDisplay.innerText = "×"
      handleOperator(multiply)
      break;
    case "/":
    case "÷":
      operatorDisplay.innerText = "÷"
      handleOperator(divide)
      break;
    case "Enter":
    case "=":
      operatorDisplay.innerText = ""
      evaluate(null);
      break;
    case "Escape":
    case "Delete":
    case "C":
      operatorDisplay.innerText = ""
      initialize()
      updateDisplay(["0"])
      break;
  }
}

function initialize(){
  xArray.length = 0; //resets x array
  yArray.length = 0;  //resets the y array
  operator = null;
  dirty = false;
  eDisplay.innerText = "";
}

function handleOperator(operatorFunction) {
  if (!dirty) {
    yArray.length = 0;
    operator = null;
  }
  if (xArray.length === 0) {
    xArray.push("0")
  }
  if (operator === null || yArray.length === 0) {
    //normal setting operator or changing of operator if y value is still empty
    operator = operatorFunction;
    dirty = true;
  } else {
    //if operator already exists and y has value, evaluates the function (same as
    // pressing equals key) and passes new operator to be worked on the evaluation
    // so that operations can be chained quickly
    evaluate(operatorFunction);
  }
}

function evaluate(nextOperator) {
  if (operator === null || yArray.length === 0) {
    return;
  }
  let x = parseFloat(xArray.join(""));
  let y = parseFloat(yArray.join(""));
  let result = parseFloat(operator(x,y).toPrecision(precision + 1)); //rounds to significant figures but strips zeros
  result = String(result).split("")
  if (result.length > precision) {
    eDisplay.innerText = "e";
  } else {
    eDisplay.innerText = "";
  }
  updateDisplay(result);
  xArray = result;
  if (nextOperator === null) {
    dirty = false;
  } else {
    operator = nextOperator;
    yArray.length = 0;
  }
  
  
}

function updateNumberArray(keyText, thisNumberArray, name) {
  console.log(`${keyText} key pressed on: ${name}` )

  // process number keys
  if (!isNaN(keyText)) {
    operatorDisplay.innerText = "";
    if(thisNumberArray.length < precision){
      thisNumberArray.push(keyText);
      updateDisplay(thisNumberArray, true);
    }

  }

  if (keyText === "." && !thisNumberArray.includes(".")) {
    operatorDisplay.innerText = ""
    if (thisNumberArray.length === 0) {
      thisNumberArray.push("0");
    }
    thisNumberArray.push(keyText);
    updateDisplay(thisNumberArray, true);
  }

  if (keyText === "±" || keyText === "F9") {
    if(thisNumberArray.length !== 0) { //check wasn't pressed after operator
      operatorDisplay.innerText = ""
      if (thisNumberArray[0] === "-") {
        thisNumberArray.shift();
        updateDisplay(thisNumberArray);
      } else {
        thisNumberArray.unshift("-");
        updateDisplay(thisNumberArray);
      }
    }

  } 

  if ((keyText === "↰" || keyText === "Backspace") && dirty) {
    if (operator !== null && yArray.length === 0) {
      return;
    }
    thisNumberArray.pop();
    if (thisNumberArray.length === 0) {
      thisNumberArray.push("0")
      dirty = false;
    }
    updateDisplay(thisNumberArray);
  }
}

function updateDisplay(thisNumberArray, isDirty) {
  let str = thisNumberArray.slice(0, precision).join("");
  console.log("string:" + str);
  display.innerText = str;
  dirty = isDirty ?? dirty;
}

function add(x,y) {
    return x + y;
  };
  
function subtract(x,y) {
      return x - y;
  };

function multiply(x,y) {
    return x * y;
  };
  
function divide(x,y) {
      return (x / y);
  };

function round(x, decimalPlaces){
    let shifter = 10 ** decimalPlaces;
    return Math.round(x * shifter)/shifter;
}