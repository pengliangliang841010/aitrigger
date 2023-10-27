import { NextPage } from 'next'
import React, { useEffect, useState, } from 'react'
import ProfileStyles from '../styles/Profile.module.scss'
import { Skeleton } from 'antd/lib'
import Image from 'next/image'
import useLogin from '../hooks/useLogin'
import { useRouter } from 'next/router'
import { messageCus } from '../helper'
import { get } from 'lodash'
import http from '../utils/axios'
import useVip from '../hooks/useVip'
import Link from 'next/link'
import API from '../api.config'
import { User } from 'firebase/auth'

const Profile: NextPage = () => {

    const { loginInfo, loginOut } = useLogin()

    const router = useRouter()

    const [subscribeLoading, setSubscribeLoading] = useState<boolean>(false)

    const { isVip, loading } = useVip()

    const handleLogout = () => {
        loginOut().then(() => {
            router.push('/login')
        })
    }

    const handleUnsubscribe=()=>{

        if(subscribeLoading){
            return
        }

        setSubscribeLoading(true)

        API.createPortalSession({
            user_id: (loginInfo as User).uid,
            return_url: location.origin + "/profile"
        }).then(res => {
            const { url } = res.data
            if (url) {
                const a = document.createElement('a')
                a.setAttribute('href', url)
                document.body.appendChild(a)
                a.click()
            }
        }).catch((error) => {
            if (error instanceof Error) {
                messageCus.error(error.name + ":" + error.message);
            }
        }).finally(() => {
            setSubscribeLoading(false)
        })
    }

    useEffect(() => {
        if (loginInfo === 'loginOut') {
            messageCus.error('please login in!')
            router.push('/login')
        }
    }, [loginInfo])

    // const toCreateBtn = <div className={`${ProfileStyles.toSubcribeBtn} ${ProfileStyles.mt10}`}><Link href="/create">go to create</Link></div>


    return <div className={ProfileStyles.wrap}>
        <div className={ProfileStyles.width1280}>
            <div className={ProfileStyles.innerWrap}>
                <div className={ProfileStyles.info}>
                    <div className={ProfileStyles.vipInfo}>

                        <div className={ProfileStyles.optWrap}>
                            <div className={ProfileStyles.optItemTitle}>Hi! <span>{get(loginInfo, 'email', '')}</span></div>
                            {loading && <div className={ProfileStyles.sketchWrap}><Skeleton /></div>}
                            {!loading && <>
                                {!isVip && <div className={ProfileStyles.optItem}><span className={ProfileStyles.itemStrong}><Link href="/subcribe">Get Pro Mode</Link></span></div>}
                                {isVip && <>
                                    <div className={ProfileStyles.optItem} onClick={handleUnsubscribe}>
                                        Unsubscribe
                                    </div>
                                    <Link href="/findPassword">
                                        <div className={ProfileStyles.optItem}>
                                            Change Password
                                        </div>
                                    </Link>
                                    <div className={ProfileStyles.optItem} onClick={handleLogout}>
                                        Sign Out
                                    </div>
                                </>}
                            </>}
                        </div>
                    </div>

                </div>
                {/* <Row gutter={[{ xs: 8, sm: 16, md: 24 }, { xs: 8, sm: 16, md: 24 }]}>

                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(item =>
                    <Col key={item} xs={24} sm={12} md={8} lg={6}>
                        
                        <div className={ProfileStyles.imgWrap}><Image
                            key={item}
                            objectFit='contain'
                            layout="fill"
                            src="/banner1.webp" alt="load failed">

                        </Image>
                        </div>
                        </Col>)}

            </Row> */}
            </div>
        </div>
    </div>
}

export default Profile