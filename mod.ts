import { env, mongoose } from "./deps.ts"

export const getMongoDb = (key?: string) => env.str(key ?? "MONGO_DB")
export const getMongoHost = (key?: string) => env.str(key ?? "MONGO_HOST")
export const getMongoPassword = (key?: string) =>
  env.str(key ?? "MONGO_PASSWORD")

type MongoEnvKeys = {
  db?: string
  host?: string
  password?: string
}

export function connectToMongo(db: string, host: string, password: string) {
  mongoose.connect(
    `mongodb://root:${password}@${host}:27017/${db}?authSource=admin`,
  )
}

export function connectToMongoFromEnv(keys: MongoEnvKeys = {}) {
  connectToMongo(
    getMongoPassword(keys.password),
    getMongoHost(keys.host),
    getMongoPassword(keys.db),
  )
}
