<template>
  <!-- name is the name of the route in router.js -->
  <router-link :to="{ name: 'HouseDetails', params: { houseId: house.id } }">
    <div class="elevation-3 rounded bg-light border border-1 border-dark my-3">
      <img :src="house.imgUrl" alt="" class="img-fluid rounded-top">
      <div class="text-center p-3">
        <h4>Price: {{ house.price }} | Year Built: {{ house.year }}</h4>
        <h5>{{ house.bedrooms }} Bedrooms | {{ house.bathrooms }} Bathrooms</h5>
      </div>
      <div v-if="route.name == 'HouseDetails'" class="p-2">
        <div class="d-flex justify-content-around">
          <h2>levels: {{ house.levels }}</h2>
          <h2>{{ house.price }}</h2>
        </div>
        <p class="fw-bold fs-3">{{ house.description }}</p>

        <div v-if="house.creatorId == account.id" class="d-flex justify-content-around">
          <button class="btn btn-danger" @click.stop="deleteHouse()">Delete house</button>
          <button data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-info">edit House</button>
        </div>
      </div>
    </div>
  </router-link>
</template>


<script>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AppState } from '../AppState.js';
import { House } from "../models/House.js";
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { housesService } from "../services/HousesService.js";
import { router } from "../router.js";

export default {
  props: {
    house: {
      type: House,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const Router = useRouter()
    return {
      route,
      account: computed(() => AppState.account),
      async deleteHouse() {
        try {
          if (await Pop.confirm('Are you sure you want to delete this house')) {
            const houseId = props.house.id
            await housesService.deleteHouse(houseId)
            router.push({ name: "Houses" })
          }
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
img {
  width: 100%;
  height: 40vh;
  object-fit: cover;
  object-position: center;
}
</style>