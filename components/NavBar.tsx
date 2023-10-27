import React, { useEffect, useState, useRef, MutableRefObject } from 'react'
import Link from 'next/link'
import navStyles from '../styles/NavBar.module.scss'
import { useIsMobile } from '../hooks/isMobile';
import useLogin from '../hooks/useLogin';
import { get } from 'lodash'
import { messageCus } from '../helper';
import { useRouter } from 'next/router'
import useVip from '../hooks/useVip';

function NavBar() {

    const { isVip } = useVip()

    const [isOpen, setIsopen] = useState<boolean>(false);

    const isMobile = useIsMobile();

    const navRef = useRef<HTMLDivElement>();

    const { loginInfo, loginOut } = useLogin()

    const isLogin = typeof (loginInfo) === "object"

    const router = useRouter()

    const toggleNav = (e: any) => {
        e.stopPropagation()
        setIsopen(!isOpen)
    }

    const handleLogout = () => {
        loginOut().then(() => {
            router.push('/login')
        })
    }

    useEffect(() => {

        const handleScroll = () => {
            const navStickyClassName = "nav-sticky"
            try {
                if (window.pageYOffset) {
                    get(navRef, 'current')?.classList.remove(navStickyClassName)
                    get(navRef, 'current')?.classList.add(navStickyClassName)
                } else {
                    navRef.current?.classList.remove(navStickyClassName)
                }

            } catch (err) {
                if (err instanceof Error) {
                    messageCus.error(err.name + ":" + err.message);
                }
            }
        }

        const handleClick = () => {
            setIsopen(false)
        }

        document.addEventListener('scroll', handleScroll)
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('scroll', handleScroll)
            document.removeEventListener('click', handleClick);
        }
    }, [])

    const navLink = <ul>
        <Link href='/create'>
            <li className={navStyles.bold}>
                <div className={navStyles.liItem}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd"></path></svg>
                    Create</div>
            </li>
        </Link>
        {!isLogin && <Link href='/subcribe'>
            <li>
                Subscribe
            </li>
        </Link>}

        {isLogin ? <Link href="/profile"><li>
            Profile
            {isVip &&
                <span className={navStyles.profileIcon}>
                    <svg viewBox="0 0 1084 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="22" height="22"><path d="M542.117647 0c15.329882 0 29.846588 6.746353 39.664941 18.371765l228.442353 271.420235 193.746824-127.879529a52.073412 52.073412 0 0 1 57.705411 0.301176c17.377882 11.715765 25.840941 32.707765 21.38353 53.067294l-129.084235 587.745883A51.501176 51.501176 0 0 1 903.529412 843.294118H180.705882a51.501176 51.501176 0 0 1-50.447058-40.267294L1.174588 215.280941a50.868706 50.868706 0 0 1 21.38353-53.067294 52.073412 52.073412 0 0 1 57.705411-0.301176l193.746824 127.879529L502.452706 18.371765C512.301176 6.746353 526.787765 0 542.117647 0zM120.470588 973.793882c0-27.708235 23.612235-50.176 52.705883-50.176h737.882353c18.823529 0 36.231529 9.547294 45.658352 25.088a48.128 48.128 0 0 1 0 50.206118c-9.426824 15.510588-26.804706 25.088-45.658352 25.088H173.176471C144.082824 1024 120.470588 1001.532235 120.470588 973.793882z m342.588236-351.35247c0 27.708235 23.612235 50.176 52.705882 50.176h52.705882c29.093647 0 52.705882-22.467765 52.705883-50.176 0-27.708235-23.612235-50.206118-52.705883-50.206118h-52.705882c-29.093647 0-52.705882 22.467765-52.705882 50.206118z" fill="#ec567c"></path></svg>
                </span>}
        </li></Link> : <Link href='/login'><li>Login</li></Link>}

        {isLogin && <li onClick={handleLogout}>
            Sign Out
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M952.7 492.1c-1.4-1.8-3.1-3.4-4.8-4.9l-179-178.9c-12.5-12.5-32.9-12.5-45.4 0s-12.5 32.9 0 45.4l126 126H421.3h-0.1c-18.2 0-32.9 14.8-32.9 33s14.7 33 32.9 33c0.3 0.1 0.5 0 0.7 0h427.8l-126 126c-12.3 12.3-12.3 32.4 0 44.7l0.7 0.7c12.3 12.3 32.4 12.3 44.7 0l182-182c11.7-11.7 12.3-30.6 1.6-43z" fill="#ffffff" ></path><path d="M562.3 799c-18 0-32.7 14.7-32.7 32.7v63.8H129.2V128.7h400.4v63.1c0 18 14.7 32.7 32.7 32.7s32.7-14.7 32.7-32.7V96.3c0-3.5-0.6-6.8-1.6-10-4.2-13.3-16.6-23-31.2-23H96.6c-18 0-32.7 14.7-32.7 32.7v831.9c0 14.2 9.2 26.3 21.8 30.8 3.6 1.4 7.5 2.1 11.5 2.1h463.2c0.6 0 1.3 0.1 1.9 0.1 18 0 32.7-14.7 32.7-32.7v-96.5c0-18-14.7-32.7-32.7-32.7z" fill="#ffffff" ></path><path d="M256.8 512.7a32.9 33 0 1 0 65.8 0 32.9 33 0 1 0-65.8 0Z" fill="#ffffff" ></path></svg>
        </li>}
    </ul>

    return (

        <div className={navStyles.navWrap} ref={navRef as MutableRefObject<HTMLDivElement>}>
            <div className={`${navStyles.navInnerWrap} ${navStyles.width1280}`}>
                <div className={navStyles.logoWrap}>
                    <Link href="/">
                        <div className={navStyles.logo}>
                            <h1>
                                <span className={navStyles.logoFirst}>Porn</span>
                                <span className={navStyles.logoSecond}>Gen</span>
                            </h1>
                        </div>
                    </Link>

                    {isMobile && <div onClick={toggleNav} className={navStyles.navBtn}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" color="white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" ><path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg></div>}

                </div>

                {<nav className={navStyles.nav}>
                    {((isMobile && isOpen) || !isMobile) && navLink}
                </nav>}
            </div>

        </div>
    )
}

export default NavBar
