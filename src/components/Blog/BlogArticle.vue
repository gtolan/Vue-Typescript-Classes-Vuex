<template>
  <main>
    <article class="blog">
      <div class="container one">
        <h2 class="title">{{selectedArticle.title}}</h2>
        <div class="chip">{{selectedArticle.category}}</div>
        <h2 class="summary">{{selectedArticle.summary}}</h2>
        <p class="author">By {{selectedArticle.authorName}}</p>
        <div class="content" v-html="selectedArticle.content"></div>
        <!-- <h2 class="content" v-html="art.content"></h2> -->
        <button class="read-more" @click="handleBack">
          Back to Feed
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
        <div class="date-chip">{{selectedArticle.date}}</div>
        <img :src="selectedArticle.imageURL" class="article-image" />
      </div>
    </article>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { mapState } from "vuex";
import { getModule } from "vuex-module-decorators";
import Articles from "../../store/modules/articles";
@Component({})
export default class BlogArticle extends Vue {
  public ArticlesModuleInstance: any = null;
  public selectedArticle: any[] = this.ArticlesModuleInstance.articles
    .selectedArticle;

  public handleBack() {
    this.$router.push("/blog");
  }

  mounted() {
    window.scrollTo(0, 0);
  }
  created() {
    this.ArticlesModuleInstance = getModule(Articles, this.$store);
  }
}
</script>

<style lang="scss" scoped>
article {
  cursor: pointer;
  min-width: 90%;
  margin: 2% 5%;
  box-shadow: 0px 0px 3px 2px #8080808f;
  border-radius: 8px;
}

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
        bottom: 1.5rem;

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
      h2 {
        text-align: left;
        padding: 0.5rem;
        margin: 0;
        p {
          margin: 0;
        }
      }
      p.author {
        margin: 1rem 0 1rem;
        text-align: left;
        padding: 0.51rem;
      }
      h2.title {
        font-size: 2.3rem;
      }
      div.content {
        text-align: left;
        padding: 0.51rem;
        margin: 2rem 0;
      }
      h2.summary {
        font-size: 1rem;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        padding-bottom: 0;
        margin: 1rem 0;
      }
      h2.content {
        margin: 5px auto;
        font-size: 0.9rem;
        line-height: 1.3rem;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        padding-bottom: 0;

        p {
          margin: 0px auto;
        }
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

main {
  margin-top: 4rem;
  background-color: whitesmoke;
  background-color: white;
  padding-top: 1rem;
  padding-bottom: 3rem;
  h1.title {
    margin-top: 4rem;
  }
  h4.subtitle {
    padding: 0rem 2rem 1rem;
  }
}

@media only screen and (min-width: 700px) {
  main {
    h1.title {
      margin-top: 5rem;
    }
  }
}
.chip {
  text-align: left;
  margin-left: 0.5rem;
  border: 1px solid gray;
  border-radius: 30px;
  padding-left: 15px;
  margin: 1rem 0.5rem;
  margin-right: auto;
  padding-right: 15px;
}
</style>