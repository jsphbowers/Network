export class Profile {
  constructor(data) {
    this.id = data.id || data._id
    this.name = data.name
    this.picture = data.picture
    this.subs = data.subs
    this.bio = data.bio
    this.coverImg = data.coverImg
    this.github = data.github
    this.linkedin = data.linkedin
    this.resume = data.resume
    this.class = data.class
    this.graduated = data.graduated
  }
}

export class Account extends Profile {
  constructor(data) {
    super(data)
    this.email = data.email
    // TODO add additional properties if needed
  }
}
