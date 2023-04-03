import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"
import { Job } from "../models/Job.js"

class JobsService {
  async getAllJobs() {
    const res = await api.get('auth/api/jobs')
    AppState.jobs = res.data.map(j => new Job(j))
  }

  async createJob(jobData) {
    const res = await api.post('/auth/api/jobs', jobData)
    const job = new Job(res.data)
    AppState.jobs.push(job)
    return job
  }


}



export const jobsService = new JobsService()