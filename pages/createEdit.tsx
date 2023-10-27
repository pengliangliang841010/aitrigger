import { NextPage } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import CreateEditStyles from '../styles/CreateEdit.module.scss'
import clsx from 'classnames';
import { Button } from 'antd/lib';
import ImageNx from 'next/image'
import Loading from '../components/Loading'
import { useIsMobile } from '../hooks/isMobile'
import { getLocal } from '../utils/localStorage';
import { IOption, ITagItemCurrent } from '../interfaces/createCurrent';
import TagsListCurrent from '../components/TagsListCurrent';
import useVip from '../hooks/useVip';
import { polling, randomString } from '../utils';
import API from '../api.config'
import { get } from 'lodash';
import { messageCus } from '../helper';

const Profile: NextPage = () => {

    const isMobile = useIsMobile()

    const [imgUrl, setImgUrl] = useState<string>()
    const [imgUrl2, setImgUrl2] = useState<string>()

    const [editTag, setEditTag] = useState<boolean>(false)

    const [creating, setCreating] = useState<boolean>(false)

    const { isVip, loading } = useVip()

    const [tagsMap, setTagsMap] = useState<ITagItemCurrent>()

    const tagList = useRef<ITagItemCurrent>()

    const [formData, setFormData] = useState()

    const jobId = useRef<string>()

    const commonBack = () => {
        setCreating(false)
        setEditTag(false)
    }

    const handleCreate = async () => {

        if (!isVip) {
            return
        }

        if (creating) {
            return
        }
        setCreating(true)
        setImgUrl2(undefined)

        setTimeout(() => {
            // if (isMobile) {
            const rollDom = document.getElementById('imgUrl2')// 获取想要滚动的dom元素
            rollDom && rollDom.scrollIntoView({ block: 'center' })
            // }
        }, 100)

        try {



            jobId.current = randomString()

            // api改版直接变动下

            const labels: string[] = [];

            const tagsArr = Object.values(tagList.current?.tagsMap || {})

            if (tagsArr.length) {
                (tagsArr as unknown as IOption[][]).forEach((item: IOption[]) => {
                    item.forEach(one => {
                        labels.push(one.label)
                    })
                })
            }

            const data = {
                job_id: jobId.current,
                ...formData || {},
                labels,
            }

            const result = await API.submitPornGenJob(data)

            if (get(result, 'data.status') !== "true") {
                throw new Error('error')
            }

            const { start } = polling((stop) => API.checkPornGenJob({ job_id: jobId.current }).then(res => {
                const url = get(res, 'data.img_url')
                if (url) {
                    const imageOne = new Image();
                    imageOne.src = url
                    imageOne.onload = function () {
                        setImgUrl2(url)
                        commonBack()
                    }
                    imageOne.onerror = function () {
                        setCreating(false)
                    }
                    stop(true)
                }
            }), () => {
                commonBack()
            })

            await start()

        } catch (err) {
            messageCus.error('error,please try again!')
            setCreating(false)
        }

    }

    useEffect(() => {
        const { imgUrl, tagsMap, formData } = getLocal('temp')
        setImgUrl(imgUrl)
        setTagsMap(tagsMap)
        setFormData(formData)
    }, [])

    return <div className={CreateEditStyles.wrap}>
        <div className={CreateEditStyles.width1280}>
            <div className={CreateEditStyles.innerWrap}>

                {/* 生成图片区域 */}
                <div className={clsx(CreateEditStyles.createImgWrap)}>

                    <div className={CreateEditStyles.imgWrap}>
                        {!!imgUrl && <ImageNx src={imgUrl} layout="fill" objectFit='contain' ></ImageNx>}
                    </div>

                    {(!!imgUrl2 || creating) && <><div id='transform' className={CreateEditStyles.transForm}>
                        {isMobile ?
                            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M242.176 581.632L460.8 802.816V99.328a51.2 51.2 0 0 1 102.4 0v703.488l218.624-220.672a51.2 51.2 0 0 1 72.192 0 46.592 46.592 0 0 1 0 68.096l-307.2 310.272a55.296 55.296 0 0 1-74.752 0l-307.2-310.272a46.592 46.592 0 0 1 0-68.096 51.2 51.2 0 0 1 77.312-0.512z" fill="#ec567c"></path></svg>
                            : <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M581.632 781.824L802.816 563.2H99.328a51.2 51.2 0 0 1 0-102.4h703.488l-221.184-218.624a51.2 51.2 0 0 1 0-72.192 46.592 46.592 0 0 1 68.096 0l310.272 307.2a55.296 55.296 0 0 1 0 74.752l-310.272 307.2a46.592 46.592 0 0 1-68.096 0 51.2 51.2 0 0 1 0-77.312z" fill="#ec567c" ></path></svg>}
                    </div>

                        <div id='imgUrl2' className={clsx(`${CreateEditStyles.imgWrap} ${CreateEditStyles.mobileHide}`, { [CreateEditStyles.createImgWrapReady]: !!imgUrl2 || creating })}>
                            {(!!imgUrl2) && <ImageNx src={imgUrl2} layout="fill" objectFit='contain' ></ImageNx>}
                            {(!imgUrl2 && creating) && <div className={clsx(CreateEditStyles.placeHolder, { [CreateEditStyles.placeHolderVip]: isVip })}> Generating <br />
                                {isVip ? <span className={CreateEditStyles.vipCreateTips}>Less than 30s<span className={CreateEditStyles.dot}>...</span><br />Fast Pass + Higher Quality</span> : <><span>
                                    More than 1mins<span className={CreateEditStyles.dot}>...</span><br />
                                    waiting too long?
                                </span>
                                    <br />
                                    <Button onClick={() => window.open('/subcribe', '_blank')} type='primary' size='large' ghost> Go Premium </Button></>}
                            </div>}
                        </div></>}

                </div>

                {!!imgUrl && <div className={CreateEditStyles.optWrap}>
                    <Button onClick={() => { setEditTag(true) }} type="primary" size="large">Edit tags</Button>
                </div>}


                <div className={clsx(CreateEditStyles.block, { [CreateEditStyles.hide]: !editTag })}>
                    <TagsListCurrent ref={tagList} formData={tagsMap} />
                    {creating && <div className={CreateEditStyles.blockMask}>
                    </div>}
                </div>

                {editTag && loading === false && <div className={CreateEditStyles.btnWrap}>
                    <Button onClick={handleCreate} loading={creating} block size='large' type="primary">Create</Button>
                </div>}

            </div>
        </div>
    </div>
}

export default Profile