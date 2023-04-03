<template>
  <div class="container-fluid ">
    <!-- SECTION Search Bar -->
    <section class="row justify-content-center">
      <div class="col-8 p-3">
        <form @submit.prevent="searchPosts()">
          <div class="input-group mb-3">
            <input type="text" v-model="search.query" class="form-control" placeholder="Search" aria-label="Search"
              aria-describedby="button-addon2">
            <button class="btn btn-outline-secondary" type="submit" id="search"><i class="mdi mdi-magnify"></i></button>
          </div>
        </form>
      </div>
    </section>

    <!-- SECTION Page nav -->
    <section class="row justify-content-center">
      <PaginationButtons />
    </section>

    <!-- SECTION Form for making new Post -->
    <section class="row justify-content-center" v-if="account.id">
      <div class="col-11 card p-2 d-flex">
        <img class="profile-img p-2" :src="account.picture" alt="">
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
    </section>

    <!-- SECTION Feed for Posts -->
    <section class="row justify-content-center">
      <div v-for="p in posts" :key="p.id" class="col-11 my-2">
        <h2>Posts</h2>
        <PostCard :post="p" />
      </div>
    </section>

    <section class="row justify-content-center" v-if="profiles">
      <h2>Profiles</h2>
      <div v-for="p in profiles" :key="p.id" class="col-11 my-2">
        {{ p.id }}
        <div class="card elevation-3 p-3">
          <div class="d-flex">
            <!-- <router-link :to="{ name: 'Profile', params: { profileId: p.id } }"> -->
            <img class="profile-img" :src="p.picture" alt="">
            <!-- </router-link> -->
            <div>
              <h5 class="mx-2">{{ p.name }}</h5>
              <div class="d-flex px-3">
                <h5>{{ p.class }}</h5>
                <h5 v-if="p.graduated"><i class="mdi mdi-school"></i></h5>
              </div>
            </div>
          </div>
        </div>
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
import { postsService } from "../services/PostsService.js"
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import PostCard from "../components/PostCard.vue";

export default {
  setup() {
    const editable = ref({})
    const search = ref({})

    async function getPosts() {
      try {
        await postsService.getPosts();
      }
      catch (error) {
        logger.error(error.message);
        Pop.error(error.message);
      }
    }
    onMounted(() => getPosts());
    return {
      editable,
      search,
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      profiles: computed(() => AppState.profiles),

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

      async searchPosts() {
        try {
          const query = search.value
          // logger.log(query)
          await postsService.searchPosts(query)
          await postsService.searchProfiles(query)
        } catch (error) {
          logger.log(error.message)
          Pop.error(error.message)
        }
      }
    };
  },
  components: { PostCard }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.profile-img {
  height: 80px;
  width: 80px;
  border-radius: 50%;
}
</style>
