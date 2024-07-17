let x = 5;
let y = 7;
let operator = divide;

/* const digitButtons = document.querySelector(".digit-buttons");
const operatorButtons = document.querySelector(".operator-buttons");
const equalsButton = document.querySelector(".equals-button");
const clearButton = document.querySelector(".clear-button"); */

const calculator = document.querySelector(".Calculator")


calculator.addEventListener('click', (event) => {
  console.log(event.target.innerText);
})


function operate(x,y,operation){
    return operation(x,y);
}

//test:
console.log(round(operate(x,y,operator),1));

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