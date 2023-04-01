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
  </div>
</template>


<script>
import { Post } from "../models/Post.js";

export default {
  props: {
    post: {
      type: Post,
      required: true
    }
  },
  setup() {
    return {}
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