//"use strict" // 선언된 변수만 사용가능하게 정의!!!

const lastName = "JeongWon";
const age = 51;
print(lastName, age);
function print(lastName, age) {
  console.log(`name : ${lastName}, age : ${age}`);
}

function personPrint(person) {
  console.log(`name : ${person.name}, age : ${person.age}`);
}
const jeongwon = { name: "JeongWon", age: 51 };
personPrint(jeongwon);

const obj1 = {};
const obj2 = new Object();
console.log(`obj1 : ${obj1}`);
console.log(`obj2 : ${obj2}`);

jeongwon.hasJob = true;
console.log(`hasJob : ${jeongwon.hasJob}`);

console.log(`jeongwon.name : ${jeongwon.name}`);
console.log(`jeongwon["name"] : ${jeongwon["name"]}`);

function printValue(obj, key) {
  console.log(`obj[${key}] : ${obj[key]}`);
}
printValue(jeongwon, "name");
printValue(jeongwon, "age");

// 3. Property value shorthand
const person1 = { name: "bob", age: 2 };
const person2 = { name: "steve", age: 3 };
const person3 = { name: "dave", age: 4 };
const person4 = makePerson("tom", 30);
function makePerson(name, age) {
  return {
    name,
    age,
  };
}
console.log(`person1 : ${person1}`);
console.log(`person2 : ${person2}`);
console.log(`person3 : ${person3}`);
console.log(`person4 : ${person4}`);

const person5 = new Person("jack", 40);
// 4. Constructor Function
function Person(name, age) {
  // this = {}
  this.name = name;
  this.age = age;
  // return this
}
console.log(`person5 : ${person5}`);

// 5. in operator: property existence check(key in obj)
console.log("name" in person5);
console.log("age" in person5);
console.log("random" in person5);
console.clear();

// 6. for..in vs for..of
// for (key in obj)
let key = "";
for (key in jeongwon) {
  console.log(key);
}

// for (value of iterable)
const array = [1, 2, 3, 4, 5];
let value = 0;
for (value of array) {
  console.log(value);
}

// 7. Fun cloning
const user1 = { name: "bob", age: 2 };
const user2 = user1;
console.log("user1 : ", user1);
console.log("user2 : ", user2); // pointer(참조주소)만 복사됨

// old way
const user3 = {};
for (key in user1) {
  user3[key] = user1[key];
}
console.log("user3 : ", user3);
// new way
const user4 = {};
Object.assign({}, user4, user1);
const user5 = Object.assign({}, user4, user1);
console.log("user4 : ", user4);
console.log("user5 : ", user5);

const fruit1 = { color: "red" };
const fruit2 = { color: "blue", size: "big" };
const mixed = Object.assign({}, fruit1, fruit2); // 덥어 쒸움
console.log(mixed.color);
console.log(mixed.size);
