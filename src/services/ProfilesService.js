import { AppState } from "../AppState.js"
import { Profile } from "../models/Account.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProfilesService {
  async getProfileById(profileId) {
    logger.log('we made it to profile service', profileId)
    const res = await api.get(`api/profiles/${profileId}`)
    AppState.activeProfile = new Profile(res.data)
    logger.log('[THIS IS NOW THE ACTIVE PROFILE]', AppState.activeProfile)
  }


}

export const profilesService = new ProfilesService()