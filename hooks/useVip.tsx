import { get } from "lodash"
import { useEffect, useState } from "react"
import useLogin from "./useLogin"
import API from '../api.config'
import { User } from "firebase/auth"
import { IPriceId, IStatus } from "../interfaces/stripe"
import { AxiosResponse } from "axios"

export default () => {

    const { loginInfo } = useLogin()

    const [isVip, setVip] = useState<boolean>(false) // 用来粗略控制vip状态

    const [price, setPrice] = useState<IPriceId[]>([])

    const [loading,setLoading]=useState<boolean>() // 3个状态，true false undefined。当loading=false，此时vip状态是很精确的

    useEffect(() => {
        (async () => {
            if (typeof (loginInfo) === "object") {
                const uid = get(loginInfo, 'uid')
                let priceArr: IPriceId[] = [];
                if (uid) {

                    if(loading){
                        return
                    }
                    setLoading(true)

                    try{

                        if (price && price.length) {
                            priceArr = price
                        } else {
                            const r = await API.getAllProducts()
    
                            Object.values(r.data).forEach(item => {
                                priceArr = priceArr.concat(item.prices)
                            }
                            )
                            setPrice(priceArr)
                        }
                        const resAll = await Promise.all(priceArr.map((item: IPriceId) => API.checkUserSubscriptionStatus({
                            user_id: (loginInfo as User).uid,
                            price_id: item.id,
                        }).catch(
                            error => {
                                if (error instanceof Error) {
                                    console.error(error.name + ":" + error.message);
                                }
                            }
                        ))) as (AxiosResponse<IStatus, IStatus> | undefined)[]
                        const already = resAll.some((item: AxiosResponse<IStatus, IStatus> | undefined) =>
                            get(item, 'data.status') === "true"
                        )
                        if (already) {
                            setVip(true)
                        }
                    }catch(error){
                        if (error instanceof Error) {
                            console.error(error.name + ":" + error.message);
                        }
                    }finally{
                        setLoading(false)
                    }

                }else{
                    setLoading(false)
                }
            }else{
                setLoading(false)
            }
        })()
    }, [loginInfo])

    return {
        isVip, setVip,loading,setLoading
    }
}