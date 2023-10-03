import {message} from 'antd/lib'

export const messageCus={
    success:(content:string)=>message.success({content,duration:5,className:'cusMessage'}),
    error:(content:string)=>message.error({content,duration:5,className:'cusMessage'}),
    warning:(content:string)=>message.warning({content,duration:5,className:'cusMessage'})
}