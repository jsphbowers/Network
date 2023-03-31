<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid">
    <section class="row">
      <div class="col-3">
        Profile area
      </div>
      <div class="col-7">
        <router-view />
      </div>
      <div class="col-2">
        <section class="row">
          <div class="col-12">
            <img class="img-fluid" :src="appState.ads[0].square" alt="placeholder">
            <img class="img-fluid" :src="appState.ads[1].square" alt="placeholder">
          </div>
        </section>
      </div>
    </section>
  </main>
  <footer class="text-light">
    Made with 🫀 by Joseph Bowers
  </footer>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import Pop from "./utils/Pop.js"
import { logger } from "./utils/Logger.js"
import { adsService } from "../src/services/AdsService.js"

export default {
  setup() {

    async function getAdds() {
      try {
        await adsService.getAds()
      } catch (error) {
        Pop.error(error.message)
        logger.log(error.message)
      }
    }
    onMounted(() => getAdds())
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
  background-color: #418ffc;
}
</style>
