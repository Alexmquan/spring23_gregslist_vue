import { AppState } from "../AppState.js";
import { House } from "../models/House.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class HousesService {
  async getAllHouses() {
    const res = await api.get('auth/api/houses/')
    console.log(res.data)
    AppState.houses = res.data.map(h => new House(h))
  }

  async createHouse(houseData) {
    const res = await api.post('auth/api/houses/', houseData)
    const house = new House(res.data)
    AppState.houses.push(house)
    return house
  }

  async getHouseById(houseId) {
    AppState.house = null
    const res = await api.get('auth/api/houses/' + houseId)
    console.log('[getting house by Id]', res.data)
    AppState.house = new House(res.data)
  }

  async deleteHouse(houseId) {
    const res = await api.delete('auth/api/houses/' + houseId)
    logger.log('delete car', res.data)
  }

  async editHouse(houseData) {

    logger.log('[edithouse HouseID]', houseData.id)
    const res = await api.put('auth/api/houses/' + houseData.id, houseData)
    AppState.house = new House(res.data)
  }

}

export const housesService = new HousesService();