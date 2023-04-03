<template>
  <div class="container-fluid">
    <div v-if="account.id" class="row my-3">
      <div class="col-12">
        <button data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-outline-danger">Add House</button>
      </div>
    </div>
    <div class="row">
      <div v-for="house in houses" :key="house.id" class="col-12 col-md-4">
        <HouseCard :house="house" />
      </div>
    </div>
  </div>
  <ModalComponent>
    <HouseForm :house="house" />
  </ModalComponent>
</template>


<script>
import { onMounted, computed } from 'vue';
import { AppState } from '../AppState.js';
import { housesService } from "../services/HousesService.js";
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { House } from "../models/House.js";
import HouseCard from "../components/HouseCard.vue";
import ModalComponent from "../components/ModalComponent.vue";
import HouseForm from "../components/HouseForm.vue";

export default {
  setup() {
    async function getAllHouses() {
      try {
        await housesService.getAllHouses();
      }
      catch (error) {
        logger.error(error);
        Pop.error(error.message);
      }
    }
    onMounted(() => {
      getAllHouses();
    });
    return {
      houses: computed(() => AppState.houses),
      account: computed(() => AppState.account)
    };
  },
  components: { HouseCard, ModalComponent, HouseForm }
}
</script>


<style lang="scss" scoped></style>