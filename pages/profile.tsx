import { NextPage } from 'next'
import React, { useEffect } from 'react'
import ProfileStyles from '../styles/Profile.module.scss'
import { Row, Col } from 'antd/lib'
import Image from 'next/image'
import useLogin from '../hooks/useLogin'
import { useRouter } from 'next/router'
import { messageCus } from '../helper'

const Profile: NextPage = () => {

    const {loginInfo}=useLogin()
    const router=useRouter()

    useEffect(()=>{
        if(loginInfo==="loginOut"){
            messageCus.error('please login in!')
            router.push('/login')
        }
    },[loginInfo])

return <div className={ProfileStyles.wrap}>
    <div className={ProfileStyles.width1280}>
        <div className={ProfileStyles.innerWrap}>
            <Row gutter={[{ xs: 8, sm: 16, md: 24 }, { xs: 8, sm: 16, md: 24 }]}>

                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(item =>
                    <Col key={item} xs={24} sm={12} md={8} lg={6}>
                        
                        <div className={ProfileStyles.imgWrap}><Image
                            key={item}
                            objectFit='contain'
                            layout="fill"
                            src="/banner1.webp" alt="加载失败">

                        </Image>
                        </div>
                        </Col>)}

            </Row>
        </div>
    </div>
</div>}

export default Profile