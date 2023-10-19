import { Button, Modal, Segmented, Skeleton } from 'antd/lib'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import SubcribeStyles from '../styles/Subcribe.module.scss'
import BigNumber from 'bignumber.js'
import Image from 'next/image'
import API from '../api.config'
import { useRouter } from 'next/router'
import { get } from 'lodash'
import clsx from 'classnames'
import useLogin from '../hooks/useLogin'
import { messageCus } from '../helper'
import { User } from 'firebase/auth'
import { IPriceId, IProduct } from '../interfaces/stripe'

interface IPrice {
    label: string;
    value: IProduct
}

const Subcribe: NextPage = () => {

    const router = useRouter()

    const payNow = router.query.payNow

    const { loginInfo } = useLogin()

    const [openSubscibe, setOpenSubscibe] = useState<boolean>(false)

    const [price, setPrice] = useState<IPrice[]>([]);

    const [payType, setPayType] = useState<string>()

    const [currentPriceId, setCurrentPriceId] = useState<IPriceId>()

    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (payNow) {
            setOpenSubscibe(true)
        }
    }, [payNow])

    useEffect(() => {
        API.getAllProducts().then((r) => {
            const _price = Object.keys(r.data).map(item => ({ label: item, value: r.data[item] }))
            setPrice(_price)
            setPayType(_price[0].label)
            setCurrentPriceId(_price[0].value.prices[0])
        });
    }, []);

    const handlePay = async (item: IPriceId) => {

        if (typeof (loginInfo) !== "object") {
            messageCus.error('Please Login in!')
            setTimeout(() => {
                router.push('/login')
            }, 1000)
        }

        if (loading) {
            return
        }
        setLoading(true)

        API.createCheckoutSession({
            user_id: (loginInfo as User).uid,
            price_id: item.id,
            user_email: (loginInfo as User).email,
            success_url: location.origin + "/profile",
            cancel_url: location.origin + "/subcribe?payNow=1",
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
            setLoading(false)
        })
    }

    const currentPriceWrap = price.find(item => item.label === payType)

    return <div className={SubcribeStyles.wrap}>
        <div className={SubcribeStyles.width1280}>

            <div className={SubcribeStyles.innerWrap}>

                <div className={SubcribeStyles.title}>
                    Join <span>thousands of subscribers</span> <br />
                    using Pro Mode!
                </div>

                <div className={SubcribeStyles.createBtn}>
                    <Button onClick={() => setOpenSubscibe(true)} block type="primary">Get Pro Mode</Button>
                </div>

                <div className={SubcribeStyles.pricing}>
                    <h3 className={SubcribeStyles.pricingTitle}>
                        Pricing
                    </h3>

                    <div className={SubcribeStyles.pricingDetail}>

                        <div className={SubcribeStyles.detailItem}>
                            <h3>
                                Free Mode<br />
                                Free
                            </h3>
                            <ul className={SubcribeStyles.freeUl}>
                                <li>Free basic generations</li>
                                <li>Slower generations</li>
                                <li>Limited search results</li>
                                <li>Watermarks</li>
                            </ul>
                        </div>

                        <div className={SubcribeStyles.detailItem}>
                            <h3>
                                Pro Mode<br />
                                $15 / month+<span>(tax, price varies by region)</span>
                            </h3>

                            <ul className={SubcribeStyles.freeUl}>
                                <li>Unlimited generations</li>
                                <li>Faster generations</li>
                                <li>Private generation</li>
                                <li className={SubcribeStyles.detailLiActive}>HD Generations (new)</li>
                                <li className={SubcribeStyles.detailLiActive}>Exclusive Tags (new)</li>
                                <li>No watermarks</li>
                                <li>Commercial rights</li>
                                <li>Higher quality</li>
                                <li>Uncropping</li>
                                <li>Upscaling</li>
                                <li>Smart Edit</li>
                                <li>Fix Details</li>
                                <li>3D Posing</li>
                                <li>Doodles</li>
                                <li>Unlimited Search</li>
                            </ul>
                        </div>

                    </div>

                    <div className={SubcribeStyles.infoWrap}>
                        <h3>Pro Features</h3>

                        <div className={SubcribeStyles.infoItem}>
                            <p>Faster and unlimited generations!</p>
                            <div className={SubcribeStyles.galleryWrap}>
                                <div className={SubcribeStyles.galleryImg}>
                                    <Image layout="fill" objectFit='contain' src="/banner1.webp" alt="load failed"></Image>
                                </div>
                                <div className={SubcribeStyles.galleryImg}>
                                    <Image layout="fill" objectFit='contain' src="/banner1.webp" alt="load failed"></Image>
                                </div>
                            </div>
                            <span>
                                Quickly generate unlimited images with a priority queue for
                                <br /> Pro members! No credits or tokens required!
                            </span>
                        </div>

                        <div className={SubcribeStyles.infoItem}>
                            <p>Private mode + no watermark</p>
                            <div className={SubcribeStyles.galleryWrap}>
                                <div className={SubcribeStyles.galleryImg}>
                                    <Image layout="fill" objectFit='contain' src="/banner1.webp" alt="load failed"></Image>
                                </div>
                                <div className={SubcribeStyles.galleryImg}>
                                    <Image layout="fill" objectFit='contain' src="/banner1.webp" alt="load failed"></Image>
                                </div>
                            </div>
                            <span>
                                Generate images privately without watermarks! Private
                                <br /> images are only visible to you.
                            </span>
                        </div>

                        <div className={SubcribeStyles.infoItem}>
                            <p>HD Generators</p>
                            <div className={SubcribeStyles.galleryWrap}>
                                <div className={SubcribeStyles.galleryImg}>
                                    <Image layout="fill" objectFit='contain' src="/banner1.webp" alt="load failed"></Image>
                                </div>
                                <div className={SubcribeStyles.galleryImg}>
                                    <Image layout="fill" objectFit='contain' src="/banner1.webp" alt="load failed"></Image>
                                </div>
                            </div>
                            <span>
                                Generate high quality images powered by SDXL!
                            </span>
                        </div>

                        <div className={SubcribeStyles.infoItem}>
                            <p>Consistent Characters</p>
                            <div className={SubcribeStyles.galleryWrap}>
                                <div className={SubcribeStyles.galleryImg}>
                                    <Image layout="fill" objectFit='contain' src="/banner1.webp" alt="load failed"></Image>
                                </div>
                                <div className={SubcribeStyles.galleryImg}>
                                    <Image layout="fill" objectFit='contain' src="/banner1.webp" alt="load failed"></Image>
                                </div>
                            </div>
                            <span>
                                Use the same character across multiple generations!
                            </span>
                        </div>

                        <div className={SubcribeStyles.infoItem}>
                            <p>Uncropping</p>
                            <div className={SubcribeStyles.galleryWrap}>
                                <div className={SubcribeStyles.galleryImg}>
                                    <Image layout="fill" objectFit='contain' src="/banner1.webp" alt="load failed"></Image>
                                </div>
                                <div className={SubcribeStyles.galleryImg}>
                                    <Image layout="fill" objectFit='contain' src="/banner1.webp" alt="load failed"></Image>
                                </div>
                            </div>
                            <span>
                                Zoom out to reveal more!
                            </span>
                        </div>

                    </div>

                </div>

                {/* stripe支付模块 */}
                <Modal getContainer={false} title="Subcribe" footer={null} open={openSubscibe} onCancel={() => { setOpenSubscibe(false) }}>
                    {price && !!price.length && <><div className={SubcribeStyles.segmentedWrap}>
                        <Segmented value={payType} onChange={(value) => { setPayType(value as string) }} size="large"
                            options={price.map(item => ({ label: item.label, value: item.label }))} />
                    </div>

                        <div className={SubcribeStyles.priceInfo}>
                            <h3>{currentPriceWrap?.value?.name}</h3>
                            <div>{currentPriceWrap?.value?.desc}</div>
                        </div>

                        <div className={SubcribeStyles.priceId}>
                            {get(currentPriceWrap, 'value.prices', []).map((item: IPriceId) =>
                                <div key={item.id} onClick={() => { setCurrentPriceId(item) }}
                                    style={{ 'width': `calc(100% / ${get(currentPriceWrap, 'value.prices', []).length})` }}
                                    className={clsx(SubcribeStyles.priceItem, { [SubcribeStyles.priceItemActive]: item.id === currentPriceId?.id })}>
                                    <div className={SubcribeStyles.priceItemTitle}>{item?.lookup_key}</div>
                                    <div className={SubcribeStyles.priceItemCount}>${new BigNumber(item?.price).dividedBy(new BigNumber(100)).valueOf()}</div>
                                </div>)}
                        </div>

                        <div className={SubcribeStyles.payBtn}>
                            <Button loading={loading} onClick={() => handlePay(currentPriceId as IPriceId)} size='large' type="primary" block>Pay ${new BigNumber(currentPriceId?.price || 0).dividedBy(new BigNumber(100)).valueOf()}</Button>
                        </div></>}

                    {!price || !price.length &&  <div className={SubcribeStyles.skeletonWrap}>
                        <div className={SubcribeStyles.skeletonTitle}>
                        <Skeleton.Button />
                        </div>
                        <Skeleton paragraph={{rows:3}} />
                        <Skeleton.Button className={SubcribeStyles.payBtn} block />
                    </div>
                    }
                </Modal>

            </div>

        </div>
    </div>
}

export default Subcribe