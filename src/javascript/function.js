//"use strict" // 선언된 변수만 사용가능하게 정의!!!

function printHello() {
  console.log(`Hello`);
}
printHello();

function log(message) {
  console.log(message);
}
log("Hello@");

function changeName(obj) {
  obj.company = "Jonetech";
}
const companyInfo = { company: "Jone" };
changeName(companyInfo);
console.log(companyInfo);

function showMessage(message, from = "unknown") {
  // if(from === undefined){
  //   from = "unknown"
  // }
  console.log(`${message} by ${from}`);
}
showMessage("Hi!");

function printAll(...args) {
  for (let i = 0; i < args.length; i++) {
    console.log(args[i]);
  }

  for (const arg of args) {
    console.log(arg);
  }

  args.forEach((arg) => console.log(arg));
}
printAll("Lee", "Jeong", "Won");

function randomQuiz(answer, printYes, printNo) {
  if (answer === "love you") {
    printYes();
  } else {
    printNo();
  }
}
// anonymous function
const printYes = function () {
  console.log("yes!");
};
// named function
const printNo = function print() {
  console.log("no!");
};

randomQuiz("wrong", printYes, printNo);
randomQuiz("love you", printYes, printNo);

// Arrow function
// always anonymous
const simplePrintTest = function () {
  console.log("simplePrintTest");
};
simplePrintTest();

const simplePrint = () => console.log("simplePrint");
simplePrint();

const add = (a, b) => a + b;
console.log(`add(2, 3) : ${add(2, 3)}`);

const simpleMultiply = (a, b) => {
  return a * b;
};
console.log(`simpleMultiply(2, 3) : ${simpleMultiply(2, 3)}`);

function calculate(command, a, b) {
  switch (command) {
    case "add":
      return a + b;
    case "substract":
      return a - b;
    case "divide":
      return a / b;
    case "multiply":
      return a * b;
    case "remainder":
      return a % b;
    default:
      throw Error("unkonwn command"); //return "unkonwn command";
  }
}
console.log(`calculate("add", 2, 3) : ${calculate("add", 2, 3)}`);
console.log(`calculate("substract", 2, 3) : ${calculate("substract", 2, 3)}`);
console.log(`calculate("divide", 2, 3) : ${calculate("divide", 2, 3)}`);
console.log(`calculate("multiply", 2, 3) : ${calculate("multiply", 2, 3)}`);
console.log(`calculate("remainder", 2, 3) : ${calculate("remainder", 2, 3)}`);
console.log(`calculate("unkonwn", 2, 3) : ${calculate("unkonwn", 2, 3)}`);
