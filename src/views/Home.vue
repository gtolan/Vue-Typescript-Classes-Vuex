<template>
  <main class="home">
    <div class="video-container" :class="{'active':isMounted}">
      <h1>Sometimes we need just a little advice</h1>
      <div class="video-overlay"></div>
      <video autoplay muted loop>
        <source :src="require('../assets/clouds.mp4')" type="video/mp4" />
      </video>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// @ is an alias to /src
@Component({})
export default class Home extends Vue {
  private isMounted = false;

  mounted() {
    this.isMounted = true;
  }
}
</script>
<style lang="scss" scoped>
.home {
  img {
    width: 60px;
  }
}
</style>
<style lang="scss" scoped>
main {
  margin-top: 3rem;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.video-container {
  opacity: 0;
  animation: fadeIn 0.6s ease-in-out;
  animation-fill-mode: forwards;
  transition: 1.5s;
  .video-overlay {
    height: 100%;
    background: linear-gradient(45deg, #000000a3, transparent);
    z-index: 10;
    left: 0;
    width: 100%;
    content: "";
    display: block;
    position: absolute;
    top: 3rem;
    z-index: 1;
    max-height: 450px;
    animation: fadeIn 0.6s ease-in-out;
    animation-fill-mode: forwards;
  }
  &.active {
    opacity: 1;
  }
  video {
    min-height: 400px;
    height: 100%;
    max-height: 450px;
    animation: fadeIn 0.6s ease-in-out;
    animation-fill-mode: forwards;
    object-fit: cover;
  }
  h1 {
    position: absolute;
    top: 3rem;
    font-size: 3rem;
    text-align: left;
    left: 1rem;
    width: 59%;
    color: white;
    z-index: 2;
    transition: 0.3s ease-in-out;
    margin: 0;
  }
}

@media only screen and (min-width: 500px) {
  .video-container {
    h1 {
      position: absolute;
      top: 4rem;
      font-size: 3.75rem;
    }
  }
}

@media only screen and (min-width: 700px) {
  main {
    margin-top: 4rem;
  }
  .video-container {
    overflow: hidden;
    width: 100%;
    min-height: 435px;
    height: 100%;
    max-height: 435px;

    .video-overlay {
      height: 100%;
      background: linear-gradient(45deg, #000000a3, transparent);
      z-index: 10;
      left: 0;
      width: 100%;
      content: "";
      display: block;
      position: absolute;
      top: 3rem;
      z-index: 1;
      animation: fadeIn 0.6s ease-in-out;
      animation-fill-mode: forwards;
    }
    h1 {
      position: absolute;
      top: 3.5rem;
      font-size: 5rem;
      text-align: left;
      left: 2rem;
      width: 59%;
      color: white;
      z-index: 2;
    }
    video {
      width: 100%;
      min-height: 450px;
      height: 100%;
      max-height: none;
      animation: fadeIn 0.6s ease-in-out;
      animation-fill-mode: forwards;
    }
  }
}
@media only screen and (min-width: 900px) {
  main {
    margin-top: 4rem;
  }
  .video-container {
    h1 {
      position: absolute;
      top: 6.5rem;
    }
  }
}
</style>
