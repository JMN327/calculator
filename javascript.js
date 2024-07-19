// get HTML elements
const buttons = document.querySelector(".buttons");
const display = document.querySelector(".display-contents");
const eDisplay = document.querySelector(".e");
const operatorDisplay = document.querySelector(".operator");

let state; // store the state
let dirty = false; // boolean check that work has begun
let xArray = []; // store digits of first operand
let yArray = []; // store digits of second operand
let operator; // store the operator as a function
let evaluated; // store is evaluation has taken place
let precision = 11; // limit on digits that can be displayed
let keyFunction;
let numberArrayToDisplay;
let operatorToDisplay;
let result;

initialize();
updateState();
updateDisplay(numberArrayToDisplay);

//check for keydown events
document.addEventListener("keydown", (event) =>
  filterInput(event.key, event.preventDefault())
);
// check for button presses
buttons.addEventListener("click", (event) =>
  filterInput(event.target.innerText)
);

// direct keydown and button press events to function handler
function filterInput(keyText) {
  console.log(`key ${keyText}`);
  switch (keyText) {
    case "0":
      keyFunction = fZero;
      break;
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      keyFunction = fNumber;
      break;
    case "↰":
    case "Backspace":
      keyFunction = fBackspace;
      break;
    case ".":
      keyFunction = fDecimal;
      break;
    case "±":
    case "F9":
      keyFunction = fNegate;
      break;
    case "+":
    case "-":
    case "−":
    case "×":
    case "/":
    case "÷":
      keyFunction = fOperate;
      break;
    case "Enter":
    case "=":
      keyFunction = fEquals;
      break;
    case "Escape":
    case "Delete":
    case "C":
      keyFunction = fClear;
      break;
    default:
      keyText = "";
  }
  fHandler(keyFunction, keyText);
}

// run key functions and update state and display
function fHandler(keyFunction, keyText) {
  keyFunction(keyText);
  console.log(keyFunction.name);
  updateState();
  updateDisplay(numberArrayToDisplay);
}

// Key functions - check state and update x, y or operator according to key functionality
function fZero(keyText) {
  switch (state) {
    case 0: // x value is 0, operator is null, y length is 0, is not evaluated
      //do nothing
      break;

    case 1: // x value is non-zero, operator is null, y length is 0, is not evaluated
      if (xArray.length < precision) xArray.push(keyText);
      numberArrayToDisplay = "x";
      break;

    case 2: // x value is non-zero, operator function is assigned, y length is 0, is not evaluated
      if (yArray.length < precision) yArray.push(keyText);
      numberArrayToDisplay = "y";
      break;

    case 3: // x value is non-zero, operator function is assigned, y length is non-zero, is not evaluated
      if (arrayToFloat(yArray) !== 0 || yArray.length > 1) {
        if (yArray.length < precision) yArray.push(keyText);
        numberArrayToDisplay = "y";
      }
      break;

    case 4: // x value is non-zero, operator function is assigned, y length is non-zero, is evaluated
      initialize();
      break;

    default: // error
      break;
  }
}
function fNumber(keyText) {
  switch (state) {
    case 0: // x value is 0, operator is null, y length is 0, is not evaluated
      xArray.push(keyText);
      xArray.shift();
      numberArrayToDisplay = "x";
      dirty = true;
      break;

    case 1: // x value is non-zero, operator is null, y length is 0, is not evaluated
      if (xArray.length < precision) xArray.push(keyText);
      numberArrayToDisplay = "x";
      break;

    case 2: // x value is non-zero, operator function is assigned, y length is 0, is not evaluated
      yArray.push(keyText);
      numberArrayToDisplay = "y";
      break;

    case 3: // x value is non-zero, operator function is assigned, y length is non-zero, is not evaluated
      if (yArray.length < precision) yArray.push(keyText);
      numberArrayToDisplay = "y";
      break;

    case 4: // x value is non-zero, operator function is assigned, y length is non-zero, is evaluated
      initialize();
      xArray.push(keyText);
      xArray.shift();
      numberArrayToDisplay = "x";
      break;

    default: // error
      break;
  }
}
function fBackspace(keyText) {
  switch (state) {
    case 0: // x value is 0, operator is null, y length is 0, is not evaluated
      // do nothing
      break;

    case 1: // x value is non-zero, operator is null, y length is 0, is not evaluated
      xArray.pop();
      if (xArray.length === 0) {
        xArray.push("0");
        numberArrayToDisplay = "x";
      }
      break;

    case 2: // x value is non-zero, operator function is assigned, y length is 0, is not evaluated
      // do nothing
      break;

    case 3: // x value is non-zero, operator function is assigned, y length is non-zero, is not evaluated
      yArray.pop();
      if (yArray.length === 0) {
        yArray.push("0");
        numberArrayToDisplay = "y";
      }
      break;

    case 4: // x value is non-zero, operator function is assigned, y length is non-zero, is evaluated
      // do nothing
      break;

    default: // error
      break;
  }
}
function fDecimal(keyText) {
  switch (state) {
    case 0: // x value is 0, operator is null, y length is 0, is not evaluated
      xArray.push(keyText);
      numberArrayToDisplay = "x";
      dirty = true;
      break;

    case 1: // x value is non-zero, operator is null, y length is 0, is not evaluated
      if (!xArray.includes(keyText)) {
        if (xArray.length < precision) xArray.push(keyText);
        numberArrayToDisplay = "x";
      }
      break;

    case 2: // x value is non-zero, operator function is assigned, y length is 0, is not evaluated
      yArray.push("0");
      yArray.push(keyText);
      numberArrayToDisplay = "y";
      break;

    case 3: // x value is non-zero, operator function is assigned, y length is non-zero, is not evaluated
      if (!yArray.includes(keyText)) {
        if (yArray.length < precision) yArray.push(keyText);
        numberArrayToDisplay = "y";
      }
      break;

    case 4: // x value is non-zero, operator function is assigned, y length is non-zero, is evaluated
      initialize();
      xArray.push(keyText);
      numberArrayToDisplay = "x";
      break;

    default: // error
      break;
  }
}
function fNegate(keyText) {
  switch (state) {
    case 0: // x value is 0, operator is null, y length is 0, is not evaluated
      // do nothing
      break;

    case 1: // x value is non-zero, operator is null, y length is 0, is not evaluated
      if (xArray[0] === "-") {
        xArray.shift();
      } else {
        xArray.unshift("-");
      }
      break;

    case 2: // x value is non-zero, operator function is assigned, y length is 0, is not evaluated
      // do nothing
      break;

    case 3: // x value is non-zero, operator function is assigned, y length is non-zero, is not evaluated
      if (yArray[0] !== "0" || yArray.length > 1) {
        if (yArray[0] === "-") {
          yArray.shift();
        } else {
          yArray.unshift("-");
        }
      }
      break;

    case 4: // x value is non-zero, operator function is assigned, y length is non-zero, is evaluated
      // do nothing
      break;

    default: // error
      break;
  }
}
function fOperate(keyText) {
  switch (keyText) {
    case "+":
      possibleOperator = add;
      operatorToDisplay = "+";
      break;

    case "-":
    case "−":
      possibleOperator = subtract;
      operatorToDisplay = "−";
      break;
    case "×":
      possibleOperator = multiply;
      operatorToDisplay = "×";
      break;
    case "/":
    case "÷":
      possibleOperator = divide;
      operatorToDisplay = "÷";
      break;
  }
  switch (state) {
    case 0: // x value is 0, operator is null, y length is 0, is not evaluated
      operator = possibleOperator;
      dirty = true;
      break;

    case 1: // x value is non-zero, operator is null, y length is 0, is not evaluated
      operator = possibleOperator;
      break;

    case 2: // x value is non-zero, operator function is assigned, y length is 0, is not evaluated
      operator = possibleOperator;
      break;

    case 3: // x value is non-zero, operator function is assigned, y length is non-zero, is not evaluated
      let result = evaluate();
      xArray = result;
      operator = possibleOperator;
      yArray.length = 0;
      evaluated = false;
      break;

    case 4: // x value is non-zero, operator function is assigned, y length is non-zero, is evaluated
      //xArray = result;
      operator = possibleOperator;
      yArray.length = 0;
      evaluated = false;
      break;

    default: // error
      break;
  }
}
function fEquals(keyText) {
  operatorToDisplay = "";
  let result;
  switch (state) {
    case 0: // x value is 0, operator is null, y length is 0, is not evaluated
      // do nothing
      break;

    case 1: // x value is non-zero, operator is null, y length is 0, is not evaluated
      // do nothing
      break;

    case 2: // x value is non-zero, operator function is assigned, y length is 0, is not evaluated
      yArray = xArray;
      result = evaluate();
      xArray = result;

      break;

    case 3: // x value is non-zero, operator function is assigned, y length is non-zero, is not evaluated
      result = evaluate();
      xArray = result;
      break;

    case 4: // x value is non-zero, operator function is assigned, y length is non-zero, is evaluated
      result = evaluate();
      xArray = result;
      break;

    default: // error
      break;
  }
}
function fClear() {
  initialize();
}

// x operates on y returns result
function evaluate() {
  evaluated = true;
  let x = parseFloat(xArray.join(""));
  let y = parseFloat(yArray.join(""));
  result = parseFloat(operator(x, y).toPrecision(precision + 1));
  result = String(result).split("");
  if (result.length > precision) {
    e = true;
  } else {
    e = false;
  }
  numberArrayToDisplay = "x";
  return result;
}

// check state values and return state enumerator
function updateState() {
  // 0. x value is 0, operator is null, y length is 0, is not evaluated
  // 1. x value is non-zero, operator is null, y length is 0, is not evaluated
  // 2. x value is non-zero, operator function is assigned, y length is 0, is not evaluated
  // 3. x value is non-zero, operator function is assigned, y length is non-zero, is not evaluated
  // 4. x value is non-zero, operator function is assigned, y length is non-zero, is evaluated
  switch (true) {
    case !dirty &&
      operator === null &&
      yArray.length === 0 &&
      evaluated === false:
      state = 0;
      break;

    case dirty &&
      operator === null &&
      yArray.length === 0 &&
      evaluated === false:
      state = 1;
      break;

    case dirty &&
      operator !== null &&
      yArray.length === 0 &&
      evaluated === false:
      state = 2;
      break;

    case dirty &&
      operator !== null &&
      yArray.length !== 0 &&
      evaluated === false:
      state = 3;
      break;

    case dirty &&
      operator !== null &&
      yArray.length !== 0 &&
      evaluated === true:
      state = 4;
      break;

    default:
      state = -1;
      alert("State Error");
      console.log(dirty, operator.name, yArray.length, evaluated);
      break;
  }
  console.log("state " + state);
}

// change visuals on webpage
function updateDisplay(numberArrayToDisplay) {
  if (numberArrayToDisplay === "x") {
    nArray = xArray;
  } else {
    nArray = yArray;
  }
  let str = nArray.slice(0, precision).join("");
  console.log(`string: ${str}`);
  display.innerText = str;
  if (e) {
    eDisplay.innerText = "e";
  } else {
    eDisplay.innerText = "";
  }
  operatorDisplay.innerText = operatorToDisplay;
}

// utilities:
function initialize() {
  dirty = false;
  xArray.length = 0; //resets x array
  xArray[0] = "0";
  yArray.length = 0; //resets the y array
  operator = null;
  e = false;
  operatorToDisplay = "";
  evaluated = false;
  numberArrayToDisplay = "x";
}

function arrayToFloat(nArray) {
  return parseFloat(nArray.join(""));
}

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}
