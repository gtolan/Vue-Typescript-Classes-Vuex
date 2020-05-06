<template>
  <nav id="nav">
    <Hamburger />
    <router-link to="/" title="home">
      <div class="logo">
        <img :src="logoSrc" alt="advice logo" />
      </div>
    </router-link>

    <router-link v-if="loginNavbar" to="/dashboard" title="dashboard">
      <span class="sm-screen">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"
          />
        </svg>
      </span>
      <span class="md-screen">Dashboard</span>
    </router-link>

    <router-link v-if="!loginNavbar" to="/login" title="login">
      <span class="sm-screen">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"
          />
        </svg>
      </span>
      <span class="md-screen">Login</span>
    </router-link>

    <button class="dropdown" @click="toggleDropdown" title="News Feed">
      <div class="header">
        <span class="sm-screen">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm1 14H8c-.55 0-1-.45-1-1s.45-1 1-1h5c.55 0 1 .45 1 1s-.45 1-1 1zm3-4H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1zm0-4H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1z"
            />
          </svg>
        </span>
        <span class="md-screen">News</span>
        <button class="collapse" :class="{'active':this.blogMenuOpen}">
          <span class="md-screen">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
              <path
                d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"
              />
            </svg>
          </span>
        </button>
      </div>
      <div class="menu" :class="{'active':blogMenuOpen}">
        <router-link title="News Feed" class="menu-item" to="/blog">News Feed</router-link>
        <router-link title="Share an Article" class="menu-item" to="/add-blog-article">Share Advice</router-link>
      </div>
    </button>

    <router-link to="/products" title="Sell your Advice">
      <span class="sm-screen">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M12 17.27l5.17 3.12c.38.23.85-.11.75-.54l-1.37-5.88 4.56-3.95c.33-.29.16-.84-.29-.88l-6.01-.51-2.35-5.54c-.17-.41-.75-.41-.92 0L9.19 8.63l-6.01.51c-.44.04-.62.59-.28.88l4.56 3.95-1.37 5.88c-.1.43.37.77.75.54L12 17.27z"
          />
        </svg>
      </span>
      <span class="md-screen">Experts</span>
    </router-link>
    <LoggedInAvatar />
    <!-- <p>Logged In:{{isLoggedIn}}</p> -->
  </nav>
</template>

<script lang="ts">
import Hamburger from "@/components/shared/Hamburger.vue";
import LoggedInAvatar from "@/components/shared/LoggedInAvatar.vue";
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import Authentication from "../../store/modules/authentication";
import ComponentsControls from "../../store/modules/ComponentsControls";
// import { mapState, mapMutations } from "vuex";
@Component({
  components: {
    Hamburger,
    LoggedInAvatar
  }
})
class Navbar extends Vue {
  public logoSrc: string = require("../../assets/advicelogo.png");
  public AuthenticationModuleInstance: any = null;
  public ComponentsControlsModuleInstance: any = null;
  //computed: {

  get token() {
    return this.AuthenticationModuleInstance.token;
  }
  get blogMenuOpen() {
    return this.ComponentsControlsModuleInstance.blogMenuOpen;
  }
  get isOverlayActive() {
    return this.ComponentsControlsModuleInstance.isOverlayActive;
  }
  get isOverlaySoft() {
    return this.ComponentsControlsModuleInstance.isOverlaySoft;
  }
  get sideNavOpen() {
    return this.ComponentsControlsModuleInstance.sideNavOpen;
  }
  get profileMenuOpen() {
    return this.ComponentsControlsModuleInstance.profileMenuOpen;
  }
  get loginNavbar() {
    return this.AuthenticationModuleInstance.loginNavbar;
  }

  created() {
    this.AuthenticationModuleInstance = getModule(Authentication, this.$store);
    this.ComponentsControlsModuleInstance = getModule(
      ComponentsControls,
      this.$store
    );
    //console.log(
    //   this.ComponentsControlsModuleInstance,
    //   this.ComponentsControlsModuleInstance.store.state.ComponentsControls
    //     .blogMenuOpen,
    //   "cc"
    // );
  }

  //methods: {
  public handleOverlayOpen() {
    console.log("handle open", this.isOverlayActive);
    if (!this.isOverlayActive) {
      console.log("handle open soft over");
      // this["components/toggleOverlayOpen"]();
      this.ComponentsControlsModuleInstance.toggleOverlayOpen();
    }
    //this["components/addSoftOverlay"]();
    this.ComponentsControlsModuleInstance.addSoftOverlay();
  }

  public handleOverlayClose() {
    if (this.isOverlayActive) {
      console.log("HOC BTD", this.sideNavOpen, this.profileMenuOpen);
      if (this.sideNavOpen || this.profileMenuOpen) {
        //this["components/addSoftOverlay"]();
        this.ComponentsControlsModuleInstance.addSoftOverlay();
      } else {
        console.log("add sof");
        //this["components/toggleOverlayOpen"]();
        this.ComponentsControlsModuleInstance.toggleOverlayOpen();
        //   this["components/toggleOverlayOpen"]();
        //this["components/removeSoftOverlay"]();
        this.ComponentsControlsModuleInstance.removeSoftOverlay();
      }
      console.log("handle close over");
    }
  }

  public toggleDropdown() {
    console.log("toggle", this.blogMenuOpen, "OA", this.isOverlayActive);
    //   this.blogMenuOpen = !this.blogMenuOpen;

    this.isOverlayActive ? this.handleOverlayClose() : this.handleOverlayOpen();
    //this["components/toggleBlogMenuOpen"]();
    this.ComponentsControlsModuleInstance.toggleBlogMenuOpen();
  }
}
export default Navbar;
</script>

<style lang="scss" scoped>
nav#nav {
  padding: 0;
  background-color: #143f8c;
  color: white;
  z-index: 10;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 3rem;
  position: fixed;
  width: 100vw;
  top: 0;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  a,
  button.dropdown, //:not(.hamburger)
  p {
    font-weight: bold;
    color: white;
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
    flex-direction: column;
    text-decoration: none;
    transition: 0.3s ease-in-out;
    padding: 0;
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    &:hover {
      background-color: #235cc5;
    }
    &.router-link-exact-active {
      color: white;
      background-color: #0c2656;
      &:hover {
        background-color: #103477;
      }
    }
  }
  a {
    span.sm-screen {
      display: flex;
      justify-content: center;
      align-content: center;
      flex-direction: column;
      height: 100%;
      align-items: center;
      svg {
        fill: white;
      }
    }
  }
  button div {
    span.sm-screen {
      display: flex;
      justify-content: center;
      align-content: center;
      flex-direction: column;
      height: 100%;
      align-items: center;
      svg {
        margin-top: 3px;
        fill: white;
      }
    }
  }
}

// Extract to Dropdown Component
button.dropdown {
  .header {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    min-width: calc((100vw - 5rem) / 5);

    position: relative;
    font-size: 0.97rem;
    margin-top: -2px;

    button.collapse {
      position: absolute;
      right: 11px;
      top: 14px;
      height: 39px;
      padding: 0;
      width: 41px;
      justify-content: center;
      align-content: center;
      display: flex;
      border-radius: 50%;
      outline: none;
      cursor: pointer;
      position: absolute;
      width: 40px;
      right: 0;
      height: 100%;
      top: 0;
      background-color: transparent;
      height: 33px;
      width: 33px;
      border: none;
      margin-top: 8px;
      margin-right: 10px;

      svg {
        transform: rotate(90deg);
        transition: 0.3s ease-in-out;
        height: 35px;
        width: 35px;
        margin-top: 8px;
        margin-right: 0px;
        fill: white;
      }
      &.active {
        svg {
          transform: rotate(270deg);
        }
      }
    }
  }
}
@keyframes scaleOpenMenu {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
.menu {
  visibility: hidden;
  position: absolute;
  top: 3rem;
  background: #143e8c;
  width: auto;
  min-width: calc((100vw - 1rem) / 5);
  min-width: 123px;
  // min-width: calc((100vw - 1rem) / 5);
  max-width: calc((100vw - 1rem) / 3);
  width: 100%;
  text-align: left;
  padding: 1rem;
  //   animation: scaleOpenMenu 0.5s ease-in-out;
  //   animation-fill-mode: forwards;
  //   animation-direction: reverse;
  transform: scale(0);
  will-change: transform;
  transition: 1s;
  background-color: white;
  color: black;

  border: 1px solid lightgray;
  box-shadow: 0px 0px 3px 2px #8080808f;
  border-radius: 3px;
  border-top-left-radius: 0;
  margin-top: 2px;
  padding: 0;
  overflow: hidden;
  padding-bottom: 10px;
  transform-origin: left top;

  &.active {
    display: block;

    // animation: scaleOpenMenu 0.5s ease-in-out;
    // animation-fill-mode: forwards;
    visibility: visible;
    transform: scale(1);
  }
  a.menu-item {
    color: black !important;
    height: 2rem !important;
    background-color: white !important;
    padding-left: 10px !important;
    font-size: 1rem;
    border-bottom: 1px solid #80808033 !important;

    background: transparent;
    border: none;
    border-bottom: 1px solid lightgray;
    font-size: 1rem;
    text-align: center;
    cursor: pointer;
    transition: 0.3s ease-in-out;

    font-weight: 400 !important;
    padding-left: 0 !important;
    &:hover {
      background: whitesmoke !important;
    }
  }
}
.logo {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  img {
    width: 73px;
    margin-top: 0px;
    margin: auto;
  }
}

.sm-screen {
  display: block;
}

.md-screen {
  display: none;
}

@media only screen and (min-width: 700px) {
  .sm-screen {
    display: none !important;
  }

  .md-screen {
    display: block;
  }
  nav#nav {
    height: 4rem;
  }
  .logo {
    img {
      width: 97px;
    }
  }
  button.dropdown {
    .header {
      min-width: calc((100vw - 0rem) / 5);
    }
  }
  .menu {
    top: 4rem;
  }
}
</style>