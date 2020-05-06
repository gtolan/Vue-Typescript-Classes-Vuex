<template>
  <div class="user">
    <section class="profile">
      <div class="profile-container">
        <!-- //v-for="(pro,ind) in profile" :key="ind" -->

        <div class="left">
          <h3>Name: {{profile ? profile.displayName : ''}}</h3>
          <!-- <h3>Email: {{profile ? profile.email : ''}}</h3> -->
          <h3>Expertise: {{profile ? profile.displayName : ''}}</h3>
          <div class="chip-container">
            <div class="chip">Javascript</div>
            <div class="chip">Vuejs</div>
            <div class="chip">Typescript</div>
          </div>
          <h3>Rating:</h3>
          <h3>Questions Answered:</h3>
          <h3>Online Status: {{profile ? profile.online : ''}}</h3>
        </div>
        <div class="right">
          <div class="image-sample" v-if="!showEdit">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/cms-example-1e6fa.appspot.com/o/smile.jpg?alt=media&token=da6716a0-07a0-420d-b87c-3839489ffc0f"
            />
          </div>
          <div class="edit" v-show="showEdit">
            <input type="text" v-model="profileName" placeholder="Name" />
            <input type="text" v-model="profileEmail" placeholder="Email" />
            <input type="text" v-model="profileImage" placeholder="Profile Image" />
          </div>
        </div>
      </div>
    </section>
    <button class="edit-profile" @click="handleEditProfile">Edit Profile</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import Authentication from "../../store/modules/authentication";

@Component({})
export default class UserProfile extends Vue {
  // public routeProfileParams: string = this.$route.params.uid;
  public showEdit = false;
  public AuthenticationModuleInstance: any = null;
  public profileImage = "";
  public profileName = "";
  public profileEmail = "";

  //computed: {
  get uid() {
    return this.AuthenticationModuleInstance.uid;
  }

  get users() {
    return this.AuthenticationModuleInstance.users;
  }

  created() {
    this.AuthenticationModuleInstance = getModule(Authentication, this.$store);
  }

  public handleEditProfile() {
    console.log("handleEditProfile", this.showEdit);
    this.showEdit = !this.showEdit;
  }

  get profile() {
    const profile = this.users.find((user: any) => this.uid == user.uid);

    console.log(profile, "profi");
    return profile;
  }
}
</script>

<style lang="scss" scoped>
div.user {
  margin-top: 0rem;
  background-color: whitesmoke;
  background-color: transparent;
}
@keyframes slideInFromRight {
  0% {
    opacity: 0.5;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0%);
  }
}
section.profile {
  padding-top: 1rem;
}
.profile-container {
  display: flex;
  background-color: white;
  flex-direction: column-reverse;
  overflow: hidden;
  position: relative;
  border: 1px solid #80808040;
  border-radius: 3px;

  width: 95%;
  margin: 2% 2.5%;

  button {
    position: absolute;
    width: calc(50% - 0rem);
    margin-top: 0rem;
    margin-left: 0rem;
    height: 2rem;
    cursor: pointer;
    border: none;
    transition: 0.3s ease-in-out;
    background-color: #143e8c;
    color: white;
    font-size: 0.97rem;
    font-weight: 600;
    letter-spacing: 1px;
    padding: 0;
  }
  .left {
    width: calc(100% - 2rem);
    padding: 1rem;
    h3 {
      text-align: left;
      font-size: 1rem;
    }
  }
  .right {
    width: calc(100% - 2rem);
    padding: 1rem;
    overflow: hidden;
    .image-sample {
      max-height: 250px;
      position: relative;
      display: flex;
      max-height: 300px;
      img {
        width: 100%;
        object-fit: cover;

        // margin-top: calc(-200px + 50%);
      }
    }
    .edit {
      display: flex;
      flex-direction: column;
      transition: 0.3s ease-in-out;
      transform-origin: right;
      animation: slideInFromRight 0.4s ease-in-out;
      animation-fill-mode: forwards;
      input {
        height: 1.42rem;
        border-radius: 3px;
        border: 1px solid lightgrey;
        padding-left: 10px;

        margin: 17px 1px 2px;
        outline: none;
      }
    }
  }
}
@media only screen and (min-width: 500px) {
  .profile-container {
    flex-direction: row;
    width: 90%;
    margin: 2% 5%;

    .right {
      width: 100%;
      .image-sample {
        max-height: 300px;
      }
    }
    .left {
      width: 100%;
    }
  }
}

@media only screen and (min-width: 700px) {
  .profile-container {
    // flex-direction: row;
    // width: 90%;
    // margin: 2% 5%;
    flex-direction: row;

    //   width: 100%;
    .right {
      .image-sample {
        max-height: 250px;
      }
    }
  }
}

button.edit-profile {
  height: 2rem;
  border-radius: 30px;
  min-width: 200px;
  font-size: 0.97rem;
  margin-bottom: 2rem;
  cursor: pointer;
  outline: none;
}
.chip-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .chip {
    width: auto;
    border: 1px solid grey;
    border-radius: 30px;
    margin-right: auto;
    margin-top: 3px;
    padding: 0px 12px;
    margin-bottom: 3px;
  }
}
</style>