<template>
  <div class="modal-header">
    <h1 class="modal-title fs-5" id="exampleModalLabel">Create Car</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>

  <form @submit.prevent="handleSubmit()">

    <div class="modal-body">
      <div class="mb-3">
        <label for="make" class="form-label">Make</label>
        <input v-model="editable.make" type="text" required class="form-control" id="make">
      </div>
      <div class="mb-3">
        <label for="model" class="form-label">Model</label>
        <input v-model="editable.model" type="text" required class="form-control" id="model">
      </div>
      <div class="mb-3">
        <label for="year" class="form-label">Year</label>
        <input v-model="editable.year" type="number" min="1980" required class="form-control" id="year">
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">Price</label>
        <input v-model="editable.price" type="number" min="5" required class="form-control" id="price">
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <input v-model="editable.description" type="text" required class="form-control" id="description">
      </div>
      <div class="mb-3">
        <label for="imgUrl" class="form-label">ImgUrl</label>
        <input v-model="editable.imgUrl" type="url" required class="form-control" id="imgUrl">
      </div>
      <select v-model="editable.engineType" required class="form-select form-select-lg mb-3"
        aria-label=".form-select-lg example">
        <option v-for="engineType in engineTypes" :key="engineType" :value="engineType">{{ engineType }}</option>
      </select>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="Submit" class="btn btn-primary" data-bs-dismiss="modal">
        {{ car.id ? 'Edit Car' : 'Create Car' }}
      </button>
    </div>

  </form>
</template>


<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Car } from '../models/Car.js';
import { carsService } from '../services/CarsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  props: {
    car: {
      type: Car,
      required: true
    }
  },
  setup(props) {
    const editable = ref({ ...props.car })

    // NOTE router allows us to manually change the route
    const router = useRouter()

    return {
      editable,
      engineTypes: [
        "unknown",
        "2 stroke",
        "4 cylinder",
        "v6",
        "v8",
        "v10",
        "v12",
        "small",
        "medium",
        "large",
        "chuncko"
      ],

      async createCar() {
        try {
          const carData = editable.value
          const car = await carsService.createCar(carData)
          router.push({ name: 'CarDetails', params: { carId: car.id } })
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },

      async editCar() {
        try {
          const carData = editable.value
          await carsService.editCar(carData)
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },

      handleSubmit() {
        if (props.car.id) {
          this.editCar()
        }
        else {
          this.createCar()
        }
      },
    }
  }
}
</script>


<style lang="scss" scoped></style>