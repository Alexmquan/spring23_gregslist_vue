<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-md-4">
        <div class="elevation-3 rounded bg-light border border-1 border-dark">
          <img src="" alt="">
          <div>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { onMounted, computed } from 'vue';
import { AppState } from '../AppState.js';
import { housesService } from "../services/HousesService.js";
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    async function getAllHouses() {
      try {
        await housesService.getAllHouses()
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getAllHouses()
    });

    return {
    }
  }
}
</script>


<style lang="scss" scoped></style>