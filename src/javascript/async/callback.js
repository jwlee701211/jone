//"use strict" // 선언된 변수만 사용가능하게 정의!!!

// javascript is synchronous
console.log("1");
setTimeout(function () {
  console.log("2");
}, 1000);
setTimeout(() => console.log("4"), 1000);
console.log("3");

// Synchronous callback => 컴파일하면서 함수는 상위에 위치
function printImmediately(print) {
  print();
}
printImmediately(() => console.log("hello"));

// Asynchronous callback => 컴파일하면서 함수는 상위에 위치
function printWithDelay(print, timeout) {
  setTimeout(print, timeout);
}
printWithDelay(() => console.log("async callback"), 2000);

// Callback Hell example
class UserStorage {
  loginUser(id, password, onSuccess, onError) {
    setTimeout(() => {
      if (
        (id === "jone" && password === "1234") ||
        (id === "john" && password === "0000")
      ) {
        onSuccess(id);
      } else {
        onError(new Error("not found"));
      }
    }, 2000);
  }

  getRoles(user, onSuccess, onError) {
    setTimeout(() => {
      if (user === "jone") {
        onSuccess({ name: "jone", role: "admin" });
      } else {
        onError(new Error("no access"));
      }
    }, 1000);
  }
}

const userStorage = new UserStorage();
const id = prompt("enter your id");
const password = prompt("enter your password");
userStorage.loginUser(
  id,
  password,
  (user) => {
    userStorage.getRoles(
      user,
      (userWithRole) => {
        alert(
          `Hello ${userWithRole.name}, you have a ${userWithRole.role} role.`
        );
      },
      (error) => {
        console.log(error);
      }
    );
  },
  (error) => {
    console.log(error);
  }
);
