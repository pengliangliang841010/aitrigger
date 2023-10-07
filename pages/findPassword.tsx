
import { Input, Form, Button, Tabs } from 'antd/lib'
import { messageCus } from "../helper"
import { NextPage } from 'next'
import React, { useState } from 'react'
import LoginStyles from '../styles/Login.module.scss'
import { useRouter } from 'next/router'
import useLogin from '../hooks/useLogin'

const FindPassward: NextPage = () => {

    const [form] = Form.useForm();

    const router = useRouter()
    const confirmPassword = router.query.confirmPassword
    const {resetByEmail}=useLogin()

    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = () => {

        form.validateFields().then(res => {
            if (loading) {
                return
            }
            setLoading(true)
            
            try {
                if(!confirmPassword){
                    resetByEmail(res.email).then(_res=>{
                        messageCus.success("email has sent!")
                        router.push('/login')
                    })

                }
            } catch (err) {
                if  (err instanceof  Error)  {
                    messageCus.error(err.name + ":" + err.message);
                }
            } finally {
                setLoading(false)
            }
        })
    }

    const formDom = <Form layout="vertical" form={form}>

        {!!confirmPassword&&<>
            <Form.Item label="Password" name="password" rules={[{ required: true,message:'请输入' }]}>
            <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item label="请再次输入密码" name="password2" rules={[{ required: true,message:'请输入' },({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),]}>
            <Input.Password placeholder="Password" />
        </Form.Item>
        </>}

        {!confirmPassword&&<Form.Item label="Email" name="email" rules={[{ required: true, message: '请输入' }, { type: 'email', message: "邮箱格式不正确" }]}>
            <Input placeholder="Email" />
        </Form.Item>}

        <div className={LoginStyles.btnWrapFirst}><Button onClick={handleSubmit} loading={loading} block size='large' type='primary'>确定</Button></div>
    </Form>

    return <div className={LoginStyles.formWrap}>
        <div className={LoginStyles.width1280}>
            <div className={LoginStyles.formInner}>
                <div className={LoginStyles.card}>
                    <Tabs centered
                        items={[
                            {
                                label: `${confirmPassword?"请输入密码":'请输入邮箱'}`,
                                key: 'findPassword',
                                children: formDom,
                            }

                        ]}
                    />
                </div>
            </div>
        </div>
    </div>

}

export default FindPassward
