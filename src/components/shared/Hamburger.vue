<template>
  <button
    class="hamburger hamburger--collapse"
    :class="{'is-active': sideNavOpen}"
    type="button"
    aria-label="Menu"
    aria-controls="sideNavigation"
    @click="toggleHamburger"
  >
    <span class="hamburger-box">
      <span class="hamburger-inner"></span>
    </span>
  </button>
</template>

<script lang="ts">
// import { mapMutations, mapState } from "vuex";

import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import ComponentsControls from "../../store/modules/ComponentsControls";

@Component({})
class Hamburger extends Vue {
  //computed: { //map state
  public ComponentsControlsModuleInstance: any | null = null;

  get isOverlayActive() {
    return this.ComponentsControlsModuleInstance.isOverlayActive;
  }
  get isOverlaySoft() {
    return this.ComponentsControlsModuleInstance.isOverlaySoft;
  }
  get sideNavOpen() {
    return this.ComponentsControlsModuleInstance.sideNavOpen;
  }
  get blogMenuOpen() {
    return this.ComponentsControlsModuleInstance.blogMenuOpen;
  }
  get profileMenuOpen() {
    return this.ComponentsControlsModuleInstance.profileMenuOpen;
  }
  //created
  created() {
    this.ComponentsControlsModuleInstance = getModule(
      ComponentsControls,
      this.$store
    );

    console.log(
      this.ComponentsControlsModuleInstance,
      this.ComponentsControlsModuleInstance.store.state.ComponentsControls,
      "cc3"
    );
  }

  //Methods /MAP Mutations
  public handleOverlayOpen() {
    console.log("handle open", this.isOverlayActive);
    if (!this.isOverlayActive) {
      console.log(
        "handle open soft over",
        this.ComponentsControlsModuleInstance
      );
      //this["components/toggleOverlayOpen"]();
      this.ComponentsControlsModuleInstance.toggleOverlayOpen();
    }
    //this["components/addSoftOverlay"]();
    this.ComponentsControlsModuleInstance.addSoftOverlay();
  }

  public handleOverlayClose() {
    if (this.isOverlayActive) {
      console.log(this.blogMenuOpen, this.profileMenuOpen);
      if (this.blogMenuOpen || this.profileMenuOpen) {
        //   this["components/toggleOverlayOpen"]();
        //this["components/addSoftOverlay"]();
        this.ComponentsControlsModuleInstance.addSoftOverlay();
      } else {
        console.log("remove sof");
        //this["components/toggleOverlayOpen"]();
        this.ComponentsControlsModuleInstance.toggleOverlayOpen();
        //this["components/removeSoftOverlay"]();
        this.ComponentsControlsModuleInstance.removeSoftOverlay();
      }
      console.log("handle close over");
    }
  }

  public toggleHamburger() {
    //   this.isActive = !this.isActive;

    console.log("af", this.isOverlayActive);
    this.isOverlayActive ? this.handleOverlayClose() : this.handleOverlayOpen();
    //this["components/toggleSideNavOpen"]();
    this.ComponentsControlsModuleInstance.toggleSideNavOpen();
  }
}

export default Hamburger;
</script>

<style lang="scss" scoped>
div.left-hamburger-container {
  width: 5rem;
  height: 100%;
}
button.hamburger {
  outline: none;
  height: 100%;
  padding: 0rem;
  //   transform: scale(1);
  transform: scale(0.7);
  transform-origin: center;
  padding: 0;
  display: flex;
  width: 3rem;
  flex-direction: row;
  min-width: 3rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 6rem;
  flex-direction: row;

  .hamburger-box {
    vertical-align: middle;
    height: auto;
    height: 60%;
    width: 50%;
    padding-top: 1.4rem;
  }
}

/*!
 * Hamburgers
 * @description Tasty CSS-animated hamburgers
 * @author Jonathan Suh @jonsuh
 * @site https://jonsuh.com/hamburgers
 * @link https://github.com/jonsuh/hamburgers
 */
.hamburger {
  padding: 15px 15px;
  display: inline-block;
  cursor: pointer;
  transition-property: opacity, filter;
  transition-duration: 0.15s;
  transition-timing-function: linear;
  font: inherit;
  color: inherit;
  text-transform: none;
  background-color: transparent;
  border: 0;
  margin: 0;
  overflow: visible;
}
.hamburger:hover {
  opacity: 1;
}
.hamburger.is-active:hover {
  opacity: 0.9;
}
.hamburger.is-active .hamburger-inner,
.hamburger.is-active .hamburger-inner::before,
.hamburger.is-active .hamburger-inner::after {
  background-color: white; //color of hambuger active
}

.hamburger-box {
  width: 40px;
  height: 24px;
  display: inline-block;
  position: relative;
}

.hamburger-inner {
  display: block;
  top: 50%;
  margin-top: -2px;
}
.hamburger-inner,
.hamburger-inner::before,
.hamburger-inner::after {
  width: 40px;
  height: 4px;
  //   background-color: #000;
  background-color: white; //color of hambuger
  border-radius: 4px;
  position: absolute;
  transition-property: transform;
  transition-duration: 0.15s;
  transition-timing-function: ease;
}
.hamburger-inner::before,
.hamburger-inner::after {
  content: "";
  display: block;
}
.hamburger-inner::before {
  top: -10px;
}
.hamburger-inner::after {
  bottom: -10px;
}

/*
   * Collapse
   */
.hamburger--collapse .hamburger-inner {
  top: auto;
  bottom: 0;
  transition-duration: 0.13s;
  transition-delay: 0.13s;
  transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
}
.hamburger--collapse .hamburger-inner::after {
  top: -20px;
  transition: top 0.2s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1),
    opacity 0.1s linear;
}
.hamburger--collapse .hamburger-inner::before {
  transition: top 0.12s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1),
    transform 0.13s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.hamburger--collapse.is-active .hamburger-inner {
  transform: translate3d(0, -10px, 0) rotate(-45deg);
  transition-delay: 0.22s;
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
}
.hamburger--collapse.is-active .hamburger-inner::after {
  top: 0;
  opacity: 0;
  transition: top 0.2s cubic-bezier(0.33333, 0, 0.66667, 0.33333),
    opacity 0.1s 0.22s linear;
}
.hamburger--collapse.is-active .hamburger-inner::before {
  top: 0;
  transform: rotate(-90deg);
  transition: top 0.1s 0.16s cubic-bezier(0.33333, 0, 0.66667, 0.33333),
    transform 0.13s 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);
}
@media only screen and (min-width: 700px) {
  button.hamburger {
    min-width: 5rem;
    transform: scale(1);
  }
}
</style>