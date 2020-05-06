import Vue from "vue";
import Vuex from "vuex";

import Articles from './modules/articles';
import ProductsModule from './modules/products';
import Authentication from './modules/authentication';
import MessageUsers from './modules/messageUsers';
import ComponentsControls from './modules/ComponentsControls';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Articles,
    products: ProductsModule,
    Authentication,
    MessageUsers,
    ComponentsControls
  }
});



