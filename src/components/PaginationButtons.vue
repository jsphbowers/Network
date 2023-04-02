<template>
  <div class="col-11 d-flex justify-content-center p-3">
    <button :disabled="newer == null" @click="changePage(newer)" class="btn btn-info mx-3">Newer</button>
    <button :disabled="older == null" @click="changePage(older)" class="btn btn-info mx-3">Older</button>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState.js"
import { postsService } from "../services/PostsService.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"

export default {
  setup() {
    return {
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
    }
  }
}
</script>


<style lang="scss" scoped></style>