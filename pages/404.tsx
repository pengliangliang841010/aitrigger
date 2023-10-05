import Link from "next/link"
import React from "react"
import Styles from '../styles/404.module.scss'

export default()=>{
    return <div className={Styles.wrap}>
        <div className={Styles.width1280}>
            <div className={Styles.inner}>
                <div className={Styles.innerInfo}><span>404</span>
                The page cannot be found</div>
                <Link href="/create">
                <div className={Styles.btn}>Go to Create</div>
                </Link>
            </div>
        </div>
    </div>
}