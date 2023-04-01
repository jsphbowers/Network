<template>
  <div class="container-fluid ">
    <!-- SECTION Page nav -->
    <section class="row justify-content-center">
      <PaginationButtons />
    </section>

    <!-- SECTION Form for making new Post -->
    <section class="row justify-content-center">
      <div class="col-11">
        <form class="card elevation-3">
          <input class="form-control" type="text">
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
import { onMounted } from "vue";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js"
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import PostCard from "../components/PostCard.vue";

export default {
  setup() {
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
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      async like(postId) {
        try {
          logger.log("[ACCOUNT ID]", postId);
          await postsService.like(postId);
          Pop.success("Thanks!");
        }
        catch (error) {
          logger.error(error.message);
          Pop.error(error.message);
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
</style>
