
import { Input, Form, Button, Tabs } from 'antd/lib'
import {messageCus} from "../helper"
import { NextPage } from 'next'
import React, { useState } from 'react'
import LoginStyles from '../styles/Login.module.scss'
import Link from 'next/link'

const Login: NextPage = () => {
    const [form] = Form.useForm();
    const [currentTabKey, setCurrentTabKey] = useState<string>('login')
    const [loading,setLoading]=useState<boolean>(false)

    const handleSubmit=()=>{

        form.validateFields().then(res=>{
            if(loading){
                return
            }
            setLoading(true)
            try{
                // todo
                // 1.调接口,根据类型决定是走登录还是注册接口，成功后都一样，算登录成功
                // 页面跳转，跳转到个人资料页面
            }catch(err){
                if  (err instanceof  Error)  {
                    messageCus.error(err.name + ":" + err.message);
                }
            }finally{
                setLoading(false)
            }
        })
    }

    const handleGoogle=()=>{
        //1.跳goog1e
        //2.成功后页面跳转，跳转到个人资料页面
    }
    
    const formDom = <Form layout="vertical" form={form}>
        <Form.Item label="Email" name="email" rules={[{ required: true,message:'请输入' },{ type: 'email',message:"邮箱格式不正确" }]}>
            <Input placeholder="Email" />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true,message:'请输入' }]}>
            <Input.Password placeholder="Password" />
        </Form.Item>
        
        <div className={LoginStyles.btnWrapFirst}><Button onClick={handleSubmit} loading={loading} block size='large' type='primary'>{currentTabKey === "login" ? "登录" : "注册"}</Button></div>
        {currentTabKey === "login"&&<div className={LoginStyles.reset}><Link href="/findPassword">Reset password</Link></div>}
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
