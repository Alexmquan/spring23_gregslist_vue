<template>
  <router-link :to="{ name: 'JobDetails', params: { jobId: job.id } }">
    <div class="elevation-3 rounded bg-light border border-1 border-dark my-3">
      <div class="text-center p-3">
        <h1>{{ job.title }}</h1>
        <h3>{{ job.company }} | rate: {{ job.rate }}</h3>
        <h5>{{ job.description }}</h5>
      </div>
    </div>

  </router-link>
</template>


<script>
import { Job } from "../models/Job.js";

export default {
  props: {
    job: {
      type: Job,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped></style>
