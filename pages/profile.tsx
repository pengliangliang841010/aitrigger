import { NextPage } from 'next'
import React, { useEffect, } from 'react'
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

const Profile: NextPage = () => {

    const { loginInfo } = useLogin()

    const router = useRouter()
    const { isVip, loading } = useVip()

    useEffect(() => {
        if (loginInfo === 'loginOut') {
            messageCus.error('please login in!')
            router.push('/login')
        }
    }, [loginInfo])

    const toSubcribeBtn = <span className={ProfileStyles.toSubcribeBtn}><Link href="/subcribe">Get Pro Mode</Link></span>

    const toCreateBtn = <div className={`${ProfileStyles.toSubcribeBtn} ${ProfileStyles.mt10}`}><Link href="/create">go to create</Link></div>


    return <div className={ProfileStyles.wrap}>
        <div className={ProfileStyles.width1280}>
            <div className={ProfileStyles.innerWrap}>
                <div className={ProfileStyles.info}>
                    Hi! <span>{get(loginInfo, 'email', '')}</span>
                    {loading && <div className={ProfileStyles.vipInfo}><Skeleton active /></div>}
                    {!loading && <div className={ProfileStyles.vipInfo}>
                        {!isVip && toSubcribeBtn}
                        {isVip && <div>You have obtained the Pro version<br />{toCreateBtn}</div>}
                    </div>}
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