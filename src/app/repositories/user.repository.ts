import { Repository } from 'typeorm'
import dataSource from '../../shared/configs/data-source.config'
import { User } from '../entities'

export class UserRepository extends Repository<User> {
  constructor() {
    super(User, dataSource.manager)
  }
}
