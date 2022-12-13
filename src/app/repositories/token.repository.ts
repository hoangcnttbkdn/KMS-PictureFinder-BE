import { Repository } from 'typeorm'
import dataSource from '../../shared/configs/data-source.config'
import { Token } from '../entities'
import { UpdateTokenDto } from '../dtos'

export class TokenRepository extends Repository<Token> {
  constructor() {
    super(Token, dataSource.manager)
  }

  public updateToken = (id: number, data: UpdateTokenDto) => {
    return this.createQueryBuilder()
      .update()
      .set({ ...data })
      .where('id = :id')
      .setParameters({ id })
      .execute()
  }
}
