import axios from './utils/axios'

const credentials = {
    region: "us-east-1",
    accessKeyId: "AKIAW3QGPN5FER65AFGB",
    secretAccessKey: "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"
  };

const mapEnv= {
    'dev':{
        STRIPEGTW:'http://localhost:3000',
        firebaseConfig:{
            apiKey: "AIzaSyBsUq6huFtJyoWaUIrDQl3G980CIbuS9xA",
            authDomain: "aitrigger.firebaseapp.com",
            projectId: "aitrigger",
            storageBucket: "aitrigger.appspot.com",
            messagingSenderId: "946021771923",
            appId: "1:946021771923:web:2f6ff5c5cb08d2509d3b66"
          },
          credentials,
    },
    'prod':{
        firebaseConfig:{
            apiKey: "AIzaSyBsUq6huFtJyoWaUIrDQl3G980CIbuS9xA",
            authDomain: "aitrigger.firebaseapp.com",
            projectId: "aitrigger",
            storageBucket: "aitrigger.appspot.com",
            messagingSenderId: "946021771923",
            appId: "1:946021771923:web:2f6ff5c5cb08d2509d3b66"
          },credentials
    }
}

//@ts-ignore
export const envGtw=mapEnv[process.env.APP_ENV||'dev']||mapEnv.dev

export default {
    ['stripe-create-payment-intent']:()=>axios(`${envGtw.STRIPEGTW}/create-payment-intent`),
    ['stripe-config']:()=>axios(`${envGtw.STRIPEGTW}/config`),
    firebaseConfig:envGtw.firebaseConfig,
    credentials:envGtw.credentials
}




