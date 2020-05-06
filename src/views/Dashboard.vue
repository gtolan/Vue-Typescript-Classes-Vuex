<template>
  <main>
    <div class="profiler-wrapper">
      <UserProfile />
      <Contacts />
      <LatestBlog />
      <router-link class="add-article" to="/add-blog-article">Add Blog Article</router-link>
    </div>
    <SendMessage />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SendMessage from "@/components/Profile/SendMessage.vue";
import LatestBlog from "@/components/Blog/LatestBlog.vue";
import UserProfile from "@/components/Profile/UserProfile.vue";
import Contacts from "@/components/shared/Contacts.vue";
@Component({
  components: {
    SendMessage,
    LatestBlog,
    UserProfile,
    Contacts
  }
})
export default class Dashboard extends Vue {}
</script>

<style lang="scss" scoped>
main {
  margin-top: 3rem;
  background-color: whitesmoke;
  padding-bottom: 2rem;
  padding-top: 1rem;
}
.profiler-wrapper {
  width: 95%;
  margin: auto;
  margin-top: 1rem;
  background-color: white;
  padding-top: 0;
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
}
@media only screen and (min-width: 500px) {
  .profiler-wrapper {
    width: 90%;
  }
}
</style>