const buttons = document.querySelector(".buttons");
const display = document.querySelector(".display-contents");
const eDisplay = document.querySelector(".e");
const operatorDisplay = document.querySelector(".operator");

let xArray = []; //store digits of first operand
let yArray = []; //store digits of second operand
let operator; //store the operator as a function
let precision = 11; //limit on digits that can be displayed
let evaluated = false; //boolean to determine if evaluation has happened
let keyFunction;

//check for keydown events
document.addEventListener("keydown", (event) =>
  filterInput(event.key, event.preventDefault())
);
// check for button presses
buttons.addEventListener("click", (event) =>
  filterInput(event.target.innerText)
);

// direct keydown and button press events to correct input types
function filterInput(keyText) {
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
  }
  fHandler(keyFunction, keyText);
}

function fHandler(keyFunction, keyText) {
  keyFunction(keyText);
  //updateState();
  //updateDisplay();
}

function fZero(keyText) {
  switch (state) {
    case 0:
      break;

    case 1:
      break;

    case 2:
      break;

    case 3:
      break;

    case 4:
      break;

    default:
      break;
  }
}
function fNumber(keyText) {
  switch (state) {
    case 0:
      break;

    case 1:
      break;

    case 2:
      break;

    case 3:
      break;

    case 4:
      break;

    default:
      break;
  }
}

function fBackspace(keyText) {
  switch (state) {
    case 0:
      break;

    case 1:
      break;

    case 2:
      break;

    case 3:
      break;

    case 4:
      break;

    default:
      break;
  }
}

function fDecimal(keyText) {
  switch (state) {
    case 0:
      break;

    case 1:
      break;

    case 2:
      break;

    case 3:
      break;

    case 4:
      break;

    default:
      break;
  }
}

function fNegate(keyText) {
  switch (state) {
    case 0:
      break;

    case 1:
      break;

    case 2:
      break;

    case 3:
      break;

    case 4:
      break;

    default:
      break;
  }
}

function fOperate(keyText) {
  switch (state) {
    case 0:
      break;

    case 1:
      break;

    case 2:
      break;

    case 3:
      break;

    case 4:
      break;

    default:
      break;
  }
}

function fEquals(keyText) {
  switch (state) {
    case 0:
      break;

    case 1:
      break;

    case 2:
      break;

    case 3:
      break;

    case 4:
      break;

    default:
      break;
  }
}

function fClear(keyText) {
  switch (state) {
    case 0:
      break;

    case 1:
      break;

    case 2:
      break;

    case 3:
      break;

    case 4:
      break;

    default:
      break;
  }
}

// check state values and return state enumerator
function updateState() {
  // 0. x value is 0, operator is null, y length is 0
  // 1. x value is non-zero, operator is null, y length is 0
  // 2. x value is non-zero, operator function is assigned, y length is 0
  // 3. x value is non-zero, operator function is assigned, y length is non-zero, is not evaluated
  // 4. x value is non-zero, operator function is assigned, y length is non-zero, is evaluated
  let state;
  switch (true) {
    case xArray[0] === 0 &&
      operator === null &&
      yArray.length === 0 &&
      evaluated === false:
      state = 0;
      break;

    case arrayToFloat(xArray) !== 0 &&
      operator === null &&
      yArray.length === 0 &&
      evaluated === false:
      state = 1;
      break;

    case arrayToFloat(xArray) !== 0 &&
      operator !== null &&
      yArray.length === 0 &&
      evaluated === false:
      state = 2;
      break;

    case arrayToFloat(xArray) !== 0 &&
      operator !== null &&
      yArray.length !== 0 &&
      evaluated === false:
      state = 3;
      break;

    case arrayToFloat(xArray) !== 0 &&
      operator !== null &&
      yArray.length !== 0 &&
      evaluated === true:
      state = 4;
      break;

    default:
      state = -1;
      alert("State Error");
      break;
  }

  return state;
}

// change visuals on webpage
function updateDisplay(nArray, e, operator) {
  let str = nArray.slice(0, precision).join("");
  display.innerText = str;
  if (e) {
    eDisplay.innerText = "e";
  } else {
    eDisplay.innerText = "";
  }
  operatorDisplay.innerText = operator;
}

// utilities:
function initialize() {
  xArray.length = 0; //resets x array
  xArray[0] = "0";
  yArray.length = 0; //resets the y array
  operator = null;
  evaluated = false;
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
