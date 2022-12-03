import { handleQueue } from '../../shared/configs/worker.config'
import { WorkerData } from '../typings'

export const addJob = async (sessionId: number, data: WorkerData) => {
  await handleQueue.add(sessionId.toString(), { ...data })
}
