import { api } from "./AxiosService.js";

class HousesService {
  async getAllHouses() {
    const res = await api.get('auth/api/houses/')
    console.log(res.data)
  }
}

export const housesService = new HousesService();