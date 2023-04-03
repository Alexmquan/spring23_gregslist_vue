<template>
  <div class="modal-header">
    <h1 class="modal-title fs-5" id="exampleModalLabel">Create Job</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>

  <form @submit.prevent="handleSubmit()">
    <div class="modal-body">
      <div class="col-6 col-md-4">
        <label for="company" class="form-label">Company Name</label>
        <input type="text" id="company" name="company" class="form-control" v-model="editable.company" maxlength="50"
          required>
      </div>
      <div class="col-md-4">
        <label for="jobTitle" class="form-label">Job Title</label>
        <input type="text" id="jobTitle" name="jobTitle" class="form-control" v-model="editable.jobTitle" maxlength="50"
          required>
      </div>
      <div class="col-md-4">
        <label for="hours" class="form-label">Hours</label>
        <input type="number" id="hours" name="hours" class="form-control" v-model="editable.hours" min="0" required>
      </div>
      <div class="col-md-6">
        <label for="rate" class="form-label">Hourly Rate</label>
        <input type="number" id="rate" name="rate" class="form-control" min="0" v-model="editable.rate" placeholder="rate"
          required>
      </div>
      <div class="col-md-6">
        <label for="description" class="form-label">Job Description</label>
        <input type="text" id="description" name="description" class="form-control" maxlength="200"
          v-model="editable.description" required>
      </div>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="Submit" class="btn btn-primary">
        {{ job.id ? 'edit Job' : 'Create job' }}
      </button>
    </div>
  </form>
</template>


<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { jobsService } from "../services/JobsService.js";
import { Job } from "../models/Job.js";

export default {
  props: {
    job: {
      type: Job,
      default: {}
    }
  },

  setup(props) {
    const editable = ref({ ...props.job })
    const router = useRouter()
    return {
      editable,

      async createJob() {
        try {
          const jobData = editable.value
          const job = await jobsService.createJob(jobData)
          router.push({ name: 'JobDetails', params: { jobId: job.id } })
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },
      async editJob() {
        try {
          const jobData = editable.value
          await jobsService.editJob(jobData)
        } catch (error) {
          logger.log(error)
          Pop.error(error.message)
        }
      },
      handleSubmit() {
        // debugger
        console.log('[you know]', editable.value)
        if (props.job.id) {
          this.editJob()
        } else {
          this.createJob()
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>