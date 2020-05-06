<template>
  <div class="latest-news">
    <BlogArticleList />
  </div>
</template>

<script type="ts">
import { Component, Vue } from "vue-property-decorator";
import BlogArticleList from "@/components/Blog/BlogArticleList.vue";
@Component({
  components: {
    BlogArticleList
  }
})
export default class LatestBlog extends Vue {}
</script>
<style lang="scss">
.latest-news {
  margin-top: 3rem;
}
</style>