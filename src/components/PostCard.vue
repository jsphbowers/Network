<template>
  <div class="card elevation-3 p-3">
    <div class="d-flex">
      <router-link :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
        <img class="profile-icon selectable" :src="post.creator.picture" alt="">
      </router-link>
      <div>
        <h5 class="mx-4">{{ post.creator.name }}</h5>
        <div class="d-flex">
          <h5>{{ post.createdAt }}</h5>
          <h5 v-if="post.creator.graduated"><i class="mdi mdi-school"></i></h5>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <p>{{ post.body }}</p>
      <div class="d-flex">
        <i @click="like(post.id)" class="selectable px-1 mdi mdi-heart"></i>
        <p>{{ post.likes.length }}</p>
      </div>
    </div>
    <div v-if="post.imgUrl">
      <img class="img-fluid" :src="post.imgUrl" alt="picture">
    </div>
    <div v-if="post.creatorId == account.id" class="d-flex justify-content-end">
      <button @click="deletePost()" class="btn btn-danger"><i class="mdi mdi-delete"></i></button>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { postsService } from "../services/PostsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { router } from "../router.js";

export default {
  props: {
    post: {
      type: Post,
      required: true
    }
  },
  setup(props) {
    return {
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
      },

      async deletePost() {
        try {
          const postId = props.post.id
          if (await Pop.confirm('Are you sure??!!?!?!?! This post is pretty schweet!!!'))
            await postsService.deletePost(postId)
          Pop.toast('Post Deleted')
        } catch (error) {
          logger.log(error.message)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.profile-icon {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
</style>