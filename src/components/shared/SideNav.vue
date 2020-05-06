<template>
  <aside class="sidenav" :class="{'show': isOpen}" id="sideNavigation">
    <div class="link-container">
      <router-link
        class="router-btn"
        :to="item.link"
        v-for="(item, index) in sideNavLocations"
        :key="`${item.link}-${index}`"
      >
        <img class="icon" :src="item.icon" />
        <span>{{item.title}}</span>
      </router-link>
      <button class="toggle-login" @click="toggleLogin">Toggle login</button>
    </div>
  </aside>
</template>

<script lang="ts">
// import { mapState, mapMutations } from "vuex";
import { getModule } from "vuex-module-decorators";
import { Component, Vue } from "vue-property-decorator";
import ComponentControls from "../../store/modules/ComponentsControls";
import Authentication from "../../store/modules/authentication";
interface SideNavButtons {
  title: string;
  link: string;
  icon: string;
}
@Component({})
class SideNav extends Vue {
  //data
  public ComponentControlsModuleInstance: any = null;
  public AuthenticationModuleInstance: any = null;
  public sideNavLocations: SideNavButtons[] = [
    {
      title: "Home",
      link: "/",
      icon: ""
    },
    {
      title: "Dashboard",
      link: "/dashboard",
      icon: ""
    },
    {
      title: "Profile",
      link: "/profile",
      icon: ""
    },
    {
      title: "Blog",
      link: "/blog",
      icon: ""
    },
    {
      title: "Products",
      link: "/products",
      icon: ""
    }
  ];
  // computed: {
  get isOpen() {
    return this.ComponentControlsModuleInstance.sideNavOpen;
  }
  created() {
    this.ComponentControlsModuleInstance = getModule(
      ComponentControls,
      this.$store
    );
    this.AuthenticationModuleInstance = getModule(Authentication, this.$store);
    //this.isOpen = this.ComponentControlsModuleInstance.store.state.ComponentsControls.sideNavOpen;
    console.log(this.isOpen, "isopen");
  }

  // methods: {
  // ...mapMutations(["Authentication/toggleLoginNavbar"]),
  public toggleLogin() {
    //this["Authentication/toggleLoginNavbar"]();
    this.AuthenticationModuleInstance.toggleLoginNavbar();
    console.log("Authentication/toggleLoginNavbar");
  }
}
export default SideNav;
</script>

<style lang="scss" scoped>
@keyframes fillBackground {
  0% {
    background-position: 0% 48%;
    color: black;
  }
  100% {
    background-position: 100% 53%;
    color: white;
  }
}
aside {
  position: fixed;
  top: 3rem;
  box-shadow: 0px 0px 3px 2px #8080808f;
  z-index: 1000;
  height: calc(100vh - 3rem);
  overflow-y: scroll;
  width: 255px;
  background-color: white;
  text-align: left;
  padding-top: 0rem;
  transition: 0.3s ease-in-out;
  transform: translateX(-100%);
  border: none;
  //   border-radius: 8px;
  &.show {
    transform: translateX(0%);
  }
  .link-container {
    overflow-y: scroll;
    height: 100%;
    width: 100%;
  }
  .router-btn {
    height: 3.5rem;
    outline: none;
    background-color: transparent;
    display: block;
    width: 100%;
    display: flex;
    flex-direction: row;
    font-size: 20px;
    justify-content: space-evenly;
    align-items: center;
    cursor: pointer;
    border: none;
    width: 100%;
    color: black;
    text-decoration: none;

    &:hover {
      background: linear-gradient(82deg, white, #143e8c);
      background-size: 200% 200%;
      animation: fillBackground 0.5s ease-in-out;
      animation-iteration-count: 1;

      animation-fill-mode: forwards;
    }
    .icon {
      width: 50px;
      margin: 8px;
      margin-right: 10px;
    }
    span {
      height: 100%;
      width: 100%;
      text-align: left;
      display: flex;
      justify-content: center;
      align-content: center;
      padding-left: 10px;
      flex-direction: column;
      vertical-align: middle;
    }
  }
}
@media only screen and (min-width: 700px) {
  aside {
    top: 4rem;
  }
}
</style>