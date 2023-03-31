<template>
  <div class="container-fluid ">
    <!-- SECTION Page nav -->
    <section class="row justify-content-center">
      <div class="col-11 d-flex justify-content-center p-3">
        <button @click="changePage(newer)" class="btn btn-info mx-3">Newer</button>
        <button @click="changePage(older)" class="btn btn-info mx-3">Older</button>
      </div>
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
      <div class="col-11">

      </div>
      <div v-for="p in posts" :key="p" class="col-11 my-2">
        <div class="card elevation-3 p-3">
          <div class="d-flex">
            <img class="profile-icon" :src="p.creator.picture" alt="">
            <div>
              <h5 class="mx-4">{{ p.creator.name }}</h5>
              <div class="d-flex">
                <h5>{{ p.createdAt }}</h5>
                <h5 v-if="p.creator.graduated"><i class="mdi mdi-school"></i></h5>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <p>{{ p.body }}</p>
            <div class="d-flex">
              <i @click="like(p.id)" class="selectable px-1 mdi mdi-heart"></i>
              <p>{{ p.likes.length }}</p>
            </div>
          </div>
          <div v-if="p.imgUrl">
            <img class="img-fluid" :src="p.imgUrl" alt="picture">
          </div>
        </div>
      </div>
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

export default {
  setup() {

    async function getPosts() {
      try {
        await postsService.getPosts()
      } catch (error) {
        logger.error(error.message)
        Pop.error(error.message)
      }
    }


    onMounted(() => getPosts())
    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      newer: computed(() => AppState.newer),
      older: computed(() => AppState.older),

      async changePage(url) {
        try {
          logger.log('[THIS IS THE URL OBJECT]', url)
          await postsService.changePage(url)
        } catch (error) {
          logger.error(error.message)
          Pop.error(error.message)
        }
      },

      async like(postId) {
        try {
          logger.log('[ACCOUNT ID]', postId)
          await postsService.like(postId)
          Pop.success('Thanks!')
        } catch (error) {
          logger.error(error.message)
          Pop.error(error.message)
        }
      }
    }
  }
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

.profile-icon {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
</style>
