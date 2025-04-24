<script setup>
</script>

<template>
  <body>
    <div class="card">
      <img class="logo w-full h-auto object-contain" src="@\assets\logo.png" />
      <h2>Sign In</h2>
      <form class="form">
        <div class="textbox">
          <span class="material-symbols-outlined"> account_circle </span>
          <input type="email" placeholder="Username" />
        </div>
        <div class="textbox">
          <span class="material-symbols-outlined"> lock </span>
          <input type="password" placeholder="Password" />
        </div>
        <button>Sign In</button>
      </form>
      <a href="#">Forgot password?</a>
      <footer>
        Need an account? Sign up
        <a href="#">here</a>
      </footer>
    </div>
  </body>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  display: grid;
  place-items: center;
  gap: 50px;
  margin: 0;
  height: 100vh;
  padding: 0 32px;
  background: #f1f5fb;
  color: #474f5c;
}

@media (width >= 500px) {
  body {
    padding: 0;
  }
}

.card {
  overflow: hidden;
  position: relative;
  z-index: 3;
  width: 60vw;
  margin: 0 20px;
  padding: 54px 30px;
  border-radius: 24px;
  background: rgb(255 255 255 / 100%);
  backdrop-filter: blur(100px);
  text-align: center;
  box-shadow: 0 100px 100px rgb(0 0 0 / 10%);
}

@media (width >= 680px) {
  .card {
    margin: 0;
    width: 60vw;
    max-width: 420px;
  }
}

.card .logo {
  position: absolute;
  top: 0;
  left: 0%;
  padding: 25px 0;
  width: 100%;
  height: 130px;
  margin-top: 15px;
}

.card > h2 {
  font-size: 32px;
  font-weight: 600;
  margin: 85px 0 15px;
}

.form {
  margin: 0 0 32px;
  display: grid;
  gap: 12px;
}

.form :is(input, button) {
  width: 100%;
  height: 56px;
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
}

.textbox {
  position: relative;
}

.textbox > input {
  border: 0;
  padding: 0 16px 0 40px;
  color: inherit;
  background: rgb(0 0 0 / 4%);
}

.textbox > input::placeholder {
  color: #9ca2ae;
}

.textbox > span {
  position: absolute;
  top: 50%;
  left: 10px;
  translate: 0 -50%;
  pointer-events: none;
  color: #9ca2ae;
}

.form > button {
  border: 0;
  color: #f9f9f9;
  background: #226ce7;
  display: grid;
  place-items: center;
  font-weight: 500;
  cursor: pointer;
}

.card > footer {
  color: #9ca2ae;
}

.card > a {
  display: block;
  margin: 0 0 56px;
}

.card a {
  font-weight: 500;
  color: #216ce7;
}
</style>