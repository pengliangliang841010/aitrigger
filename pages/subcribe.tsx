import { Button, Modal, Segmented } from 'antd/lib'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import CheckoutForm from '../components/CheckoutForm'
import SubcribeStyles from '../styles/Subcribe.module.scss'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image'
import API from '../api.config'
import { useRouter } from 'next/router'

const Subcribe: NextPage = () => {

    const router = useRouter()
    const payNow = router.query.payNow

    const [openSubscibe, setOpenSubscibe] = useState<boolean>(false)

    const [stripePromise, setStripePromise] = useState(null);

    const [clientSecret, setClientSecret] = useState('');

    const [payType, setPayType] = useState<string>('Year')

    useEffect(() => {
        if (payNow) {
            setOpenSubscibe(true)
        }
    }, [payNow])

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        setClientSecret('')
        API['stripe-create-payment-intent']()
            .then((data) => {
                setClientSecret(data.data.clientSecret)
            })
    }, [payType]);

    useEffect(() => {
        API['stripe-config']().then((r) => {
            const { publishableKey } = r.data;
            // @ts-ignore
            setStripePromise(loadStripe(publishableKey));
        });
    }, []);

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
                    <div className={SubcribeStyles.segmentedWrap}>
                        <Segmented value={payType} onChange={(value) => { setPayType(value as string) }} size="large" options={[{ label: 'Month', value: "Month" }, { label: 'Year', value: "Year" }]} />
                    </div>
                    <div className={SubcribeStyles.price}>{payType === "Year" ? "$59.99" : "$9.99"}</div>
                    {clientSecret && stripePromise && (
                        <Elements stripe={stripePromise} options={{ clientSecret, }}>
                            <CheckoutForm />
                        </Elements>
                    )}</Modal>

            </div>

        </div>
    </div>
}

export default Subcribe