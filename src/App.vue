<template>
  <div id="app">
    <div
      class="overlay"
      @click="handleOverlayClick"
      :class="{'active':isOverlayActive, 'soft':isOverlaySoft}"
    ></div>
    <Navbar />
    <SideNav />

    <router-view />
  </div>
</template>
<script lang="ts">
// import Vue from "vue";
// import VuePageTransition from "vue-page-transition";
// Vue.use(VuePageTransition);
import { Component, Vue } from "vue-property-decorator";
import ComponentControls from "./store/modules/ComponentsControls";
import Navbar from "@/components/shared/Navbar.vue";
import SideNav from "@/components/shared/SideNav.vue";
import { getModule } from "vuex-module-decorators";
// const DEFAULT_TRANSITION = "fade";
//import { mapState, mapMutations } from "vuex";
@Component({
  components: {
    Navbar,
    SideNav
  }
})
class App extends Vue {
  public ComponentControlModuleInstance: any = null;

  //computed: {
  get isOverlayActive() {
    return this.ComponentControlModuleInstance.isOverlayActive;
  }

  get isOverlaySoft() {
    return this.ComponentControlModuleInstance.isOverlaySoft;
  }

  //methods: {
  public handleOverlayClick() {
    console.log("components/overlayClicked");
    //this["components/overlayClicked"]();
    this.ComponentControlModuleInstance.overlayClicked();
  }

  created() {
    this.ComponentControlModuleInstance = getModule(
      ComponentControls,
      this.$store
    );
    //console.log(this.ComponentControlModuleInstance, "CI", this, "THIS");
  }
}

export default App;
</script>

<style >
body {
  margin: 0;
}
</style>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.overlay {
  position: fixed;
  z-index: 10;
  top: 3rem;
  width: 100vw;
  height: calc(100vh - 3rem);
  visibility: hidden;
  transform: scale(0);
  transform-origin: bottom left;
  opacity: 0;
  transition: 0.3s ease-in-out;
  background-color: #2d2b2ba1;
  &.active {
    opacity: 1;
    transform: scale(1);
    visibility: visible;
    &.soft {
      background-color: #2d2b2b61;
    }
  }
}
</style>
