import { handleQueue } from '../../shared/configs/worker.config'
import { WorkerData } from '../typings'

/* c8 ignore start */
export const addJob = async (data: WorkerData) => {
  await handleQueue.add(data)
}
/* c8 ignore end */
