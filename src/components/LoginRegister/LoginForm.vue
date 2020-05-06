<template>
  <div class="tab">
    <h1>Login</h1>
    <form @submit.prevent="handleLoginForm">
      <label for="email">Email</label>
      <input v-model="email" type="email" autocomplete="email" />
      <label for="password">Password</label>
      <input id="password" v-model="password" type="password" />
      <button type="submit">Login</button>
      <p>{{errorMsg}}</p>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { mapActions } from "vuex";
import Authentication from "../../store/modules/authentication";

import { getModule } from "vuex-module-decorators";

@Component({})
export default class LoginForm extends Vue {
  public email = "";
  public password = "";
  public errorMsg = "";
  public AuthenticationModuleInstance: any = null;

  created() {
    this.AuthenticationModuleInstance = getModule(Authentication, this.$store);
  }

  public handleLoginForm() {
    console.log(this.email, this.password);
    const pay = {
      email: this.email,
      password: this.password
    };
    //this["authentication/signInWithEmailAndPassword"](pay)
    this.AuthenticationModuleInstance.signInWithEmailAndPassword(pay)
      .then(() => {
        console.log("finished handle Login");
        this.errorMsg = "You are logged in!";
        this.$router.push("/dashboard");
      })
      .catch((err: any) => {
        console.log(err, err.message);
        this.errorMsg = err.message;
      });
  }
}
</script>

<style lang="scss" scoped>
.tab {
  background-color: whitesmoke;
}
h1 {
  position: absolute;
  text-align: center;
  width: 100%;
}
form {
  top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 1rem;
  border-radius: 8px;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  transition: 0.3s ease-in-out;
  position: absolute;
  width: calc(100% - 2rem);
  //   &:hover {
  //     // box-shadow: 0px 0px 2px 2px #d3d3d39e;
  //   }
  input,
  label,
  button {
    width: 100%;
    outline: none;
  }
  button {
    width: calc(100% + 0.45rem);
    height: 2.25rem;
    margin-top: 0.5rem;
    height: 2.45rem;
    border-radius: 3px;
    font-size: 0.9rem;
    color: white;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    outline: none;
    cursor: pointer;
    background-color: #143e8c;
    transition: 0.3s ease-in-out;
    &:hover {
      background-color: #1d5d9a;
    }
  }
  label {
    text-align: left;
    margin-top: 10px;
    margin-bottom: 4px;
  }
  input {
    padding-left: 0.5rem;
    height: 2.25rem;
    padding-left: 0.25rem;
    height: 2.25rem;
    border-radius: 3px;
    border: 1px solid lightgrey;
    font-size: 0.8rem;
  }
}
</style>