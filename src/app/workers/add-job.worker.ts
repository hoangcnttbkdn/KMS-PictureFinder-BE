import { handleQueue } from '../../shared/configs/worker.config'
import { WorkerData } from '../typings'

export const addJob = async (data: WorkerData) => {
  await handleQueue.add(data)
}
