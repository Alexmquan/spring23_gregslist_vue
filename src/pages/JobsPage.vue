<template>
  <div class="container-fluid">
    <!-- NOTE this V-if only allows you to see the button if you are logged into an account -->

    <div v-if="account.id" class="row my-3">
      <div class="col-12">
        <button data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-outline-danger">Add Job</button>
      </div>
    </div>
    <div class="row">
      <div v-for="job in jobs" :key="job.id" class="col-12 col-md-4">
        <JobCard :job="job" />
      </div>
    </div>
  </div>
  <ModalComponent>
    <JobForm :job="job" />
  </ModalComponent>
</template>


<script>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import JobCard from "../components/JobCard.vue";
import JobForm from "../components/JobForm.vue";
import ModalComponent from "../components/ModalComponent.vue";
import { jobsService } from "../services/JobsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    async function getAllJobs() {
      try {
        await jobsService.getAllJobs();
      }
      catch (error) {
        logger.error(error);
        Pop.error(error.message);
      }
    }
    onMounted(() => {
      getAllJobs();
    });
    return {
      jobs: computed(() => AppState.jobs),
      account: computed(() => AppState.account)
    };
  },
  components: { JobCard, ModalComponent, JobForm }
}
</script>


<style lang="scss" scoped></style>