<template>
  <div class="blog-article-list">
    <!-- Add Controls -->
    <div class="blog-controls">
      <button class="filter-a-z" @click="handleAZFilter" :class="{'active':this.toggleAZ}">
        <span class="md-screen">
          A-Z
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path
              d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"
            />
          </svg>
        </span>
        <span class="sm-screen">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path
              d="M12.93 2.65c-.2-.2-.51-.2-.71 0l-2.01 2.01h4.72l-2-2.01zm-.7 18.7c.2.2.51.2.71 0l1.98-1.98h-4.66l1.97 1.98zm-1.25-3.62c.6 0 1.01-.6.79-1.16L8.04 7.03c-.18-.46-.63-.76-1.12-.76-.49 0-.94.3-1.12.76l-3.74 9.53c-.22.56.19 1.16.79 1.16.35 0 .67-.22.8-.55l.71-1.9h5.11l.71 1.9c.13.34.45.56.8.56zm-6.01-4.09l1.94-5.18 1.94 5.18H4.97zm16.08 2.5h-5.33l5.72-8.29c.46-.66-.02-1.57-.82-1.57h-6.48c-.44 0-.79.36-.79.8v.01c0 .44.36.8.79.8h5.09l-5.73 8.28c-.46.66.02 1.57.82 1.57h6.72c.44 0 .79-.36.79-.79.02-.45-.34-.81-.78-.81z"
            />
          </svg>
        </span>
      </button>
      <button class="filter-a-z" @click="handleDateFilter" :class="{'active':this.toggleDate}">
        <span class="md-screen">
          Date
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path
              d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"
            />
          </svg>
        </span>
        <span class="sm-screen">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M19 4h-1V3c0-.55-.45-1-1-1s-1 .45-1 1v1H8V3c0-.55-.45-1-1-1s-1 .45-1 1v1H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1V9h14v10zM7 11h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"
            />
          </svg>
        </span>
      </button>
      <div class="search-container">
        <input type="text" v-model="searchArticles" placeholder="search titles..." />
      </div>
    </div>

    <!-- Add Controls END -->
    <!-- {{topArticles}}:TOP -->
    <!--  -->
    <section class="article-container">
      <!--topArticlesList -->
      <article
        class="blog"
        v-for="(art,ind) in topArticlesList"
        :key="ind"
        @click="handleOpenArticle(art)"
      >
        <div class="container one">
          <h2 class="title">{{art.title}}</h2>
          <div class="chip">{{art.category}}</div>
          <h2 class="summary">{{art.summary}}</h2>
          <p class="author">By {{art.authorName}}</p>
          <!-- <h2 class="content" v-html="art.content"></h2> -->
          <button class="read-more" @click="handleReadAritlce(art)">
            Read More
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
          <div class="date-chip">{{art.date}}</div>
          <img :src="art.imageURL" class="article-image" />
        </div>
      </article>
    </section>
  </div>
</template>

<script lang="ts">
// import { mapActions, mapState, mapMutations } from "vuex";
import { Component, Vue } from "vue-property-decorator";
import Articles from "../../store/modules/articles";
import { getModule } from "vuex-module-decorators";
interface ArticleObject {
  title: string;
  category: string;
  summary: string;
  content: any;
}
@Component({})
export default class BlogArticleList extends Vue {
  public searchArticles = "";
  public toggleAZ = false;
  public toggleDate = false;
  public filterName = "";
  public toggleOnline = false;
  public ArticlesModuleInstance: any = null;

  get topArticles() {
    return this.ArticlesModuleInstance.topArticles;
  }
  // computed: {

  get hasArticles() {
    return this.ArticlesModuleInstance.hasArticles;
  }

  get topArticlesList(): any {
    const name: any = this.filterName;
    console.log(this, "THIS find filtername", name, this.topArticles);
    return this.topArticles;

    // const filter = this.filterName != "" ? this[name]() : this.topArticles;
    // console.log(filter, "filter");
    // return this.topArticles; //filter;
  }

  public handleDateFilter() {
    this.toggleAZ = false;
    this.toggleOnline = false;
    this.filterName = "filterDate";
    this.filterDate();
    this.toggleDate = !this.toggleDate;
  }

  public handleAZFilter() {
    this.toggleDate = false;
    this.toggleOnline = false;
    this.filterName = "filterAZ";
    this.filterAZ();
    this.toggleAZ = !this.toggleAZ;
  }

  public filterAZ() {
    // console.log("start sort", this.users);
    // let az;
    return this.toggleAZ
      ? this.topArticles.sort((a: { title: string }, b: { title: string }) => {
          this.toggleAZ = !this.toggleAZ;
          return b.title.localeCompare(a.title);
        })
      : this.topArticles.sort((a: { title: string }, b: { title: string }) => {
          this.toggleAZ = !this.toggleAZ;
          return a.title.localeCompare(b.title);
        });
  }

  public filterDate() {
    return this.toggleDate
      ? this.topArticles.sort(
          (a: { date: any }, b: { date: any }) => {
            const A: any = new Date(a.date);
            const B: any = new Date(b.date);
            const res: number = A - B; //TODO: check if opposite needed?? A-B/B-A
            this.toggleDate = !this.toggleDate;
            return res;
          }
          //new Date(b.date) - new Date(a.date)
        )
      : this.topArticles.sort(
          (a: { date: any }, b: { date: any }) => {
            const A: any = new Date(a.date);
            const B: any = new Date(b.date);
            const res: number = B - A;
            this.toggleDate = !this.toggleDate;
            return res;
          }
          //(new Date(b.date)?: Date) - new Date(a.date)
        );
  }

  public handleFetchArticles() {
    if (!this.hasArticles) {
      this.ArticlesModuleInstance.fetchArticles().then(() => {
        // this["articles/fetchArticles"]().then(() => {
        console.log("upd");
        //   this.update();
      });
    }
  }

  public handleOpenArticle(art: ArticleObject) {
    // this["articles/selectedArticle"](art);
    this.ArticlesModuleInstance.selectedArticle(art);
    const titlStr = decodeURIComponent(art.title);
    console.log("pushpage.titlStr", titlStr);
    this.$router.push({ path: `blog/${titlStr}` });
  }

  beforeCreate() {
    console.log("BC");
  }
  created() {
    this.ArticlesModuleInstance = getModule(Articles, this.$store);
    console.log(this.ArticlesModuleInstance, "AI");
    this.handleFetchArticles();
  }
}
</script>

<style lang="scss" scoped>
.blog-article-list {
  width: 100%;
}
section.article-container {
  display: flex;
  justify-content: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0% calc(2.5% - 2px) 3% calc(2.5% - 0px);

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
        h2 {
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
        h2.title {
          font-size: 1.3rem;
        }
        h2.summary {
          font-size: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          padding-bottom: 0;
          margin-bottom: 10px;
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
}
@media only screen and (min-width: 500px) {
  section.article-container {
    // padding: 5%;
    article {
      min-width: 0;
      max-width: 400px;
      margin: 2% auto;
      box-shadow: 0px 0px 3px 2px #8080808f;
    }
  }
}

@media only screen and (min-width: 700px) {
  section.article-container {
    padding: 0;

    margin: 0% calc(5% - 2px) 3% calc(5% - 0px);
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
  section.article-container {
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
  section.article-container {
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

.blog-controls {
  width: 95%;

  margin: 2% 2.5% 0%;

  border-radius: 3px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  overflow: hidden;
  cursor: pointer;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 3rem;
  border: 1px solid #80808040;
  align-content: center;
  align-items: center;
  button,
  div.search-container {
    width: 100%;
    border: none;
    cursor: pointer;
    outline: none;
  }
  button {
    font-size: 0.97rem;
    font-weight: 600;
    letter-spacing: 1px;
    padding: 0px;
    border: 1px solid grey;

    height: 2.35rem;
    width: 94%;
    border-radius: 30px;
    margin: auto 1%;
    position: relative;
    .md-screen {
      svg {
        vertical-align: middle;
        position: absolute;
        margin-top: -6px;
        height: 32px;
        width: 32px;
        right: 6px;
        transition: 0.3s ease-in-out;
        transform: rotate(90deg);
        border-radius: 50%;
        transition: 0.3s ease-in-out;
        &:hover {
          background-color: #8080803b;
        }
      }
    }
  }
  div.search-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;
    input {
      font-size: 0.9rem;
      border-radius: 30px;
      border: 1px solid gray;
      width: 90%;
      padding-left: 4%;
      height: 2.05rem;
      cursor: pointer;
      outline: none;
    }
  }
}

@media only screen and (min-width: 500px) {
  .blog-controls {
    width: 90%;
    margin: 2% 5% 0%;
  }
  section.article-container {
    margin: 0% calc(5% - 2px) 3% calc(5% - 0px);
  }
}

.sm-screen {
  display: block;
}

.md-screen {
  display: none;
}

@media only screen and (min-width: 700px) {
  .sm-screen {
    display: none !important;
  }

  .md-screen {
    display: block;
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