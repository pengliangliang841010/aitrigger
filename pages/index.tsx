import React from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import indexStyles from '../styles/Index.module.scss'
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay'
import { Button } from 'antd/lib';
import Link from 'next/link'

const Home: NextPage = () => {

    return (
        <div className={indexStyles.container}>

            <div className={`${indexStyles.width1280} ${indexStyles.flexWrap}`}>

                <div className={indexStyles.containerMain}>
                    <Head>
                        <title>aitrigger</title>
                        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                    </Head>

                    <div className={indexStyles.swiperWrap}>
                        <Swiper effect="fade" autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                            fadeEffect={{
                                crossFade: true
                            }}
                            loop={true}
                            modules={[Autoplay, EffectFade]}
                        >
                            <SwiperSlide>
                                <Image layout="fill" objectFit='contain' src="/banner1.webp" alt="加载失败"></Image>
                            </SwiperSlide>
                            <SwiperSlide >
                                <Image layout="fill" objectFit='contain' src="/banner2.webp" alt="加载失败"></Image>
                            </SwiperSlide>
                        </Swiper>
                        <div className={indexStyles.imageGradientTop}></div>
                        <div className={indexStyles.imageGradient}></div>
                    </div>
                </div>
                <div className={indexStyles.logoBlur}></div>
                <div className={indexStyles.infoWrap}>

                    <div className={indexStyles.infoWrapBtn}>
                        <Link href="/subcribe"><div>Go Premium</div></Link>
                        <Link href="/login"><div className={indexStyles.infoBtnActive}>Try Free</div></Link>
                    </div>

                    <div className={indexStyles.infoContent}>
                        {<p>Advanced AI generator</p>}
                        <h3>Create The Woman Of<br />Your Dreams!</h3>
                        {<p>Create a Free Account & Design the Woman of your Fantasy today.</p>}
                    </div>

                </div>

            </div>
            <div className={indexStyles.descriptionWrap}>
                <div className={indexStyles.width1280}>
                    <div className={indexStyles.description}>
                        <span>
                            <span><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C9.243 2 7 4.243 7 7v2H6c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v2H9V7zm9.002 13H13v-2.278c.595-.347 1-.985 1-1.722 0-1.103-.897-2-2-2s-2 .897-2 2c0 .736.405 1.375 1 1.722V20H6v-9h12l.002 9z"></path></svg></span>完全私密</span>
                        <span><span><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM4 6h16v2H4V6zm0 12v-6h16.001l.001 6H4z"></path><path d="M6 14h6v2H6z"></path></svg></span>交易安全、可靠</span>
                        <span><span><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m6.516 14.323-1.49 6.452a.998.998 0 0 0 1.529 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082a1 1 0 0 0-.59-1.74l-5.701-.454-2.467-5.461a.998.998 0 0 0-1.822 0L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.214 4.107zm2.853-4.326a.998.998 0 0 0 .832-.586L12 5.43l1.799 3.981a.998.998 0 0 0 .832.586l3.972.315-3.271 2.944c-.284.256-.397.65-.293 1.018l1.253 4.385-3.736-2.491a.995.995 0 0 0-1.109 0l-3.904 2.603 1.05-4.546a1 1 0 0 0-.276-.94l-3.038-2.962 4.09-.326z"></path></svg></span>立即免费试用</span>
                    </div>
                    <div className={indexStyles.createBtnWrap}>
                        <div className={indexStyles.createBtn}>
                            <Link href="/create">
                                <Button block type="primary" size="large">Create</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home


