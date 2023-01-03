//"use strict"
// 선언된 변수만 사용가능하게 정의!!!

// Promise is a Javascript object for asynchronous operation.
// Status : pending -> fulfilled or rejected

let resultFlag = true;

// 1. Producer
const promise = new Promise((resolve, reject) => {
  console.log("doing something....");
  if (resultFlag) {
    setTimeout(() => {
      resolve("jone");
    }, 1000);
  } else {
    reject(new Error("no network"));
  }
});

// 2. Consumers : then, catch, finally
promise
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("finally");
  });

// 3. Promise chaining
const fetchNumber = new Promise((resolve, reject) => {
  if (resultFlag) {
    setTimeout(() => resolve(1), 1000);
  } else {
    reject("false");
  }
});

fetchNumber //
  .then((num) => num * 2)
  .then((num) => num * 3)
  .then((num) => {
    return new Promise((resolve, reject) => {
      if (resultFlag) {
        setTimeout(() => resolve(num - 1), 1000);
      } else {
        reject(new Error("Error"));
      }
    });
  })
  .then((num) => console.log(num));

// 4. Error Handling
const getHen = () =>
  new Promise((resolve, reject) => {
    if (resultFlag) {
      setTimeout(() => resolve("닭"), 1000);
    } else {
      reject(new Error("Error"));
    }
  });

const getEgg = (hen) =>
  new Promise((resolve, reject) => {
    if (resultFlag) {
      setTimeout(() => resolve(`${hen} => 계란`), 1000);
    } else {
      reject(new Error("Error"));
    }
  });

const cook = (egg) =>
  new Promise((resolve, reject) => {
    if (resultFlag) {
      setTimeout(() => resolve(`${egg} => 후라이`), 1000);
    } else {
      reject(new Error("Error"));
    }
  });

getHen()
  .then((hen) => getEgg(hen))
  .then((egg) => cook(egg))
  .then((meal) => console.log(meal));

/*   
getHen()
  .then(getEgg)
  .then(cook)
  .then(console.log);
 */
getHen().then(getEgg).then(cook).then(console.log);

getHen()
  .then(getEgg)
  .catch((error) => {
    return `계란-${error}`;
  })
  .then(cook)
  .catch((error) => {
    return `후라이-${error}`;
  })
  .then(console.log);
