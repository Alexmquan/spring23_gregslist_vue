import { Profile } from "./Account.js"

export class House {
  constructor(data) {
    this.id = data.id
    this.bedrooms = data.bedrooms
    this.bathrooms = data.bathrooms
    this.levels = data.levels
    this.imgUrl = data.imgUrl
    this.year = data.year
    this.price = data.price
    this.description = data.description
    this.price = data.price
    this.seller = new Profile(data.seller)
    this.createdAt = new Date(data.createdAt)
  }
}