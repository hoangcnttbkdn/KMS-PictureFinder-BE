import { S3 } from 'aws-sdk'
import { environment } from '../constants'

export const s3Client = new S3({
  accessKeyId: environment.aws.accessKey,
  secretAccessKey: environment.aws.secretKey,
  region: environment.aws.region,
})
