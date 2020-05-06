<template>
  <main>
    <h1 class="title">Expert Advice</h1>
    <h4 class="subtitle">Get instant answers from top rated experts in their field</h4>
    <div class="links">
      <router-link class="router-btn" to="/products/add-product">
        Add my Expertise
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M5 13.18v2.81c0 .73.4 1.41 1.04 1.76l5 2.73c.6.33 1.32.33 1.92 0l5-2.73c.64-.35 1.04-1.03 1.04-1.76v-2.81l-6.04 3.3c-.6.33-1.32.33-1.92 0L5 13.18zm6.04-9.66l-8.43 4.6c-.69.38-.69 1.38 0 1.76l8.43 4.6c.6.33 1.32.33 1.92 0L21 10.09V16c0 .55.45 1 1 1s1-.45 1-1V9.59c0-.37-.2-.7-.52-.88l-9.52-5.19c-.6-.32-1.32-.32-1.92 0z"
          />
        </svg>
      </router-link>
      <router-link class="router-btn" to="/products/categories">
        Show Categories
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M11.15 3.4L7.43 9.48c-.41.66.07 1.52.85 1.52h7.43c.78 0 1.26-.86.85-1.52L12.85 3.4c-.39-.64-1.31-.64-1.7 0z"
          />
          <circle cx="17.5" cy="17.5" r="4.5" />
          <path
            d="M4 21.5h6c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1z"
          />
        </svg>
      </router-link>
    </div>
    <router-view />

    <section class="product-list">
      <article class="product-card" v-for="(prod,ind) in products" :key="ind">
        <div class="container one">
          <h4 class="title">{{prod.title}}</h4>
          <div class="chip">{{prod.category}}</div>
          <h4 class="summary">{{prod.description}}</h4>
          <h4>{{prod.price | currencyFilter}} / per 5 questions</h4>
          <!-- <h2 class="content" v-html="art.content"></h2> -->
          <button class="read-more" @click="handleReadAritlce(art)">
            Ask a Question
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"
              />
            </svg>
          </button>
        </div>
        <div class="container two">
          <!-- <div class="date-chip">{{art.date}}</div> -->
          <img :src="prod.imageURL" class="article-image" />
        </div>
      </article>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { mapState, mapActions, mapMutations } from "vuex";
import ProductsStore from "../store/modules/products";
import { getModule } from "vuex-module-decorators";
@Component({
  filters: {
    currencyFilter: function(value: number) {
      if (!value) return "";
      return `€${value}`;
    }
  }
})
export default class Products extends Vue {
  //state
  public ProductsModuleInstance: any = null;
  //lifecycle
  created() {
    this.ProductsModuleInstance = getModule(ProductsStore, this.$store);
    this.handleFetchProducts();
  }
  //computed
  get products() {
    return this.ProductsModuleInstance.allProducts;
  }
  get hasProducts() {
    return this.ProductsModuleInstance.hasProducts;
  }
  //methods
  public handleFetchProducts() {
    if (!this.hasProducts) {
      //this["products/fetchProducts"]();
      console.log("product-fetch");
      this.ProductsModuleInstance.fetchProducts();
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  margin-top: -1rem;
  background-color: whitesmoke;
  padding-top: 1rem;
  h1.title {
    margin-top: 4rem;
  }
  h4.subtitle {
    padding: 0rem 2rem 1rem;
  }
  .links {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    .router-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      height: 2.5rem;
      margin: auto;
      margin-top: 5px;
      max-width: 300px;
      min-width: 250px;
      text-transform: uppercase;
      font-size: 1rem;
      background-color: #143e8c;
      transition: 0.3s ease-in-out;
      color: white;
      font-weight: 600;
      letter-spacing: 1px;
      cursor: pointer;
      border-radius: 30px;
      text-decoration: none;
      padding: 1px 0px;
      width: 100%;
      position: relative;
      &:hover {
        background-color: #235cc5;
      }
      svg {
        position: absolute;
        right: 16px;
        fill: white;
      }
    }
  }
}

.chip-category {
  border: 1px solid gray;
  border-radius: 30px;
  margin-left: 0.9rem;
  padding: 0px 15px;
  margin-right: auto;
}

// ADD ARTICLE STYYLES

section.product-list {
  display: flex;
  justify-content: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0% calc(2.5% - 2px) 3% calc(2.5% - 0px);
  margin-top: 2rem;
  background: white;
  border: 1px solid #80808040;

  border-top: none;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;

  article {
    cursor: pointer;
    min-width: 90%;
    max-width: 350px;
    margin: 2% 5%;
    box-shadow: 0px 0px 3px 2px #8080808f;
    border-radius: 8px;
    display: flex;
    flex-direction: column-reverse;
    overflow: hidden;
    background-color: white;

    .container {
      height: 100%;
      &.two {
        position: relative;
        img {
          width: 100%;
          min-height: 100%;
          max-height: 250px;
          object-fit: cover;
        }
        .date-chip {
          position: absolute;
          bottom: 0.5rem;
          left: 0.5rem;
          padding: 2px 10px;
          background-color: white;
          border-radius: 20px;
        }
      }
      &.one {
        height: 100%;
        display: flex;
        flex-direction: column;
        h4 {
          text-align: left;
          padding: 0.5rem;
          margin: 0;
          p {
            margin: 0;
          }
        }
        p.author {
          margin: 0;
          text-align: left;
          padding: 0.51rem;
          margin-top: -11px;
        }
        h4.title {
          font-size: 1.3rem;
        }
        h4.summary {
          font-size: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          padding-bottom: 0;
          margin-bottom: 10px;
        }

        button.read-more {
          width: calc(100% - 1rem);
          height: 2.5rem;
          margin: 0.5rem;
          margin-top: auto;
          text-transform: uppercase;
          font-size: 1rem;
          background-color: #143e8c;
          transition: 0.3s ease-in-out;
          color: white;
          font-weight: 600;
          letter-spacing: 1px;
          cursor: pointer;

          border-radius: 30px;
          &:hover {
            background-color: #1d56bf;
          }
          svg {
            position: absolute;
            margin-left: 10px;
            margin-top: -3px;
            height: 25px;
            width: 25px;
            fill: white;
          }
        }
      }
    }
  }
}
@media only screen and (min-width: 500px) {
  section.product-list {
    // padding: 5%;
    margin-top: 2rem;
    article {
      min-width: 0;
      max-width: 400px;
      margin: 2% auto;
      box-shadow: 0px 0px 3px 2px #8080808f;
    }
  }
}

@media only screen and (min-width: 700px) {
  section.product-list {
    padding: 0;

    margin: 0% calc(5% - 2px) 3% calc(5% - 0px);
    margin-top: 2rem;
    background: white;
    article {
      min-width: 0;
      margin: 2% 2.5%;
      width: calc((100vw - 10vw - 10.1%) / 2);

      max-width: none;
      width: 100%;
      flex-direction: row;
      .container {
        width: 100%;
      }
    }
  }
}
@media only screen and (min-width: 900px) {
  section.product-list {
    article {
      min-width: 0;
      margin: 2% 2.5%;
      width: calc((100vw - 10vw - 10.1%) / 2);
      width: calc((100vw - 10vw - 24.1%) / 2);

      max-width: 350px;

      flex-direction: column-reverse;
      .container {
        width: 100%;
        &.two {
          max-height: 200px;
          overflow: hidden;
          min-height: 200px;
        }
      }
    }
  }
}
@media only screen and (min-width: 1100px) {
  section.product-list {
    article {
      min-width: 0;
      margin: 2% 1.5%;
      width: calc((100vw - 10vw - 10.1%) / 2);
      width: calc((100vw - 10vw - 24.1%) / 2);
      max-width: none;
      width: 47%;
      flex-direction: row;
      .container.two {
        max-height: 100%;
        overflow: hidden;
        min-height: 200px;
      }
    }
  }
}

.chip {
  text-align: left;
  margin-left: 0.5rem;
  border: 1px solid gray;
  border-radius: 30px;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
}
</style>