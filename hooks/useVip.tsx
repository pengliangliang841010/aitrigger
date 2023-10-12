import { get } from "lodash"
import { useEffect, useState } from "react"
import useLogin from "./useLogin"
import http from '../utils/axios'

export default () => {

    const { loginInfo } = useLogin()

    const [isVip, setVip] = useState<boolean>(false)
    const [vipTime, setVipTime] = useState()

    useEffect(() => {
        if (typeof (loginInfo) === "object") {
            const uid = get(loginInfo, 'uid')
            if (uid) {
                http({
                    method: 'get',
                    url: `/api/user?id=${uid}`,
                }).then(res => {
                    const _vipTime = get(res, 'data.data.vipTime')
                    setVipTime(_vipTime)
                    setVip(get(res, 'data.data.isVip'))
                })
            }
        }
    }, [loginInfo])

    return {
        isVip, setVip, vipTime
    }
}