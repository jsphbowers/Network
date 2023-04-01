<template>
  <div class="container-fluid">
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

export default {
  setup() {
    const route = useRoute()

    async function getProfileById() {
      try {
        const profileId = route.params.profileId
        logger.log('[THIS IS THE PROFILEID]', profileId)
        await profilesService.getProfileById(profileId)
      } catch (error) {
        Pop.error(error.message)
        logger.log(error.message)
      }
    }
    onMounted(() => getProfileById())
    return {
      route,
      profile: computed(() => AppState.activeProfile)
    }
  }
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