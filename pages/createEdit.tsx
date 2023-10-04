import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import CreateEditStyles from '../styles/CreateEdit.module.scss'
import clsx from 'classnames';
import {  Button } from 'antd/lib';
import Image from 'next/image'
import Loading from '../components/Loading'
import { useIsMobile } from '../hooks/isMobile'
import { ITagItem } from '../interfaces/create';
import { getLocal } from '../utils/localStorage';
import TagsList from '../components/TagsList';

const Profile: NextPage = () => {

    const isMobile = useIsMobile()

    const [imgUrl, setImgUrl] = useState<string>()
    const [imgUrl2, setImgUrl2] = useState<string>()

    const [editTag, setEditTag] = useState<boolean>(false)

    const [creating, setCreating] = useState<boolean>(false)

    const [isVip, setIsVip] = useState<boolean>(true)

    const [formData, setFormData] = useState<ITagItem>()

    const handleCreate = () => {
        if (creating) {
            return
        }
        setCreating(true)
        setImgUrl2(undefined)

        setTimeout(()=>{
            if (isMobile) {
                const rollDom = document.getElementById('imgUrl2')// 获取想要滚动的dom元素
                rollDom && rollDom.scrollIntoView({ block: 'center' })
            }
        },100)

        
        setTimeout(() => {
            setImgUrl2('/banner1.webp')
            setCreating(false)
            setEditTag(false)
        }, 10000)
    }

    useEffect(() => {
        const { imgUrl, formData } = getLocal('temp')
        setImgUrl(imgUrl)
        setFormData(formData)
    }, [])

    return <div className={CreateEditStyles.wrap}>
        <div className={CreateEditStyles.width1280}>
            <div className={CreateEditStyles.innerWrap}>

                    {/* 生成图片区域 */}
                    <div className={clsx(CreateEditStyles.createImgWrap)}>

                        <div className={CreateEditStyles.imgWrap}>
                            {!!imgUrl && <Image src={imgUrl} layout="fill" objectFit='contain' ></Image>}
                        </div>

                        {(!!imgUrl2||creating)&&<><div id='transform' className={CreateEditStyles.transForm}>
                        {isMobile?
                        <svg   viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"  width="32" height="32"><path d="M242.176 581.632L460.8 802.816V99.328a51.2 51.2 0 0 1 102.4 0v703.488l218.624-220.672a51.2 51.2 0 0 1 72.192 0 46.592 46.592 0 0 1 0 68.096l-307.2 310.272a55.296 55.296 0 0 1-74.752 0l-307.2-310.272a46.592 46.592 0 0 1 0-68.096 51.2 51.2 0 0 1 77.312-0.512z" fill="#ec567c"></path></svg>
                        :<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M581.632 781.824L802.816 563.2H99.328a51.2 51.2 0 0 1 0-102.4h703.488l-221.184-218.624a51.2 51.2 0 0 1 0-72.192 46.592 46.592 0 0 1 68.096 0l310.272 307.2a55.296 55.296 0 0 1 0 74.752l-310.272 307.2a46.592 46.592 0 0 1-68.096 0 51.2 51.2 0 0 1 0-77.312z" fill="#ec567c" ></path></svg>}
                        </div>

                        <div id='imgUrl2' className={clsx(`${CreateEditStyles.imgWrap} ${CreateEditStyles.mobileHide}`,{[CreateEditStyles.createImgWrapReady]:!!imgUrl2||creating})}>
                            {(!!imgUrl2) && <Image src={imgUrl2} layout="fill" objectFit='contain' ></Image>}
                            {(!imgUrl2 || creating) && <div className={CreateEditStyles.placeHolder}> generating ...
                                <span>
                                    waiting too long?
                                </span>
                                <br />
                                <Button onClick={() => window.open('/subcribe', '_blank')} type='primary' size='large' ghost> Go Premium </Button>
                                <Loading></Loading></div>}
                        </div></>}

                    </div>

                    {!!imgUrl && <div className={CreateEditStyles.optWrap}>
                        <Button onClick={() => { setEditTag(true) }} type="primary" size="large">编辑tags</Button>
                    </div>}


                {editTag && <div className={CreateEditStyles.block}>
                    <TagsList formData={formData} />
                    {creating && <div className={CreateEditStyles.blockMask}>
                    </div>}
                </div>}

                {editTag&&<div className={CreateEditStyles.btnWrap}>
                    <Button onClick={handleCreate} loading={creating} block size='large' type="primary">Create</Button>
                </div>}

            </div>
        </div>
    </div>
}

export default Profile