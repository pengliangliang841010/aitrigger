import { AxiosResponse } from 'axios';
import { ICreateCheckoutSession, IProducts, IStatus } from './interfaces/stripe';
import axios from './utils/axios'

const credentials = {
    region: "us-east-1",
    accessKeyId: "AKIAW3QGPN5FER65AFGB",
    secretAccessKey: "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"
};

const mapEnv = {
    'dev': {
        STRIPEGTW: ' https://e2jf2jwdzc.us-east-1.awsapprunner.com',
        PAYGRW: "https://api.porngen.art",
        firebaseConfig: {
            apiKey: "AIzaSyDXjF21JliwZrdHnX6eLjDWlNBG6Jc6XHc",
            authDomain: "firebase.porngen.art",
            projectId: "aitrigger-d4d70",
            storageBucket: "aitrigger-d4d70.appspot.com",
            messagingSenderId: "208820737895",
            appId: "1:208820737895:web:ec05cd7cf043d0cd7081c2",
            measurementId: "G-6DPYS0KH0Q"
        },
        credentials,
    },
    'prod': {
        PAYGRW: "https://api.porngen.art",
        firebaseConfig: {
            apiKey: "AIzaSyDXjF21JliwZrdHnX6eLjDWlNBG6Jc6XHc",
            authDomain: "firebase.porngen.art",
            projectId: "aitrigger-d4d70",
            storageBucket: "aitrigger-d4d70.appspot.com",
            messagingSenderId: "208820737895",
            appId: "1:208820737895:web:ec05cd7cf043d0cd7081c2",
            measurementId: "G-6DPYS0KH0Q"
        }, credentials
    }
}

//@ts-ignore
export const envGtw = mapEnv[process.env.APP_ENV || 'dev'] || mapEnv.dev

export default {
    ['stripe-create-payment-intent']: () => axios(`${envGtw.STRIPEGTW}/create-payment-intent`),
    ['stripe-config']: () => axios(`${envGtw.STRIPEGTW}/config`),
    submitPornGenJob:(data) => axios.post<any, AxiosResponse<{}>>(`${envGtw.PAYGRW}/submit_porngen_job`,data),
    checkPornGenJob:(data) => axios.post<any, AxiosResponse<{}>>(`${envGtw.PAYGRW}/check_porngen_job`,data),
    getAllProducts: () => axios<any, AxiosResponse<IProducts>>(`${envGtw.PAYGRW}/get_all_products`),
    randomFeedImageList: (num:number) => axios<any, AxiosResponse<{images:string[]}>>(`${envGtw.PAYGRW}/random_feed_image_list?img_num=${num}`),
    createCheckoutSession: (data) => axios.post<any, AxiosResponse<ICreateCheckoutSession>>(`${envGtw.PAYGRW}/create-checkout-session`, data),
    createPortalSession: (data) => axios.post<any, AxiosResponse<ICreateCheckoutSession>>(`${envGtw.PAYGRW}/create-portal-session`, data),
    checkUserSubscriptionStatus: (data) => axios.post<any, AxiosResponse<IStatus>>(`${envGtw.PAYGRW}/check_user_subscription_status`, data),
    firebaseConfig: envGtw.firebaseConfig,
    credentials: envGtw.credentials
}




