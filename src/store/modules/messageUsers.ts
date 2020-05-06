
import firebase from 'firebase';

import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
@Module({ namespaced: true, name: 'MessageUsers' })
class MessageUsers extends VuexModule {
  public message = '';
  public fromUser = '';
  public toUser = '';
  public time = '';
  public sentMessages: string[] = []


  //TODO - fix mutation payload types depending on req.
  //mutations: {
  @Mutation
  public writeMessage(payload: any) {
    console.log("[STORE MUTATIONS] - writeMessage", payload, "payload");
    this.message = payload;
  }
  @Mutation
  public writeFromUser(payload: any) {
    console.log("[STORE MUTATIONS] - writeFromUser", payload, "payload");
    this.fromUser = payload;
  }

  @Mutation
  public writeToUser(payload: any) {
    console.log("[STORE MUTATIONS] - writeToUser", payload, "payload");
    this.toUser = payload;
  }
  @Mutation
  public writeTime(payload: any) {
    console.log("[STORE MUTATIONS] - writeTime", payload, "payload");
    this.time = payload;
  }
  @Mutation
  public writeSentMessages(payload: any | string[]) {
    console.log("[STORE MUTATIONS] - writeTime", payload, "payload");
    this.sentMessages.push(payload)
  }


  // actions: {

  @Action
  async writeNewMessage(payload: any) {
    console.log("[STORE ACTIONS] - writeNewProduct", payload)
    const { toUser, fromUser } = payload;
    console.log(fromUser)
    const addDocRef = firebase.firestore().collection(`users/`).doc(`${toUser}`) //.doc(`${fromUser}`)
    // Atomically add a new region to the "regions" array field.
    const updateArr = firebase.firestore.FieldValue.arrayUnion(payload)
    addDocRef.update({
      messages: updateArr

    }).then(ref => {
      console.log('Added document with ID: ', ref);
      console.log(ref)
    });

    const addDocRef2 = firebase.firestore().collection(`users/`).doc(`${fromUser}`) //.doc(`${fromUser}`)
    // Atomically add a new region to the "regions" array field.
    const updateArr2 = firebase.firestore.FieldValue.arrayUnion(payload)
    addDocRef2.update({
      messages: updateArr2

    }).then(ref => {
      console.log('Added document with ID: ', ref);
      console.log(ref)
    });


    this.context.commit('writeSentMessages', payload)
  }

}

export default MessageUsers;