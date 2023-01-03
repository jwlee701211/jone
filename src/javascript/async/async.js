// 1. async
let resultFlag = true;

function fatchUser() {
  return new Promise((resolve, reject) => {
    // do network request in 10 secs...
    if (resultFlag) {
      resolve("jone");
    } else {
      reject(new Error("no network"));
    }
  });
}
const user = fatchUser();
console.log(user);

async function fatchUser1() {
  return "jonetech";
}
const user1 = fatchUser1();
user1.then(console.log);

// 2. await
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getApple() {
  await delay(1000);
  return "사과";
}

async function getBanana() {
  await delay(1000);
  return "바나나";
}
/* 
function pickFruits(){
  return getApple.then(apple => {
    return getBanana().then(banana => `${apple} + ${banana}`)
  })
}
pickFruits().then(console.log)
 */
async function pickFruits1() {
  const apple = await getApple();
  const banana = await getBanana();
  return `${apple} + ${banana}`;
}
pickFruits1().then(console.log);

async function pickFruits2() {
  const applePromise = getApple();
  const bananaPromise = getBanana();
  const apple = await applePromise;
  const banana = await bananaPromise;
  return `${apple} + ${banana}`;
}
pickFruits2().then(console.log);

// 3. useful Promise APIs
function pickFruits3() {
  // all : 배열안에 모든 함수를 수행
  return Promise.all([getApple(), getBanana()]).then((fruits) =>
    fruits.join(" + ")
  );
}
pickFruits3().then(console.log);

function pickFruits4() {
  // race : 가장 먼저 수행된 값을 처리
  return Promise.race([getApple(), getBanana()]);
}
pickFruits4().then(console.log);

class UserStorage {
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async loginUser(id, password) {
    this.delay(2000);
    if (
      (id === "jone" && password === "1234") ||
      (id === "john" && password === "0000")
    ) {
      return id;
    } else {
      return new Error("not found");
    }
  }

  async getRoles(user) {
    this.delay(2000);
    if (user === "jone") {
      return { name: "jone", role: "admin" };
    } else {
      return new Error("no access");
    }
  }

  async getUserData(id, pw) {
    const name = await this.loginUser(id, pw);
    const user = await this.getRoles(name);
    return `Hello ${user.name}, you have a ${user.role} role.`;
  }
}

const userStorage = new UserStorage();
const id = prompt("enter your id");
const password = prompt("enter your password");

userStorage
  .getUserData(id, password)
  .then((result) => alert(result))
  .catch(console.log);
