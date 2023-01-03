"use strict"; // 선언된 변수만 사용가능하게 정의!!!

// Array
// 1. Declaration
const arr1 = new Array();
const arr2 = [1, 2];
console.log(arr1);
console.log(arr2);

// 2. Index position
const fruits = ["사과", "바나나"];
console.log(fruits);
console.log(fruits.length);
console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[2]);
console.log(fruits[fruits.length - 1]);
console.clear();

// 3. Looping over an array
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
for (let fruit of fruits) {
  console.log(fruit);
}

/* 
fruits.forEach(function (fruit, index, array) {
  console.log(fruit, index, array)
}) 
*/
fruits.forEach((fruit, index) => console.log(fruit, index));

// 4. 추가 / 삭제
fruits.push("딸기", "사과");
console.log(fruits);

// 삭제
fruits.pop();
console.log(fruits);

// 앞에서 추가
fruits.unshift("딸기");
console.log(fruits);

// 앞에서 삭제
fruits.shift();
console.log(fruits);

// *** unshift / shift 는 push / pop 보다 많이 느림 !!!

fruits.push("복숭아", "레몬");
console.log(fruits);
fruits.splice(1, 1); // 위치, 삭제하고자하는 갯수
console.log(fruits);
fruits.splice(1, 1, "바나나", "수박"); // 위치, 삭제하고자하는 갯수(0이면 삭제하지 않음), 추가하고자하는 값을 추가
console.log(fruits);

const fruits2 = ["참외", "옥수수"];
const newFruits = fruits.concat(fruits2); // 배열 병합
console.log(newFruits);

// 5. Searching
console.clear();
fruits.push("사과");
console.log(fruits);
console.log(fruits.indexOf("사과"));
console.log(fruits.indexOf("수박"));
console.log(fruits.indexOf("코코넛"));
console.log(fruits.lastIndexOf("사과"));
console.log(fruits.includes("수박"));
console.log(fruits.includes("코코넛"));

const resultString = fruits.join("^"); // 구분자 : 배열을 문자열로 변환
console.log(`resultString : ${resultString}`);

const resultArray = resultString.split("^"); // 구분자 : 문자를 배열로 변환
console.log(`resultArray : ${resultArray}`);

const resultReverse = fruits.reverse(); // 배열을 거꾸로 변환
console.log(`resultReverse : ${resultReverse}`);

const resultSplice = resultArray.splice(0, 2); // 구분자 :시작위치, 갯수
console.log(`resultSplice : ${resultSplice}`);

const resultSlice = resultArray.slice(1, 4); // 구분자 :시작위치, 갯수
console.log(`resultArray : ${resultArray}`);
console.log(`resultSlice : ${resultSlice}`);

class Student {
  constructor(name, age, enrolled, score) {
    this.name = name;
    this.age = age;
    this.enrolled = enrolled;
    this.score = score;
  }
}

const students = [
  new Student("A", 29, true, 45),
  new Student("B", 28, false, 80),
  new Student("C", 30, true, 90),
  new Student("D", 40, false, 60),
  new Student("E", 18, true, 88),
];

const resultFind = students.find(function (student, index) {
  console.log(`student : ${student}, index : ${index}`);
  return student.score === 90;
});
console.log(`resultFind : ${resultFind}`);
console.log(resultFind);

const resultFind1 = students.find((student) => student.score === 90);
console.log(`resultFind1 : ${resultFind1}`);
console.log(resultFind1);

const resultFilter = students.filter((student) => student.enrolled);
console.log(resultFilter);

const resultMap = students.map((student) => student.score); // 점수만을 가진 배열을 생성
console.log(resultMap);

const resultSome = students.some((student) => student.score < 50); // 50점 이하가 존재하는지 체크(한개라도 있으면 true)
console.log(resultSome);

const resultEvery = !students.every((student) => student.score >= 50); // 50점 이상가 존재하는지 체크(전체 true)
console.log(resultEvery);

const resultReduce = students.reduce((prev, curr) => prev + curr.score, 0); // 합계 구하기
console.log(resultReduce);

const resultMapJoin = students.map((student) => student.score).join();
console.log(resultMapJoin);

const resultMapFilterJoin = students
  .map((student) => student.score)
  .filter((score) => score >= 50)
  .join();
console.log(resultMapFilterJoin);

const resultMapSortJoin = students
  .map((student) => student.score)
  .sort((a, b) => a - b)
  .join();
console.log(resultMapSortJoin);
