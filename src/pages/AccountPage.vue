<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

  <div class="justify-content-center">
    <form @submit.prevent="editAccount()" class="card elevation-3">
      <div class="input-group mb-3 p-2">
        <span class="input-group-text" id="inputGroup-sizing-default">Name</span>
        <input v-model="editable.name" type="text" id="name" class="form-control" aria-label="Name"
          aria-describedby="inputGroup-sizing-default">
      </div>
      <div class="input-group mb-3 p-2">
        <span class="input-group-text" id="inputGroup-sizing-default">Profile photo</span>
        <input v-model="editable.picture" type="url" id="picture" class="form-control" aria-label="Url for photo"
          aria-describedby="inputGroup-sizing-default">
      </div>
      <div class="input-group mb-3 p-2">
        <span class="input-group-text" id="inputGroup-sizing-default">Cover Image</span>
        <input v-model="editable.coverImg" type="url" id="coverImg" class="form-control" aria-label="Url for photo"
          aria-describedby="inputGroup-sizing-default">
      </div>
      <div class="input-group mb-3 p-2">
        <span class="input-group-text" id="inputGroup-sizing-default">github</span>
        <input v-model="editable.github" type="text" id="github" class="form-control" aria-label="Github Account"
          aria-describedby="inputGroup-sizing-default">
      </div>
      <div class="input-group mb-3 p-2">
        <span class="input-group-text" id="inputGroup-sizing-default">linkedin</span>
        <input v-model="editable.linkedin" type="text" id="linkedin" class="form-control" aria-label="Linkedin Account"
          aria-describedby="inputGroup-sizing-default">
      </div>
      <div class="input-group mb-3 p-2">
        <span class="input-group-text" id="inputGroup-sizing-default">Resume</span>
        <input v-model="editable.resume" type="text" id="resume" class="form-control" aria-label="Resume"
          aria-describedby="inputGroup-sizing-default">
      </div>
      <div class="input-group mb-3 p-2">
        <div class="input-group-text">
          <input v-model="editable.graduated" class="form-check-input mt-0" type="checkbox"
            aria-label="Checkbox for following text input">
          <label class="px-2" for="graduated">Graduated?</label>
        </div>
      </div>
      <button class="btn btn-success m-2" type="submit">Submit Edits</button>
    </form>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { accountService } from "../services/AccountService.js"
export default {
  setup() {
    const editable = ref({})

    watchEffect(() => {
      if (AppState.account.id) {
        editable.value = { ...AppState.account }
      }
    })
    return {
      editable,

      account: computed(() => AppState.account),

      async editAccount() {
        try {
          const edits = editable.value
          await accountService.editAccount(edits)
        } catch (error) {
          logger.error(error.message)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
