let xArray = [];
let yArray = [];
let operator = null;

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
      operator === null ? updateNumberArray(keyText, "x") : updateNumberArray(keyText, "y") 
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
      console.log("clear key");
      break;
    default:
      break;
  }
})

function handleOperator(operatorFunction) {
  if (operator === null || yArray.length === 0) {
    operator = operatorFunction;
  } else {
    evaluate(operatorFunction)
  }
}

function evaluate(nextOperator) {
  //do the evaluation and set x to answer
  // if nextOperator !== null the set operator to it
}

function updateNumberArray(keyText, number) {
  console.log(`Adding ${keyText} to number Array ${number}`)
}

function operate(x,y,operation){
    return operation(x,y);
}

//test:
//console.log(round(operate(x,y,operator),1));

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