import { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, User } from "firebase/auth";
import auth from '../firebase';
import { messageCus } from '../helper';
import cookie from 'js-cookie';
import { get } from 'lodash';

export default() => {

  const googleProvider = new GoogleAuthProvider();

    const [loginInfo,setLoginInfo]=useState<User|'init'|'loginOut'>() //有3个状态，初始状态和登录和登出状态

    const loginOut=()=>{
      return signOut(auth)
    }

    const signUp=(email,password)=>{
      return createUserWithEmailAndPassword(auth,email,password)
    }

    const signIn=(email,password)=>{
      return signInWithEmailAndPassword(auth,email,password)
    }

    const resetByEmail=(email)=>{
      return sendPasswordResetEmail(auth, email)
    }

    const clientOut=()=>{
      cookie.remove('accessToken');
      setLoginInfo('loginOut')
    }

    const singnWithGoogle=()=>{
      return signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        if (error instanceof Error) {
          messageCus.error(error.name + ":" + error.message);
      }
        // ...
      });
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
          // 默认是local,持久化登录
          console.log('user',user)
            if (user) {
                setLoginInfo(user)
                cookie.set('accessToken', get(user,'accessToken',''));
            } else {
              clientOut()
            }
          });
    },[])
    

    return {
        clientOut,
        loginInfo,setLoginInfo,
        loginOut,
        singnWithGoogle,
        signUp,
        signIn,
        resetByEmail
    }
  }
