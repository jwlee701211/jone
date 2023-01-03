"use strict"; // 선언된 변수만 사용가능하게 정의!!!

console.log("Hello World!");

let company = "Jone";
console.log(company);
company = "Jonetech";
console.log(company);

const CON_NAME = "LEE JEONG WON";
console.log(CON_NAME);

console.log(
  `company : ${company}, CON_NAME : ${CON_NAME}, type : ${typeof CON_NAME}`
);

const symbol1 = Symbol("id");
const symbol2 = Symbol("id");
console.log(symbol1 === symbol2);

const symbol11 = Symbol.for("id");
const symbol21 = Symbol.for("id");
console.log(symbol11 === symbol21, `, type : ${typeof symbol21.description}`);
