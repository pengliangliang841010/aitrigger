import { get } from 'lodash';
import { addUser, getUser, updateUserlastLoginAt, updateUservipTime } from '../../DynamoDB/userApi';
import { handlerWrapper } from '../../handleWrapper';
import dayjs from 'dayjs'


export default handlerWrapper({
  GET: async function handler(req) {
    const { id } = req.query;
    const result = await getUser(id as string)
    const vipTime = get(result,'Item.vipTime.S','')
    return {
      message: 'success',
      data: {
        result,
        vipTime:vipTime?dayjs(Number(vipTime)).format('YYYY-MM-DD HH:mm:ss'):'',
        isVip:vipTime?dayjs().isBefore(dayjs(Number(vipTime))):false
      }
    };
  },
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
    const { id, vipTime } = req.body
    if (vipTime) {
      await updateUservipTime({ ...req.body })
    } else {
      // 连带第三方的登录
      await updateUserlastLoginAt({ ...req.body })
    }
    return {
      message: 'success'
    };
  }

});