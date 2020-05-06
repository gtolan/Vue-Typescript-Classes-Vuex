
import firebase from 'firebase';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'



// export default {
//   namespaced: true,
//   state: {
//     name: ''
//   },
//   mutations: {
//     setName(state, newName) {
//       state.name = newName
//     }
//   },
//   actions: {
//     updateName(context, newName) {
//       context.commit('setName', newName)
//     }
//   }
// }


// import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
// @Module({ namespaced: true, name: 'test' })
// class User extends VuexModule {
//   public name: string = ''
//   @Mutation
//   public setName(newName: string): void {
//     this.name = newName
//   }
//   @Action
//   public updateName(newName: string): void {
//     this.context.commit('setName', newName)
//   }
// }
// export default User

//

@Module({ namespaced: true, name: 'Articles' })   //namespaced: true,
class Articles extends VuexModule {
  //state
  public articles: [] = [];
  public topArticles: [] = [];
  public selectedArticle: [] = [];
  public writtenArticle: [] = [];
  //   @Mutation
  //   public setName(newName: string): void {
  //     this.name = newName
  //   }
  @Mutation
  public saveArticles(payload: any) {
    console.log("[STORE MUTATIONS] - saveArticles", payload, "payload");
    this.articles = payload;
  }
  @Mutation
  public writeArticles(payload: any) {
    console.log("[STORE MUTATIONS] - writeArticles", payload, "payload");
    this.topArticles = payload;
  }
  @Mutation
  public wrtieSelectedArticle(art: any) {  //TODO update any mutation named selectedArt
    console.log("[STORE MUTATIONS] - selectedArticle", art, "payload");
    this.selectedArticle = art;
  }
  @Mutation
  public writeToArticle(payload: any) {
    console.log("[STORE MUTATIONS] - writeToArticle", payload, "payload");
    this.writtenArticle = payload
  }

  get hasArticles() {
    console.log("HA", this.articles.length)
    return this.articles.length > 0 ? true : false
  }
  //   @Action
  //   public updateName(newName: string): void {
  //     this.context.commit('setName', newName)
  //   }
  // fROM:=> actions: {
  @Action
  public async fetchArticles() {
    console.log("[STORE ACTIONS] - fetchArticles:");
    await firebase.firestore().collection('articles').onSnapshot(docSnapshot => {
      console.log(`Received doc snapshot: ${docSnapshot.docs}`);
      docSnapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
      });
      const articlesData: Array<any> = [];
      docSnapshot.forEach(doc => {
        const data = doc.data();
        return articlesData.push({ ...data, id: doc.id });
      });
      console.log('WAR', articlesData)
      this.context.commit("writeArticles", articlesData);
      this.context.commit("saveArticles", articlesData);
      //  return docSnapshot
      // ...
      return docSnapshot
    }, err => {
      console.log(`Encountered error: ${err}`);
    })
  }
  @Action
  public async writeNewArticle(payload: any) {
    console.log("[STORE ACTIONS] - writeNewArticle", payload)
    const addDocRef = firebase.firestore().collection('articles')
    await addDocRef.add(
      payload
    ).then(ref => {
      console.log('Added document with ID: ', ref.id);
      console.log(ref)
    });
    this.context.commit('writeToArticle', payload)
  }
}

export default Articles;