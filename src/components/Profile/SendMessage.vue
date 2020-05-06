<template>
  <div class="send-message">
    <Modal :isOpen="sendMessageModalOpen">
      <form @submit.prevent="handleFormSubmit">
        <select v-model="toUser" @change="handleSelectChange($event)">
          <option :value="rec.uid" v-for="(rec,ind) in recipients" :key="ind">{{rec.displayName}}</option>
        </select>
        <textarea v-model="message" />
        <button type="submit">Send Message</button>
      </form>
    </Modal>
  </div>
</template>

<script lang="ts">
import { mapActions, mapState } from "vuex";
import Modal from "@/components/shared/Modal.vue";
import { Component, Vue } from "vue-property-decorator";
import MessageUsers from "../../store/modules/messageUsers";
import Authentication from "../../store/modules/authentication";

import { getModule } from "vuex-module-decorators";
@Component({
  components: {
    Modal
  }
})
export default class SendMessage extends Vue {
  //state
  public selectedRecipent = "";
  public time = "01-01-2021";
  public message = "";
  public toUser = "";
  public MessageUsersModuleInstance: any = null;
  public AuthenticationModuleInstance: any = null;

  //computed

  get fromUser(): string {
    return this.MessageUsersModuleInstance.fromUser;
  }
  get sendMessageModalOpen(): boolean {
    return this.MessageUsersModuleInstance.sendMessageModal;
  }

  public handleFormSubmit() {
    console.log(this.fromUser, "FROM");
    const { time, message, toUser, fromUser } = this;
    const pay = {
      time,
      message,
      toUser,
      fromUser
    };
    console.log(pay, "Pay after sub");
    //this["messageUsers/writeNewMessage"](pay);
    this.MessageUsersModuleInstance.writeNewMessage(pay);
  }

  public handleSelectChange(event: any) {
    console.log(event.target.value);
  }

  get recipients() {
    const messageSender = this.fromUser;
    console.log(messageSender, "messageSender");
    const recips = this.AuthenticationModuleInstance.users.map((it: any) => {
      console.log(it.uid, "it");
      return it.uid != messageSender ? it : "";
    });
    console.log(recips, "recips");
    return recips;
  }

  created() {
    this.MessageUsersModuleInstance = getModule(MessageUsers, this.$store);
    this.AuthenticationModuleInstance = getModule(Authentication, this.$store);
  }
}
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  textarea {
    min-height: 149px;
    overflow-y: scroll;
    max-height: 170px;
    resize: none;
    border-radius: 3px;
    border: 1px solid lightgray;
    margin: 10px 0px;
    padding: 0.5rem;
    outline: none;
    cursor: pointer;
  }
  select {
    height: 2.25rem;
    border-radius: 3px;
    font-size: 0.9rem;
    color: white;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    outline: none;
    cursor: pointer;
  }
  button {
    height: 2.25rem;
    border-radius: 3px;
    font-size: 0.9rem;
    background-color: dodgerblue;
    color: white;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    outline: none;
    cursor: pointer;
  }
}
</style>