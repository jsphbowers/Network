<template>
  <div class="container-fluid ">
    <!-- SECTION Page nav -->
    <section class="row justify-content-center">
      <PaginationButtons />
    </section>

    <!-- SECTION Form for making new Post -->
    <section class="row justify-content-center">
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
import { postsService } from "../services/PostsService.js"
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import PostCard from "../components/PostCard.vue";

export default {
  setup() {
    const editable = ref({})

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
