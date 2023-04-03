<template>
  <div class="container-fluid">
    <section class="row justify-content-center">
      <PaginationButtons />
    </section>
    <section class="row">
      <div class="col-12">
        <div class="card elevation-4 p-2">
          <img class="position-relative img-fluid cover-img" :src="profile.coverImg" alt="">
          <img class="profile-img position-absolute" :src="profile.picture" :alt="profile.name">
          <div class="d-flex justify-content-end">
            <h4 v-if="profile.graduated"><i class="mdi mdi-school"></i></h4>
            <div class="d-flex mt-2 justify-content-end">
              <h3 class="mx-2" v-if="profile.github">
                <a :href="profile.github"><i class="selectable mdi mdi-github"></i></a>
              </h3>
              <!-- TODO Get Router Links to work! -->
              <h3 class="mx-2" v-if="profile.linkedin">
                <a :href="profile.linkedin"><i class="selectable mdi mdi-linkedin"></i></a>
              </h3>
              <h3 class="mx-2" v-if="profile.resume">
                <a :href="profile.resume"><i class="selectable mdi mdi-file"></i></a>
              </h3>
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
          </div>
        </div>
      </div>
    </section>

    <section class="row">
      <div v-if="account.id == profile.id">
        <div class="col-12 card p-2 d-flex">
          <form @submit.prevent="createPost()" class="card elevation-3">
            <div class="form-floating m-2">
              <textarea v-model="editable.body" class="form-control" placeholder="Write something creative..."
                id="floatingTextarea"></textarea>
              <label for="floatingTextarea">Post Body</label>
            </div>
            <div class="input-group mb-3 p-2">
              <span class="input-group-text" id="inputGroup-sizing-default">URL</span>
              <input v-model="editable.imgUrl" type="url" class="form-control" aria-label="Url for photo"
                aria-describedby="inputGroup-sizing-default">
            </div>
            <button class="btn btn-success m-2">Post!</button>
          </form>
        </div>
      </div>
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
import { onMounted, ref } from "vue";
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
    const editable = ref({})
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
      editable,
      route,
      profile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),

      async createPost() {
        try {
          const post = editable.value
          logger.log('[WE MAKING A POST]', post)
          await postsService.createPost(post)
        } catch (error) {
          logger.log(error.message)
          Pop.error(error.message)
        }
      },
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
  bottom: 150px;
  left: 150px;
}

.school-icon {
  bottom: 190px;
  left: 190px;
}

.cover-img {
  margin-bottom: 4vh;
}
</style>