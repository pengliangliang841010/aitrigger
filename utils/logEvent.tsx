import {  logEvent } from "firebase/analytics";

export default (type, param) => {
    // @ts-ignore
    if (window) {
        //@ts-ignore
        const analyticsCus=window.analyticsCus
        if(analyticsCus){
            const uid = localStorage.getItem('uid')
            debugger
            logEvent(analyticsCus, type, { ...param, uid })
        }
    }
}