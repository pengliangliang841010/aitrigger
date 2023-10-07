import { PutItemCommand, DynamoDBClient, BatchGetItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { BatchGetCommand, DynamoDBDocumentClient, GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import dayjs from 'dayjs'

import client from './'

const aitriggerUser="aitrigger_user"

interface IUser{
    id:string;
    email:string;
    createdAt:string;
    lastLoginAt:string;
    vipTime:string;
}

const docClient = DynamoDBDocumentClient.from(client);

export const addUser=async (param:IUser)=>{
    const command = new PutItemCommand({
        TableName: aitriggerUser,
        // For more information about data types,
        // see https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html#HowItWorks.DataTypes and
        // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Programming.LowLevelAPI.html#Programming.LowLevelAPI.DataTypeDescriptors
        Item: {
          id: { S: param.id },
          email:{S:param.email},
          createdAt:{S:dayjs().valueOf()+""}
        },
      });
    
      const response = await client.send(command);
      return response;
}

export const updateUserlastLoginAt=async (id:IUser["id"])=>{
    const command = new UpdateCommand({
        TableName: aitriggerUser,
        Key:{
            id:id
        },
        UpdateExpression: "set lastLoginAt = :lastLoginAt",
    ExpressionAttributeValues: {
      ":lastLoginAt": dayjs().valueOf()+"",
    },
    ReturnValues: "ALL_NEW",
      });
    
      const response = await client.send(command);
      return response;
}

export const updateUservipTime=async (param:IUser)=>{
    const command = new UpdateCommand({
        TableName: aitriggerUser,
        Key:{
            id:param.id
        },
        UpdateExpression: "set vipTime = :vipTime",
    ExpressionAttributeValues: {
      ":vipTime": param.vipTime,
    },
    ReturnValues: "ALL_NEW",
      });
    
      const response = await client.send(command);
      return response;
}