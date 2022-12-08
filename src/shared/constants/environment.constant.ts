export const environment = {
  env: process.env.NODE_ENV,
  port: +(process.env.APP_PORT ?? 0),
  database: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
  },
  formSizeLimit: +(process.env.FORM_SIZE_LIMIT || 2) * 1024 * 1024,
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
    bucket: process.env.AWS_BUCKET,
  },
}
