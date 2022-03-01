// Variables

const nums = document.querySelectorAll(".num");
const ops = document.querySelectorAll(".operator");
const clear = document.querySelector(".clear");
const keyPress = document.querySelector("body");
let viewer = document.querySelector("#viewer");
let equals = document.querySelector("#equals");
let currNum = "";
let oldNum = "";
let resultNum;
let operator;

// When the number is clicked, get the current number

let setNum = function () {
  // If a result was displayed, reset number
  if (resultNum) {
    currNum = this.getAttribute("data-num");
    resultNum = "";
    // else add previous digit to string
  } else {
    currNum += this.getAttribute("data-num");
  }
  viewer.innerHTML = currNum;
};

// when operator is clicked, pass number to oldNum and save operator

let moveNum = function () {
  oldNum = currNum;
  currNum = "";
  operator = this.getAttribute("data-operator");
  //Reset result in attr
  equals.setAttribute("data-result", "");
};

// when equals is clicked, calculate result

let displayNum = function () {
  oldNum = parseFloat(oldNum);
  currNum = parseFloat(currNum);

  //perform calculation
  switch (operator) {
    case "add":
      resultNum = oldNum + currNum;
      break;
    case "subtract":
      resultNum = oldNum - currNum;
      break;
    case "multiply":
      resultNum = oldNum * currNum;
      break;
    case "divide":
      resultNum = oldNum / currNum;
      break;

    // if equals is pressed without an operator, keep number and continue
    default:
      resultNum = currNum;
  }
  // Display result

  viewer.innerHTML = resultNum;
  equals.setAttribute("data-result", resultNum);

  oldNum = 0;
  currNum = resultNum;
};

// Clear all
let clearAll = function () {
  oldNum = "";
  currNum = "";
  viewer.innerHTML = "0";
  equals.setAttribute("data-result", resultNum);
};

let keyPressed = false;
nums.forEach((num) => num.addEventListener("click", setNum));
ops.forEach((op) => op.addEventListener("click", moveNum));
equals.addEventListener("click", displayNum);
clear.addEventListener("click", clearAll);

keyPress.addEventListener("keypress", (e) => {
  let keyValue = e.key;

  if (!isNaN(parseFloat(keyValue)) && isFinite(keyValue)) {
    console.log(`You pressed ${keyValue}`);
    if (resultNum) {
      // If a result was displayed, reset number
      currNum = keyValue;
      resultNum = "";
    } else {
      // else add previous digit to string
      currNum += keyValue;
    }
    viewer.innerHTML = currNum;
  } else if (keyValue == "-" || keyValue == "+" || keyValue == "/" || keyValue == "*") {
    console.log(`You pressed ${keyValue}`);
    oldNum = currNum;
    currNum = "";
    operator = keyValue;
    //Reset result in attr
    equals.setAttribute("data-result", "");
  } else if (keyValue == "Enter") {
    oldNum = parseFloat(oldNum);
    currNum = parseFloat(currNum);
    switch (operator) {
      case "+":
        resultNum = oldNum + currNum;
        break;
      case "-":
        resultNum = oldNum - currNum;
        break;
      case "*":
        resultNum = oldNum * currNum;
        break;
      case "/":
        resultNum = oldNum / currNum;
        break;
      // if equals is pressed without an operator, keep number and continue
      default:
        resultNum = currNum;
    }
    viewer.innerHTML = resultNum;
    equals.setAttribute("data-result", resultNum);

    oldNum = 0;
    currNum = resultNum;
  }
});
// keyPress.addEventListener("keypress", moveNum);
