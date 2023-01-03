<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/variable">Variable</router-link> |
    <router-link to="/operator">Operator</router-link> |
    <router-link to="/function">Function</router-link> |
    <router-link to="/class">Class</router-link> |
    <router-link to="/object">Object</router-link> |
    <router-link to="/array">Array</router-link> |
    <router-link to="/json">Json</router-link> |
    <router-link to="/callback">Callback</router-link> |
    <router-link to="/promise">Promise</router-link> |
    <router-link to="/callbackToPromise">CallbackToPromise</router-link> |
    <router-link to="/async">Async</router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
