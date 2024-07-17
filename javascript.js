let x = 5;
let y = 7;
let operator = divide;

const buttons = document.querySelector(".buttons")

buttons.addEventListener('click', (event) => {
  switch (event.target.innerText) {
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
      console.log("number key");
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
      console.log("operator key");
      break;
    case "↰":
      console.log("backspace key");
      break;
    case "=":
      console.log("equals key");
      break;
    case "C":
      console.log("clear key");
      break;
    case ".":
      console.log("decimal place key");
      break;
    case "±":
      console.log("plus/minus key");
      break;
    default:
      break;
  }
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