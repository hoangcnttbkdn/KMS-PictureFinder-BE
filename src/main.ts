import 'dotenv/config'
import cluster from 'node:cluster'
import {
  appProvider,
  envLoadProvider,
  databaseProvider,
} from './shared/providers'

// if (cluster.isPrimary) {
//   for (let i = 0; i < +(process.env.PROCESS_NUM || 2); i++) {
//     cluster.fork()
//   }
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   cluster.on('exit', (_worker, _code, _signal) => {
//     cluster.fork()
//   })
// } else {
//   envLoadProvider.validate()
//   databaseProvider.initialize()
//   appProvider.listen()
// }
envLoadProvider.validate()
databaseProvider.initialize()
appProvider.listen()
