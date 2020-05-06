<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="handleFormSubmit">
      <label for="email">Email</label>
      <input id="email" placeholder="email" v-model="email" type="text" />
      <label for="displayName">Name</label>
      <input id="displayName" placeholder="Name" v-model="displayName" type="text" />
      <label for="password">Password</label>
      <input id="password" placeholder="Password" v-model="password" type="password" />

      <button type="submit">Submit</button>
      <p class="error">{{errorMsg}}</p>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { namespace } from "vuex-class";
import { getModule } from "vuex-module-decorators";
// const authentication = namespace("Authentication");
import Authentication from "../../store/modules/authentication";

interface SignInUserObj {
  email: string;
  password: string;
  uid: string;
  online: boolean;
  displayName: string;
  messages: [];
}

@Component({})
export default class Register extends Vue {
  email = "";
  displayName = "";
  password: any = "";
  AuthenticationModuleInstance: any = null;
  errorMsg = "";
  // @authentication.State
  // public uid!: string;
  mounted() {
    console.log("mounted!!");
  }

  public created() {
    this.AuthenticationModuleInstance = getModule(Authentication, this.$store);
    // Do stuff with module
    console.log("auth", this.AuthenticationModuleInstance);
  }

  // @authentication.Action
  //public register!: (payload: SignInUserObj) => any;

  public handleFormSubmit() {
    const payload: SignInUserObj = {
      email: this.email,
      password: this.password,
      displayName: this.displayName,
      online: true,
      messages: [],
      uid: ""
    };
    //const AuthenticationModuleInstance = getModule(Authentication, this.$store);
    this.AuthenticationModuleInstance.register(payload).then((res: any) => {
      console.log(res, "RES");
      if (res != "Success!") {
        this.errorMsg = res.message;
      } else {
        console.log("Write succeeded!");
        this.$router.push("/dashboard");
      }
    });
  }
}
</script>

<style lang="scss" scoped>
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
  //     box-shadow: 0px 0px 2px 2px #d3d3d39e;
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
  p.error {
    padding: 0;
    margin: 0;
    font-size: 13px;
    margin-top: 6px;
    color: red;
  }
}
</style>