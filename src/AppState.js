import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {import('./models/Account.js').Profile} */
  profile: {},

  /** @type {import('./models/Ad.js').Ad[]} */
  ads: [],

  /** @type {import('./models/Post.js').Post[]} */
  posts: [],

  /** @type {import('./models/Profile.js').Profile|[]} */
  profiles: [],

  /** @type {import('./models/Post.js').Post|null} */
  activePost: {},

  /** @type {import('./models/Profile.js').Profile|null} */
  activeProfile: {},

  newer: null,
  older: null
})
