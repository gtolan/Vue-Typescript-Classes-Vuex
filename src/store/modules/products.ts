
import firebase from 'firebase';
import { VuexModule, Module, Action, Mutation } from "vuex-module-decorators";


@Module({ namespaced: true, name: "products" })
class Products extends VuexModule {

  //state
  public allProducts: any = null;
  public selectedProduct: any = null;
  public writtenProduct: any = null;

  //mutations: {
  @Mutation
  writeProducts(payload: any) {
    console.log("[STORE MUTATIONS] - writeProducts", payload, "payload");
    this.allProducts = payload;
  }
  @Mutation
  selectedArticle(prod: any) {
    console.log("[STORE MUTATIONS] - selectedArticle", prod, "payload");
    this.selectedProduct = prod;
  }
  @Mutation
  writeToProduct(payload: any) {
    console.log("[STORE MUTATIONS] - writeToProduct", payload, "payload");
    this.writtenProduct = payload
  }

  //getters:{
  get hasProducts() {
    console.log('gett')
    return this.allProducts != null ? true : false
  }
  //},
  //actions: {
  @Action
  public async fetchProducts() {
    console.log("[STORE ACTIONS] - fetchProducts:");
    //await firebase.firestore().collection('products').onSnapshot(docSnapshot => {

    //const docSnapshot: any = await firebase.firestore().collection('products').get()

    //chnage to Observable to update the list when new product added
    const docSnapshot: any = await firebase.firestore().collection('products').onSnapshot((snapshot) => {
      //...
      console.log(`Received doc snapshot: ${snapshot.docs}`);
      const products: string[] = []
      snapshot.forEach((doc: any) => {
        const data = doc.data();
        const obj: any = { ...data, id: doc.id }
        products.push(obj);
      });
      console.log('WAP', products)
      return this.context.commit("writeProducts", products);
    }, (error) => {
      //...
      return null;
    });



    //TODO   }, err => {
    //console.log(`Encountered error: ${err}`);
    //})

  }

  @Action
  async writeNewProduct(payload: any) {
    console.log("[STORE ACTIONS] - writeNewProduct", payload)
    const addDocRef = firebase.firestore().collection('products')
    await addDocRef.add(
      payload
    ).then(ref => {
      console.log('Added document with ID: ', ref.id);
      console.log(ref)
    });
    this.context.commit('writeToProduct', payload)
  }

}

export default Products