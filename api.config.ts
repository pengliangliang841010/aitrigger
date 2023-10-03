import axios from './utils/axios'

const mapEnv= {
    'dev':{
        STRIPEGTW:'http://localhost:3000'
    },
    'prod':{}
}

//@ts-ignore
export const envGtw=mapEnv[process.env.APP_ENV||'dev']||mapEnv.dev

export default {
    ['stripe-create-payment-intent']:()=>axios(`${envGtw.STRIPEGTW}/create-payment-intent`),
    ['stripe-config']:()=>axios(`${envGtw.STRIPEGTW}/config`),
}




