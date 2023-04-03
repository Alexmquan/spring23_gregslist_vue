<template>
  <div class="modal-header">
    <h1 class="modal-title fs-5" id="exampleModalLabel">Create House</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>

  <form @submit.prevent="handleSubmit()">


    <div class="modal-body">
      <div class="col-6 col-md-4">
        <label for="year" class="form-label">Year Built</label>
        <input type="number" id="year" name="year" class="form-control" placeholder="ex. 1995" v-model="editable.year"
          min="0" max="5000" required>
      </div>
      <div class="col-md-4">
        <label for="bedrooms" class="form-label">Bedrooms</label>
        <input type="number" id="bedrooms" name="bedrooms" class="form-control" v-model="editable.bedrooms"
          placeholder="# of Bed" min="0" max="50" required>
      </div>
      <div class="col-md-4">
        <label for="bathrooms" class="form-label">Bathrooms</label>
        <input type="number" id="bathrooms" name="bathrooms" class="form-control" v-model="editable.bathrooms"
          placeholder="# of Bath" min="0" max="50" required>
      </div>
      <div class="col-md-6">
        <label for="levels" class="form-label">Levels</label>
        <input type="number" id="levels" name="levels" class="form-control" min="0" max="200" v-model="editable.levels"
          placeholder="levels" required>
      </div>
      <div class="col-md-6">
        <label for="price" class="form-label">Price</label>
        <input type="number" id="price" name="price" class="form-control" min="0" max="50000000" v-model="editable.price"
          placeholder="ex: 500000" required>
      </div>
      <div class="col-12">
        <label for="description" class="form-label">Description</label>
        <input type="text" id="description" name="description" class="form-control" v-model="editable.description"
          maxlength="100" placeholder="Describe your house">
      </div>
      <div class="col-12">
        <label for="imgUrl" class="form-label">Image URL</label>
        <input type="url" id="imgUrl" name="imgUrl" class="form-control" maxlength="300" v-model="editable.imgUrl"
          placeholder="Image URL here">
      </div>
    </div>


    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="Submit" class="btn btn-primary">{{ house.id ? 'edit House' : 'Create House' }}</button>
    </div>

  </form>
</template>


<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { House } from "../models/House.js";
import { housesService } from "../services/HousesService.js";
import { router } from "../router.js";

export default {
  props: {
    house: {
      type: Object,
      default: {}
    }

  },
  // NOTE if using props in return, must push through as parameter
  setup(props) {
    const editable = ref({ ...props.house })

    const router = useRouter()
    return {
      editable,
      async createHouse() {
        try {
          // debugger
          const houseData = editable.value
          logger.log('[create house House form]', houseData)
          const house = await housesService.createHouse(houseData)

          // NOTE router.push will take you to another page after function completes
          router.push({ name: 'HouseDetails', params: { houseId: house.id } })
        } catch (error) {
          logger.log(error)
          Pop.error(error.message)
        }
      },

      async editHouse() {
        try {
          const houseData = editable.value
          await housesService.editHouse(houseData)
        } catch (error) {
          logger.log(error)
          Pop.error(error.message)
        }
      },
      handleSubmit() {
        if (props.house.id) {
          this.editHouse()
        } else {
          this.createHouse()
        }
      },
    }
  }
}
</script>


<style lang="scss" scoped></style>