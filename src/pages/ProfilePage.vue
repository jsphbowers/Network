<template>
  <div class="container-fluid">
    <section class="row justify-content-center">
      <PaginationButtons />
    </section>
    <section class="row">
      <div class="col-12">
        <div class="card elevation-4 p-2">
          <img class="position-relative img-fluid cover-img" :src="profile.coverImg" alt="">
          <div class="d-flex justify-content-between">
            <img class="profile-img  position-absolute" :src="profile.picture" :alt="profile.name">
            <h4 v-if="profile.graduated"><i class="school-icon  position-absolute mdi mdi-school"></i></h4>
            <div class="d-flex mt-2">
              <h3 class="mx-2" v-if="profile.github">
                <i class="selectable mdi mdi-github" @click=""></i>
              </h3>
              <!-- TODO Get Router Links to work! -->
              <!-- <router-link>
                <h3 class="mx-2" v-if="profile.linkedin">
                  <i class="selectable mdi mdi-linkedin"></i>
                </h3>
              </router-link>
              <router-link>
                <h3 class="mx-2" v-if="profile.resume">
                  <i class="selectable mdi mdi-file"></i>
                </h3>
              </router-link> -->
            </div>
          </div>
          <div class="position-relative bio-info">
            <div>
              <h4>{{ profile.class }}</h4>
              <h3>{{ profile.name }}</h3>
            </div>
            <div>
              <p>{{ profile.bio }}</p>
            </div>
            <div class="d-flex justify-content-end">
              <button class="btn btn-info">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="row">
      <div v-for="p in posts" :key="p.id" class="col-12 my-2">
        <PostCard :post="p" />
      </div>
    </section>
    <section class="row justify-content-center">
      <PaginationButtons />
    </section>
  </div>
</template>


<script>
import { onMounted } from "vue";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { useRoute } from "vue-router";
import { profilesService } from "../services/ProfilesService.js"
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import { postsService } from "../services/PostsService.js";
import PostCard from "../components/PostCard.vue";

export default {
  setup() {
    const route = useRoute();
    async function getProfileById() {
      try {
        const profileId = route.params.profileId;
        logger.log("[THIS IS THE PROFILEID]", profileId);
        await profilesService.getProfileById(profileId);
      }
      catch (error) {
        Pop.error(error.message);
        logger.log(error.message);
      }
    }
    async function getPostsById() {
      try {
        const profileId = route.params.profileId;
        await postsService.getPostsById({ creatorId: profileId });
      }
      catch (error) {
        logger.log(error.message);
        Pop.error(error.message);
      }
    }
    onMounted(() => getProfileById()),
      onMounted(() => getPostsById());
    return {
      route,
      profile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account)
    };
  },
  components: { PostCard }
}
</script>


<style lang="scss" scoped>
.profile-img {
  height: 200px;
  width: 200px;
  border-radius: 50%;
  bottom: 170px;
}

.school-icon {
  bottom: 190px;
  left: 190px;
}

.cover-img {
  margin-bottom: 4vh;
}
</style>