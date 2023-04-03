<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid">
    <section class="row">
      <div class="col-3">
        <section class="row" v-if="account.id">
          <div class="col-12 card elevation-2">
            <div>
              <div class="d-flex justify-content-center">
                <img v-if="account.picture" class="profile-img p-2" :src="account.picture" alt="">
                <h4 v-if="account.graduated == true"><i class="mdi mdi-school"></i></h4>
              </div>
              <div>
                <h4>{{ account.class }}</h4>
                <h3>{{ account.name }}</h3>
              </div>
              <div>
                <ul>
                  <li v-if="account.github">
                    <h3>
                      <a :href="account.github"><i class="mdi mdi-github"></i></a>
                    </h3>
                  </li>
                  <li v-if="account.linkedin">
                    <h3>
                      <a :href="account.linkedin"><i class="mdi mdi-linkedin"></i></a>
                    </h3>
                  </li>
                  <li v-if="account.resume">
                    <h3>
                      <a :href="account.resume"><i class="mdi mdi-file"></i></a>
                    </h3>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="col-7">
        <router-view />
      </div>
      <div class="col-2">
        <section class="row">
          <div class="col-12">
            <img class="img-fluid" :src="appState?.ads[0]?.square" :alt="appState?.ads[0]?.title">
            <img class="img-fluid" :src="appState?.ads[1]?.square" :alt="appState?.ads[1]?.title">
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
      appState: computed(() => AppState),
      profile: computed(() => AppState.profile),
      account: computed(() => AppState.account),

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

.profile-img {
  height: 200px;
  width: 200px;
  border-radius: 50%;
}
</style>
