<template>
  <main class="home">
    <div class="login-container">
      <div class="tab-header">
        <button
          class="toggle-tab"
          :class="{'active': !showRegister}"
          @click="toggleTab"
          :disabled="!showRegister"
        >Login</button>
        <button
          class="toggle-tab"
          :class="{'active': showRegister}"
          @click="toggleTab"
          :disabled="showRegister"
        >Register</button>
      </div>
      <transition name="slide-fade">
        <LoginForm v-if="!showRegister" />
        <Register v-if="showRegister" />
      </transition>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Register from "@/components/LoginRegister/Register.vue";
import LoginForm from "@/components/LoginRegister/LoginForm.vue";
@Component({
  components: {
    Register,
    LoginForm
  }
})
export default class Login extends Vue {
  public showRegister = false;

  public toggleTab() {
    this.showRegister = !this.showRegister;
  }
}
</script>

<style lang="scss" scoped>
.home {
  img {
    width: 60px;
  }
}
</style>
<style lang="scss" scoped>
main {
  margin-top: 3rem;
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.login-container {
  top: 18vh;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 90vw;
  max-width: 400px;
  margin: auto;
  min-height: 400px;
  overflow: hidden;
  background-color: whitesmoke;
  border-radius: 8px;
  border: 2px solid rgb(218, 220, 224);
  .tab-header {
    width: 100%;
    display: flex;
    flex-direction: row;
    button {
      width: 100%;
      border: none;
      height: 2.5rem;
      cursor: pointer;
      font-size: 1rem;
      transition: 0.1s ease;
      &.active {
        border-bottom: 2px solid dodgerblue;
      }
    }
  }
}
</style>