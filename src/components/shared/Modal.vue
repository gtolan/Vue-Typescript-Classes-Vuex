<template>
  <div class="overlay" :class="{'active' : sendMessageModalOpen}">
    <div class="modal">
      <button class="close-modal" @click="handleCloseModal">
        <img :src="closeImg" class="close" />
      </button>
      <slot>
        <h1>Modal</h1>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
//import { mapMutations } from "vuex";
import ComponentsControls from "../../store/modules/ComponentsControls";
import MessageUsers from "../../store/modules/messageUsers";
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

@Component({})
export default class Modal extends Vue {
  public closeImg = require("../../assets/close.svg");
  public ComponentsControlsModuleInstance: any = null;
  public MessageUsersModuleInstance: any = null;

  //computed
  get sendMessageModalOpen(): boolean {
    return this.ComponentsControlsModuleInstance.sendMessageModal;
  }

  //methods
  public handleCloseModal() {
    //this["components/toggleSendMessage"]();
    this.ComponentsControlsModuleInstance.toggleSendMessage();
  }

  //lifecycyle
  created() {
    this.ComponentsControlsModuleInstance = getModule(
      ComponentsControls,
      this.$store
    );
    this.MessageUsersModuleInstance = getModule(MessageUsers, this.$store);
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 5;
  background-color: black;
  display: flex;
  justify-items: center;
  align-items: center;
  top: 0;
  transition: 0.3s ease-in;
  transform-origin: right;
  transform: translateX(100%);
  opacity: 0;
  z-index: 0;
  &.active {
    transform: translateX(0%);
    opacity: 1;
    z-index: 5;
    background-color: #0000009c;
    .modal {
      transform: translateX(0%);
      opacity: 1;
      margin: auto;
      min-height: 200px;
      display: block;
    }
  }
  .modal {
    width: 90%;
    opacity: 0;
    max-width: 600px;
    background-color: white;
    border-radius: 8px;
    transition: 0.3s ease-in;
    transform-origin: left;
    transform: translateX(-100%);
    z-index: 5;
    display: none;
    button.close-modal {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      margin-left: auto;
      background: transparent;
      border: none;
      cursor: pointer;
      outline: none;
      img {
        background-color: lightgrey;
        border-radius: 50%;
        position: absolute;
        margin-left: 6px;
      }
    }
  }
}
</style>