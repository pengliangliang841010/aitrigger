
import { Input, Form, Button, Tabs } from 'antd/lib'
import { messageCus } from "../helper"
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import LoginStyles from '../styles/Login.module.scss'
import Link from 'next/link'
import useLogin from '../hooks/useLogin'
import { useRouter } from 'next/router'
import http from '../utils/axios'
import { UserCredential } from 'firebase/auth'

const Login: NextPage = () => {

    const [form] = Form.useForm();
    const [currentTabKey, setCurrentTabKey] = useState<string>('login')
    const [loading, setLoading] = useState<boolean>(false)
    const {signUp,signIn,singnWithGoogle}=useLogin()

    const router=useRouter()

    const handleSubmit = () => {
        
        form.validateFields().then(async res => {
            if (loading) {
                return
            }
            setLoading(true)
            try {
                if(currentTabKey==='regist'){
                    const user=await signUp(res.email,res.password).then((userCredential)=>{
                        return userCredential.user;
                    })
                    const {uid,email}=user;
                    messageCus.success('sign up success')
                    
                    router.push('/profile')
                    http({
                        method: 'post',
                        url: '/user',
                        data: {
                          id: uid,
                          email
                        }
                      })
                }else{
                    const {uid}=await signIn(res.email,res.password).then((userCredential)=>{
                        return userCredential.user;
                    })
                    messageCus.success('sign in success')
                    router.push('/profile')
                    http({
                        method: 'put',
                        url: '/user',
                        data: {
                          id: uid,
                        }
                      })
                }
                
            } catch (err) {
                if (err instanceof Error) {
                    messageCus.error(err.name + ":" + err.message);
                }
            } finally {
                setLoading(false)
            }
        })
    }

    const handleGoogle = async () => {
        const {uid}=await singnWithGoogle().then((res)=>{
            return (res as UserCredential).user
        })
        //2.成功后页面跳转，跳转到个人资料页面
        messageCus.success('sign in success')
        router.push('/profile')
        http({
            method: 'put',
            url: '/user',
            data: {
              id: uid,
            }
          })
    }

    const formDom = <Form layout="vertical" form={form}>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: '请输入' }, { type: 'email', message: "邮箱格式不正确" }]}>
            <Input placeholder="Email" />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: '请输入' }]}>
            <Input.Password placeholder="Password" />
        </Form.Item>

        {currentTabKey==="regist"&&<Form.Item label="请再次输入密码" name="password2" rules={[{ required: true,message:'请输入' },({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),]}>
            <Input.Password placeholder="Password" />
        </Form.Item>}

        <div className={LoginStyles.btnWrapFirst}><Button onClick={handleSubmit} loading={loading} block size='large' type='primary'>{currentTabKey === "login" ? "登录" : "注册"}</Button></div>
        {currentTabKey === "login" && <div className={LoginStyles.reset}><Link href="/findPassword">Reset password</Link></div>}
        <div className={LoginStyles.btnWrap}><Button disabled={loading} onClick={handleGoogle} block size='large' type="primary" ghost>Sign in with Google</Button></div>

    </Form>

    const onChange = (value: string) => { setCurrentTabKey(value) }
    return <div className={LoginStyles.formWrap}>
        <div className={LoginStyles.width1280}>
            <div className={LoginStyles.formInner}>
                <div className={LoginStyles.card}>
                    <Tabs centered
                        defaultActiveKey="login"
                        onChange={onChange}
                        items={[
                            {
                                label: `登录`,
                                key: 'login',
                                children: formDom,
                            },
                            {
                                label: `注册`,
                                key: 'regist',
                                children: formDom,
                            },

                        ]}
                    />
                </div>
            </div>
        </div>
    </div>

}

export default Login
