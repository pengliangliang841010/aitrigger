import { NextPage } from 'next'
import React, { useRef, useState } from 'react'
import CreateStyles from '../styles/Create.module.scss'
import clsx from 'classnames';
import { Button, Form, Select } from 'antd/lib';
import ImageNx from 'next/image'
import Loading from '../components/Loading'
import { useIsMobile } from '../hooks/isMobile'
import { getLocal, setLocal } from '../utils/localStorage';
import TagsListCurrent from '../components/TagsListCurrent';
import { useForm } from 'antd/lib/form/Form';
import API from '../api.config'
import { useRouter } from 'next/router'
import useVip from '../hooks/useVip';
import { downloadImg, polling, randomString } from '../utils';
import { cloneDeep, get } from 'lodash';
import { messageCus } from '../helper';
import { IOption, ITagItemCurrent } from '../interfaces/createCurrent';
import useLogin from '../hooks/useLogin';
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import logEvent from '../utils/logEvent'

// Initialize an agent at application startup.
const fpPromise = FingerprintJS.load()

const freeMode = ['Women: Detailed', 'Women: Realistic', 'Anime: Base', 'Men: Base']

const clockIcon = <span className={CreateStyles.clock}>
    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M753.845117 371.674021l-17.46272 0 0-83.669608c0-59.275012-22.62837-115.203812-63.715137-157.482731-42.170448-43.394323-99.369172-67.291592-161.058163-67.291592-126.040624 0-224.772276 98.731652-224.772276 224.7733l0 83.669608-16.680914 0c-62.788022 0-113.688295 50.900274-113.688295 113.688295L156.467611 842.961784c0 62.788022 50.900274 113.688295 113.688295 113.688295l483.690234 0c62.788022 0 113.688295-50.900274 113.688295-113.688295L867.534436 485.362316C867.532389 422.574295 816.633139 371.674021 753.845117 371.674021zM328.176344 288.005436c0-102.858646 80.573083-183.432753 183.431729-183.432753 50.423413 0 97.093339 19.447934 131.410935 54.762231 33.547047 34.519188 52.021817 80.214926 52.021817 128.670521l0 83.669608L328.176344 371.675044 328.176344 288.005436zM826.191842 842.961784c0 39.956014-32.390711 72.346725-72.346725 72.346725L270.154883 915.308509c-39.956014 0-72.346725-32.390711-72.346725-72.346725L197.808158 485.362316c0-39.956014 32.390711-72.346725 72.346725-72.346725l483.690234 0c39.956014 0 72.346725 32.390711 72.346725 72.346725L826.191842 842.961784z" fill="#ec567c"></path><path d="M509.932921 580.446905c-11.416004 0-20.670785 9.254781-20.670785 20.670785l0 109.554138c0 11.414981 9.254781 20.670785 20.670785 20.670785 11.416004 0 20.670785-9.254781 20.670785-20.670785L530.603707 601.116667C530.602683 589.701686 521.348925 580.446905 509.932921 580.446905z" fill="#ec567c"></path></svg>
</span>

export const generatorDict: { [x: string]: any } = [
    { value: 'Women: Detailed', label: 'Women: Detailed' },//
    { value: 'Women: Accurate', label: 'Women: Accurate' },
    { value: 'Women: Realistic', label: 'Women: Realistic' },//
    { value: 'Women: Legacy', label: 'Women: Legacy' },
    { value: 'Women: HD (SDXL)', label: 'Women: HD (SDXL)' },
    { value: 'Women: Intricate (SDXL)', label: 'Women: Intricate (SDXL)' },
    { value: 'Anime: Base', label: 'Anime: Base' },//
    { value: 'Anime: Detailed', label: 'Anime: Detailed' },
    { value: 'Men: Base', label: 'Men: Base' },//
    { value: 'Men: Detailed', label: 'Men: Detailed' },
    { value: 'Doggystyle', label: 'Doggystyle' },
    { value: 'Blowjob', label: 'Blowjob' },
    { value: 'Missionary', label: 'Missionary' },
    { value: 'Titfuck', label: 'Titfuck' },
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

    const { isVip, loading } = useVip()

    const [imgUrl, setImgUrl] = useState<string>()

    const [creating, setCreating] = useState<boolean>(false)

    const tagList = useRef<ITagItemCurrent>()

    const jobId = useRef<string>()

    const [form] = useForm()

    const router = useRouter()

    const { loginInfo } = useLogin()

    const isLogin = typeof (loginInfo) === "object"

    const addClock = (str: string) => {
        return <div onClick={() => {
            messageCus.warning('Only pro users have this permission!')
            setTimeout(() => {
                router.push('/subcribe')
            }, 800)
        }} className={CreateStyles.generatorItem}>{str}{clockIcon}</div>
    }

    const handleCreate = async () => {

        logEvent('btn_click',{
            btnName:'create_generate'
        })

        // 先检测是否登录，如果未登录跳转登录，登录但不是vip3次后跳转注册
        if (!isLogin) {
            messageCus.warning('Please logIn first!')
            setTimeout(() => {
                router.push('/login')
            }, 800)
            return
        }

        if (!isVip) {
            // {visitorId:{qwefasdvv:3}}
            const fp = await fpPromise
            const result = await fp.get()
            // console.log(result.visitorId)
            const info = getLocal('visitorId')
            if (get(info, result.visitorId, 0) >= 3) {
                messageCus.warning('Can only try 3 times for free!')
                setTimeout(() => {
                    router.push('/subcribe')
                }, 800)
                return
            } else {
                setLocal('visitorId', { [result.visitorId]: get(info, result.visitorId, 0) + 1 })
            }
        }


        if (creating) {
            return
        }
        setCreating(true)
        setImgUrl(undefined)

        setTimeout(() => {
            // if (isMobile) {
            const rollDom = document.getElementById('imgWrap')// 获取想要滚动的dom元素
            rollDom && rollDom.scrollIntoView({ block: 'center' })
            // }
        }, 100)

        try {

            const formData = form.getFieldsValue()

            jobId.current = randomString()

            // api改版直接变动下
            const tagsMap = tagList.current?.tagsMap || {}

            const labels: string[] = [];

            const tagsArr = Object.values(tagsMap)

            if (tagsArr.length) {
                (tagsArr as IOption[][]).forEach((item: IOption[]) => {
                    item.forEach(one => {
                        labels.push(one.label)
                    })
                })
            }

            const data = {
                job_id: jobId.current,
                ...formData,
                labels,
            }

            // const data = {
            //     job_id:jobId.current,
            //     ...formData,
            //     labels: (tagList.current as any)?.tagsMap,
            // }

            const result = await API.submitPornGenJob(data)

            if (get(result, 'data.status') !== "true") {
                throw new Error('error:submitPornGenJob')
            }

            const { start } = polling((stop) => API.checkPornGenJob({ job_id: jobId.current }).then(res => {
                const url = get(res, 'data.img_url')
                if (url) {
                    const imageOne = new Image();
                    imageOne.src = url
                    imageOne.onload = function () {
                        setImgUrl(url)
                        setCreating(false)
                    }
                    imageOne.onerror = function () {
                        setCreating(false)
                        throw new Error('error:loadImage')
                    }
                    stop(true)
                }
            }), () => {
                setCreating(false)
            })

            await start()

        } catch (err) {
            messageCus.error('error,please try again!')
            setCreating(false)
        }
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
            tagsMap: (tagList.current as any)?.tagsMap,
            formData: form.getFieldsValue()
        })
        window.open('/createEdit')
    }

    const handleDownload = () => {
        if (!isVip) {
            return
        }
        const imgDom = document.getElementById("imgDom")
        if (imgDom) {
            downloadImg(get(imgDom, 'src'))
        }
    }

    return <div className={CreateStyles.wrap}>
        <div className={CreateStyles.width1280}>
            <div className={CreateStyles.innerWrap}>

                <div className={CreateStyles.info} id="info">
                    <h1>Generate your favorite</h1>
                    <p>Choose some tags and click 'generate'</p>
                </div>

                <div className={CreateStyles.pcSuit}>
                    {/* 生成图片区域 */}
                    <div className={clsx(CreateStyles.createImgWrap, { [CreateStyles.createImgWrapReady]: !!imgUrl || creating })}>

                        <div id="imgWrap" className={CreateStyles.imgWrap}>
                            {!!imgUrl && <ImageNx id="imgDom" src={imgUrl} layout="fill" objectFit='contain' ></ImageNx>}
                            {(!imgUrl && !creating) && <div className={CreateStyles.placeHolder}> Choose tags to generate images here</div>}
                            {(!imgUrl && creating) && <div className={clsx(CreateStyles.placeHolder, { [CreateStyles.placeHolderVip]: isVip })}> Generating <br />
                                {isVip ? <span className={CreateStyles.vipCreateTips}>Less than 30s<span className={CreateStyles.dot}>...</span><br />Fast Pass + Higher Quality</span> : <><span>
                                    More than 1mins<span className={CreateStyles.dot}>...</span><br />
                                    waiting too long?
                                </span>
                                    <br />
                                    <Button onClick={() => window.open('/subcribe', '_blank')} type='primary' size='large' ghost> Go Premium </Button></>}
                            </div>}
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
                        <div className={CreateStyles.blockForm}>
                            <Form layout='vertical' form={form}>
                                <Form.Item initialValue='Women: Detailed' label="Generator" name="model">
                                    <Select popupClassName="modelDrop" options={cloneDeep(generatorDict).map((item) => {
                                        if (!freeMode.includes(item.value) && !isVip) {
                                            item.label = addClock(item.label)
                                            item.disabled = true
                                        }
                                        return item
                                    })} size='large' />
                                </Form.Item>
                                {/* <Form.Item initialValue="1:1" label="Ratio" name="ratio">
                                    <Select options={ratioDict} size="large" />
                                </Form.Item> */}
                            </Form>
                        </div>
                        <TagsListCurrent ref={tagList} />
                        {creating && <div className={CreateStyles.blockMask}>
                        </div>}
                    </div>
                </div>

                {loading === false && <div className={CreateStyles.btnWrap}>
                    <Button onClick={handleCreate} loading={creating} block size='large' type="primary">Generate</Button>
                </div>}

            </div>
        </div>
    </div>
}

export default Profile
