import { Repository } from 'typeorm'
import dataSource from '../../shared/configs/data-source.config'
import { Session } from '../entities'

export class SessionRepository extends Repository<Session> {
  constructor() {
    super(Session, dataSource.manager)
  }
}
