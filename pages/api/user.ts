import { get } from 'lodash';
import { addUser, getUser, updateUserlastLoginAt, updateUservipTime } from '../../DynamoDB/userApi';
import { handlerWrapper } from '../../handleWrapper';
import dayjs from 'dayjs'


export default handlerWrapper({
  // {id}
  POST: async function handler(req, res) {
    const { id } = req.body
    const result = await getUser(id)
    if (get(result, 'Item.id')) {
      throw new Error('already exits!')
    }
    await addUser({ ...req.body, createdAt: { S: dayjs().valueOf() + "" } })
    return {
      message: 'success'
    };
  },
  // {id} {id,vipTime}
  PUT: async function handler(req, res) {
    const { id,vipTime } = req.body
    if(vipTime){
      await updateUservipTime({ ...req.body})
    }else{
      await updateUserlastLoginAt(id)
    }
    return {
      message: 'success'
    };
  }

});