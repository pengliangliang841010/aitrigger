import { Button } from "antd/lib"
import { NextPage } from "next"
import React from "react"
import Styles from '../styles/Allow.module.scss'
import { useRouter } from 'next/router'

const Allow: NextPage = () => {

    const router=useRouter()

    return <div className={Styles.wrap}>
        <div className={Styles.inner}>
            <div className={Styles.title}>
                Are you <span>18+?</span>
            </div>
            <div className={Styles.desc}>
                Try the forbidden fruit by clicking 'Accept' in case if you are at least
            </div>
            <div className={Styles.desc}>
                18 years old and agree to our <a href="/terms-of-service.html">Terms of Service</a> and <a href="/privacy-policy.html">Privacy Policy</a>.
            </div>
            <div className={Styles.btnWrap}>
            <Button onClick={()=>{
                try{
                    localStorage.setItem('18+','accept')
                    router.push(`/`)
                }catch(_err){

                }
            }} type="primary" size="large">Accept</Button>
            </div>
        </div>
    </div>
}

export default Allow