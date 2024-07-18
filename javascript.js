let xArray = []; //store digits of first operand
let yArray = []; //store digits of second operand
let operator; //store the operator as a function
let dirty; // boolean check state for resets
let precision = 11; //limit on digits that can be displayed

const display = document.querySelector(".display-contents");
const buttons = document.querySelector(".buttons");
const eDisplay = document.querySelector(".e");
const operatorDisplay = document.querySelector(".operator")

initialize(); // set initial values
updateDisplay(["0"]) //set display to begin

//check for keyboard
document.addEventListener('keydown', (event) => handleInput(event.key, event.preventDefault()));
// check for buttons
buttons.addEventListener('click', (event) => handleInput(event.target.innerText));

// handle both event listeners
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
      // no operator passed to evaluation (null) so no operator chaining
      evaluate(null); 
      break;
    case "Escape":
    case "Delete":
    case "C":
      //resets all
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

function handleOperator(nextOperator) {
  // if no operator chaining then makes sure operator and y are reset 
  // (x not reset so that evaluation results can be used)
  if (!dirty) {
    yArray.length = 0;
    operator = null;
  }
  //handle operating on initial zero value
  if (xArray.length === 0) {
    xArray.push("0")
  }

  if (operator === null || yArray.length === 0) {
    //no operator chaining: setting operator or changing 
    // operator if y value is still empty i.e. operator mis-click
    operator = nextOperator;
    dirty = true;
  } else {
    // operator chaining - next operator passed for evaluation to handle
    evaluate(nextOperator);
  }
}

function evaluate(nextOperator) {
  // check for early = key presses and exit if found
  if (operator === null || yArray.length === 0) {
    return;
  }
  // begin evaluation by turning arrays to numbers
  let x = parseFloat(xArray.join(""));
  let y = parseFloat(yArray.join(""));
  //operates on numbers and rounds to significant figures but strips zeros
  let result = parseFloat(operator(x,y).toPrecision(precision + 1)); 
  // turn result back to array for displaying
  result = String(result).split("")
  // check for numbers larger than display and show 'e' display to alert user
  if (result.length > precision) {
    eDisplay.innerText = "e";
  } else {
    eDisplay.innerText = "";
  }
  // show result
  updateDisplay(result);
  // set x so that evaluation results can be operated on
  xArray = result;
  // handle operator chaining
  if (nextOperator === null) {
    dirty = false;
  } else {
    operator = nextOperator;
    yArray.length = 0;
  }
}

// handle numerical key downs
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
  // handle decimal places
  if (keyText === "." && !thisNumberArray.includes(".")) {
    operatorDisplay.innerText = ""
    //handle operating on initial zero value
    if (thisNumberArray.length === 0) {
      thisNumberArray.push("0");
    }
    thisNumberArray.push(keyText);
    updateDisplay(thisNumberArray, true);
  }

  // handle negation
  if (keyText === "±" || keyText === "F9") {
    if(thisNumberArray.length !== 0) { 
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

  // handle backspace
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