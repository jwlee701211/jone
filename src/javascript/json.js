//"use strict" // 선언된 변수만 사용가능하게 정의!!!

// 1.Object to JSON
// stringify(obj)
let objectToJson = JSON.stringify(true);
console.log(`objectToJson : ${objectToJson}`);

objectToJson = JSON.stringify(["사과", "바나나"]);
console.log(`objectToJson : ${objectToJson}`);

const rabbit = {
  name: "tori",
  color: "white",
  size: null,
  birthDate: new Date(),
  jump: () => {
    console.log(`${name} can jump!`);
  },
};
objectToJson = JSON.stringify(rabbit);
console.log(`objectToJson : ${objectToJson}`);

objectToJson = JSON.stringify(rabbit, ["name", "color", "size"]);
console.log(`objectToJson : ${objectToJson}`);

objectToJson = JSON.stringify(rabbit, (key, value) => {
  console.log(`key : ${key}, value : ${value}, `);
  return key === "name" ? "jone" : value;
});
console.log(`objectToJson : ${objectToJson}`);

// 2. JSON to Object
// parse(json)
console.clear();
let json = JSON.stringify(rabbit);
console.log(`json : ${json}`);

let jsonToParse = JSON.parse(json);
console.log(`jsonToParse : ${jsonToParse}`);
console.log(jsonToParse);
console.log(rabbit.birthDate.getDate());

let obj = JSON.parse(json, (key, value) => {
  console.log(`key : ${key}, value : ${value}, `);
  return key === "birthDate" ? new Date(value) : value;
});
console.log(`obj : ${obj}`);
console.log(obj);
console.log(rabbit.birthDate.getDate());
console.log(obj.birthDate);
