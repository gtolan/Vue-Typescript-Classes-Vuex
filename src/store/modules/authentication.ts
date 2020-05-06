//Without Classes
// module1.ts


// export interface Module1State {
//   name: null | string
// }
// export default {
//   namespaced: true as true,
//   state: {
//     name: null
//   } as Module1State,
//   getters: {
//     message: state => `Hello, ${state.name}!`
//   },
//   mutations: {
//     SET_NAME(state, newName: string) {
//       state.name = newName
//     },
//   },
//   actions: {
//     async loadName({ commit }, payload: { id: string }) {
//       const name = `Name-${payload.id}` // load it from somewhere
//       commit("SET_NAME", name)
//       return { name }
//     },
//   }
// }


//Classes

import firebase from 'firebase';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

interface Users {
  uid: string,
  displayName: string,
  email: string,
  online: boolean,
  messages: [{ toUser: string, fromUser: string, message: string, time: string }]
}
interface SignInUserObj {
  email: string,
  password: string,
  uid: string,
  online: boolean,
  displayName: string,
  messages: []
}
interface FBUserObj {
  currentUser: any
}
@Module({ namespaced: true, name: 'Authentication' }) ///namestapced true
class Authentication extends VuexModule {
  //state
  public uid = '';
  public user: object = {};
  public loginNavbar = false;
  public email = '';
  public name = '';
  public token: string = localStorage.getItem('token') || '';
  public users: Users[] = [{
    uid: '',
    displayName: '',
    email: '',
    online: false,
    messages: [{ toUser: '', fromUser: '', message: '', time: '' }]
  }]

  //Mutations
  @Mutation
  public saveUID(uid: string) {
    console.log("[STORE MUTATIONS] - saveUID:", uid);
    this.uid = uid;
  }
  @Mutation
  public setUSER(user: object) {
    console.log("[STORE MUTATIONS] - setUSER:", user);
    this.user = user;
  }
  @Mutation
  public setTOKEN(token: string) {
    console.log("[STORE MUTATIONS] - setTOKEN:", token);
    this.token = token;
  }
  @Mutation
  public savePW(name: string) {
    console.log("[STORE MUTATIONS] - setTOKEN:", name);
    this.name = name;
  }

  @Mutation
  public setName(name: string) {
    console.log("[STORE MUTATIONS] - setTOKEN:", name);
    this.name = name;
  }

  @Mutation
  public setEmail(token: string) {
    console.log("[STORE MUTATIONS] - setTOKEN:", token);
    this.email = token;
  }
  @Mutation
  public writeUsersList(users: []) {
    console.log("[STORE MUTATIONS] - writeUsersList:", users);
    this.users = users;
  }
  @Mutation
  public toggleLoginNavbar() {
    console.log("[STORE MUTATIONS] - toggleLoginNavbar:");
    this.loginNavbar = !this.loginNavbar
  }

  // actions: {
  @Action
  public async signInWithEmailAndPassword(user: SignInUserObj) {
    console.log(firebase, "FBBB")
    await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(firebaseUser => {
        return this.context.dispatch("login", firebaseUser.user);
      })

  }
  @Action
  public async login(user: SignInUserObj) {
    console.log("[STORE ACTIONS] - login", user, "user");
    const userInfo = {
      email: user.email,
      uid: user.uid
    };
    //TODO:Cookies set('access_token');
    this.context.commit("setUSER", userInfo);
    this.context.commit("saveUID", userInfo.uid);
    const auth: FBUserObj | null = firebase.auth();
    const token = await auth.currentUser.getIdToken(true);
    localStorage.setItem('token', token)
    this.context.commit("setTOKEN", token);
    console.log("[STORE ACTIONS] - in login, response:", status);
    return;
  }

  // @Action
  // public async register3(payload: SignInUserObj): Promise<any> {
  //   console.log('reg 3 bitches')
  //   this.context.commit("setName", payload.email);

  // }

  // @Action
  // public async register2(payload: SignInUserObj): Promise<any> {
  //   this.context.commit("setEmail", payload.email);
  //   this.context.commit("savePW", payload.password);
  //   this.context.dispatch("register3", payload)
  // }

  @Action({ rawError: true })
  public async register(payload: SignInUserObj): Promise<any> {
    console.log(firebase, "FBBB")
    try {
      const firebaseUser: any = await firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)

      // TODO ADD catch error ////Cookies set('access_token');
      console.log(firebaseUser, "FUUU")

      this.context.dispatch("login", firebaseUser.user);
      console.log(firebaseUser.user, firebaseUser)

      // console.log(firebaseUser, "USER");
      const addDocRef = firebase.firestore().collection('users');
      const { email, uid } = firebaseUser.user;
      const { displayName, online, messages } = payload;
      const newUser = { email, uid, displayName, online, messages }

      await addDocRef.doc(`${uid}`).set(newUser);
      return "Success!"
    } catch (err) {
      // catches errors both in fetch and response.json
      alert(err);
      return err
    }
    console.log('before end of reg')
    //return
  }


  @Action
  async logout(uid: string) {
    console.log("[STORE ACTIONS] - logout", uid, "uid");
    await firebase.auth().signOut();
    //Cookies.remove('access_token');
    const updDocRef = firebase.firestore().collection(`users/`).doc(`${uid}`)
    updDocRef.update({ online: false });
    localStorage.removeItem('token')
    this.context.commit("setUSER", null);
    this.context.commit("saveUID", null);
  }

  @Action
  async fetchUsers() {
    console.log("[STORE ACTIONS] - fetchUsers:");
    await firebase.firestore().collection('users').onSnapshot(docSnapshot => {
      console.log(`Received doc snapshot: ${docSnapshot.docs}`);
      docSnapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
      });
      const users: any = []
      docSnapshot.forEach(doc => {
        const data = doc.data();
        return users.push({ ...data, id: doc.id });
      });
      console.log('WAA', users)
      this.context.commit("writeUsersList", users);

      return docSnapshot
    }, err => {
      console.log(`Encountered error: ${err}`);
    })
  }
}


export default Authentication;