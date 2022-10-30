import 'dotenv/config'
import { appProvider, envLoadProvider } from './shared/providers'

envLoadProvider.validate()
// databaseProvider.initialize()
appProvider.listen()
