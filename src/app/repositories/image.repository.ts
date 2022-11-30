import { Repository } from 'typeorm'
import dataSource from '../../shared/configs/data-source.config'
import { Image } from '../entities'

export class ImageRepository extends Repository<Image> {
  constructor() {
    super(Image, dataSource.manager)
  }
}
