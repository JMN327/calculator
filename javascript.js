let xArray = [];
let yArray = [];
let operator = null;
const display = document.querySelector(".display")
const buttons = document.querySelector(".buttons")

buttons.addEventListener('click', (event) => {
  let keyText = event.target.innerText;
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
      operator === null ? updateNumberArray(keyText, xArray, "x") : updateNumberArray(keyText, yArray, "y") 
      break;
    case "+":
      handleOperator(add)
      break;
    case "−":
      handleOperator(subtract)
      break;
    case "×":
      handleOperator(multiply)
      break;
    case "÷":
      handleOperator(divide)
      break;
    case "=":
      evaluate(null);
      break;
    case "C":
      clearAll()
      break;
  }
})

function handleOperator(operatorFunction) {
  if (operator === null || yArray.length === 0) {
    operator = operatorFunction;
  } else {
    evaluate(operatorFunction);
  }
}

function evaluate(nextOperator) {
  //do the evaluation and set x to answer
  // if nextOperator !== null the set operator to it
}

function updateNumberArray(keyText, thisNumberArray, name) {
  console.log(`Adding ${keyText} to ${name}` )
  if (keyText === "±") {
    if (thisNumberArray[0] === "−") {
      thisNumberArray.shift();
    } else {
      thisNumberArray.unshift("−");
    }
  } else {
    thisNumberArray.push(keyText);
  }
  
  let str = thisNumberArray.join("")
  updateDisplay(str);
}

function clearAll() {
  xArray = [];
  updateNumberArray("0", "x")
  yArray = [];
  operator = null;
}

function updateDisplay(str) {
  display.innerText = str
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