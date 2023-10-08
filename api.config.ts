import axios from './utils/axios'

const credentials = {
    region: "us-east-1",
    accessKeyId: "AKIAW3QGPN5FER65AFGB",
    secretAccessKey: "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"
};

const mapEnv = {
    'dev': {
        STRIPEGTW: 'http://localhost:3000',
        firebaseConfig: {
            apiKey: "AIzaSyDXjF21JliwZrdHnX6eLjDWlNBG6Jc6XHc",
            authDomain: "aitrigger-d4d70.firebaseapp.com",
            projectId: "aitrigger-d4d70",
            storageBucket: "aitrigger-d4d70.appspot.com",
            messagingSenderId: "208820737895",
            appId: "1:208820737895:web:ec05cd7cf043d0cd7081c2",
            measurementId: "G-6DPYS0KH0Q"
        },
        credentials,
    },
    'prod': {
        firebaseConfig: {
            apiKey: "AIzaSyDXjF21JliwZrdHnX6eLjDWlNBG6Jc6XHc",
            authDomain: "aitrigger-d4d70.firebaseapp.com",
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
    firebaseConfig: envGtw.firebaseConfig,
    credentials: envGtw.credentials
}




