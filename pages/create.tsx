import { NextPage } from 'next'
import React, { useRef, useState } from 'react'
import CreateStyles from '../styles/Create.module.scss'
import clsx from 'classnames';
import { Button, Form, Select } from 'antd/lib';
import Image from 'next/image'
import Loading from '../components/Loading'
import { useIsMobile } from '../hooks/isMobile'
import { setLocal } from '../utils/localStorage';
import TagsListCurrent from '../components/TagsListCurrent';
import { useForm } from 'antd/lib/form/Form';
import http from '../utils/axios'
import useVip from '../hooks/useVip';

export const generatorDict = [
    { value: 'women_crisp', label: 'Women: Detailed' },
    { value: 'women_accurate', label: 'Women: Accurate' },
    { value: 'women_real', label: 'Women: Realistic' },
    { value: 'women', label: 'Women: Legacy' },
    { value: 'women_hd', label: 'Women: HD (SDXL)' },
    { value: 'women_intricate', label: 'Women: Intricate (SDXL)' },
    { value: 'anime', label: 'Anime: Base' },
    { value: 'anime_detailed', label: 'Anime: Detailed' },
    { value: 'men', label: 'Men: Base' },
    { value: 'men_detailed', label: 'Men: Base' },
    { value: 'doggystyle', label: 'Doggystyle' },
    { value: 'blowjob', label: 'Blowjob' },
    { value: 'missionary', label: 'Missionary' },
    { value: 'titfuck', label: 'Titfuck' },
]

export const ratioDict = [
    { value: '3:4', label: '3:4' },
    { value: '9:16', label: '9:16' },
    { value: '1:1', label: '1:1' },
    { value: '4:3', label: '4:3' },
    { value: '16:9', label: '16:9' },
]


const Profile: NextPage = () => {

    const isMobile = useIsMobile()

    const { isVip } = useVip()

    const [imgUrl, setImgUrl] = useState<string>()

    const [creating, setCreating] = useState<boolean>(false)

    const tagList = useRef()

    const [form] = useForm()

    const handleCreate = () => {
        if (creating) {
            return
        }
        setCreating(true)
        setImgUrl(undefined)

        const formData = form.getFieldsValue()

        const data = {
            ...formData,
            isPrivate: false,
            prompt: (tagList.current as any)?.tagsMap,
        }

        // http({
        //     method: 'post',
        //     url: '/api/create',
        //     data: {data}
        //   })
        http.post('https://us-central1-dreampen-2273f.cloudfunctions.net/submitPromptAuth', { "data": { "prompt": { "BASE": [], "TAGS": [], "ENVIRONMENT": [], "STYLE": [], "VIEW": [], "CLOTHING": [], "NUMBER": [], "AGE": [], "FACE": [], "ACTION": [], "TITFUCK_VIEW": [], "TITFUCK_TAGS": [], "TITFUCK_POSE": [], "ANIME_ACTION": [], "ANIME_SUBJECT": [], "ANIME_TAGS": [], "ANIME_STYLE": [], "MEN_TAGS": [], "MEN_BASE": [], "NEGATIVE": [], "CHARACTER": [] }, "generator": "women_crisp", "isPrivate": false, "aspectRatio": "1:1" } }).then(function (response) {
            console.log(response);
        })

        setTimeout(() => {
            // if (isMobile) {
            const rollDom = document.getElementById('imgWrap')// 获取想要滚动的dom元素
            rollDom && rollDom.scrollIntoView({ block: 'center' })
            // }
        }, 100)

        setTimeout(() => {
            setImgUrl('/banner1.webp')
            setCreating(false)
        }, 5000)
    }

    const saveToProfile = () => {
        if (!isVip) {
            return
        }
     }

    const handleEditImg = () => {
        if (!isVip) {
            return
        }
        // 图片信息和tagsMap暂时存本地把
        setLocal('temp', {
            imgUrl,
            tagsMap: (tagList.current as any)?.tagsMap
        })
        window.open('/createEdit')
    }

    const handleDownload = () => {
        if (!isVip) {
            return
        }
        const a = document.createElement('a')
        a.href = imgUrl as string
        a.download = 'default.png'
        a.dispatchEvent(new MouseEvent('click'))
    }

    return <div className={CreateStyles.wrap}>
        <div className={CreateStyles.width1280}>
            <div className={CreateStyles.innerWrap}>

                <div className={CreateStyles.info} id="info">
                    <h1>Generate your favorite</h1>
                    <p>To generate an image, please select your label and click Generate ↓</p>
                </div>

                <div className={CreateStyles.pcSuit}>
                    {/* 生成图片区域 */}
                    <div className={clsx(CreateStyles.createImgWrap, { [CreateStyles.createImgWrapReady]: !!imgUrl || creating })}>

                        <div id="imgWrap" className={CreateStyles.imgWrap}>
                            {!!imgUrl && <Image src={imgUrl} layout="fill" objectFit='contain' ></Image>}
                            {(!imgUrl && !creating) && <div className={CreateStyles.placeHolder}> Choose tags to generate images here</div>}
                            {(!imgUrl && creating) && <div className={CreateStyles.placeHolder}> generating ...<br/>
                                {isVip?<span>You are VIP, we will accelerate the generation for you</span>:<><span>
                                    waiting too long?
                                </span>
                                <br />
                                <Button onClick={() => window.open('/subcribe', '_blank')} type='primary' size='large' ghost> Go Premium </Button></>}
                                <Loading></Loading></div>}
                        </div>

                        {!!imgUrl && <div className={CreateStyles.editWrap}>
                            <div className={CreateStyles.editItem}>
                                <div className={clsx(CreateStyles.editWrapLeft, { [CreateStyles.pointer]: isVip })} onClick={() => saveToProfile()}>
                                    <span className={CreateStyles.editWrapLeftSvg}>
                                        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M925.248 356.928l-258.176-258.176a64 64 0 0 0-45.248-18.752H144a64 64 0 0 0-64 64v736a64 64 0 0 0 64 64h736a64 64 0 0 0 64-64V402.176a64 64 0 0 0-18.752-45.248zM288 144h192V256H288V144z m448 736H288V736h448v144z m144 0H800V704a32 32 0 0 0-32-32H256a32 32 0 0 0-32 32v176H144v-736H224V288a32 32 0 0 0 32 32h256a32 32 0 0 0 32-32V144h77.824l258.176 258.176V880z" fill="#ffffff"></path></svg>
                                    </span>
                                    save
                                </div>
                                <div className={CreateStyles.editWrapRight}>{isVip ? "Save photos to your library" : <><span onClick={() => { window.open('/subcribe', '_blank') }}>Subscribe</span> to access this feature</>}</div>
                            </div>
                            <div className={CreateStyles.editItem}>
                                <div onClick={() => handleEditImg()} className={clsx(CreateStyles.editWrapLeft, { [CreateStyles.pointer]: isVip })}>
                                    <span className={CreateStyles.editWrapLeftSvg}>
                                        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M775.84 392.768l-155.2-172.352L160.768 643.264l-38.368 187.936 190.56-12.832zM929.952 229.952l-131.2-150.944-0.288-0.32a16 16 0 0 0-22.592-0.96l-131.168 120.576 155.168 172.352 128.832-118.464a15.936 15.936 0 0 0 1.248-22.24zM96 896h832v64H96z" fill="#ffffff"></path></svg>    </span>
                                    edit
                                </div>
                                <div className={CreateStyles.editWrapRight}>{isVip ? "Edit this photo online" : <><span onClick={() => { window.open('/subcribe', '_blank') }}>Subscribe</span> to access this feature</>}</div>
                            </div>
                            <div className={CreateStyles.editItem}>
                                <div onClick={() => handleDownload()} className={clsx(CreateStyles.editWrapLeft, { [CreateStyles.pointer]: isVip })}>
                                    <span className={CreateStyles.editWrapLeftSvg}>
                                        <svg fill="#ffffff" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M808.192 246.528a320.16 320.16 0 0 0-592.352 0A238.592 238.592 0 0 0 32 479.936c0 132.352 107.648 240 240 240h91.488a32 32 0 1 0 0-64H272a176.192 176.192 0 0 1-176-176 175.04 175.04 0 0 1 148.48-173.888l19.04-2.976 6.24-18.24C305.248 181.408 402.592 111.936 512 111.936a256 256 0 0 1 242.208 172.896l6.272 18.24 19.04 2.976A175.04 175.04 0 0 1 928 479.936c0 97.024-78.976 176-176 176h-97.28a32 32 0 1 0 0 64h97.28c132.352 0 240-107.648 240-240a238.592 238.592 0 0 0-183.808-233.408z" ></path><path d="M649.792 789.888L544 876.48V447.936a32 32 0 0 0-64 0V876.48l-106.752-87.424a31.968 31.968 0 1 0-40.544 49.504l159.04 130.24a32 32 0 0 0 40.576 0l158.048-129.44a32 32 0 1 0-40.576-49.472z" ></path></svg>
                                    </span>
                                    download
                                </div>
                                <div className={CreateStyles.editWrapRight}>{isVip ? "Download this photo to your device" : <><span onClick={() => window.open('/subcribe', '_blank')}>Subscribe</span> to access this feature</>}</div>
                            </div>
                        </div>}
                    </div>

                    <div className={CreateStyles.block}>
                        <div>
                            <Form layout='vertical' form={form}>
                                <Form.Item initialValue='women_crisp' label="Generator" name="generator">
                                    <Select options={generatorDict} size='large' />
                                </Form.Item>
                                <Form.Item initialValue="1:1" label="Ratio" name="aspectRatio">
                                    <Select options={ratioDict} size="large" />
                                </Form.Item>
                            </Form>
                        </div>
                        <TagsListCurrent ref={tagList} />
                        {creating && <div className={CreateStyles.blockMask}>
                        </div>}
                    </div>
                </div>

                <div className={CreateStyles.btnWrap}>
                    <Button onClick={handleCreate} loading={creating} block size='large' type="primary">Create</Button>
                </div>

            </div>
        </div>
    </div>
}

export default Profile
