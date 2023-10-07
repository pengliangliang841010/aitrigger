import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import config from '../api.config'

export default new DynamoDBClient({ region: config.credentials.region, credentials: config.credentials });