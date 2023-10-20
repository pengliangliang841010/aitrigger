
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
            <Form.Item label="Password" name="password" rules={[{ required: true,message:'Enter' }]}>
            <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item label="Password again" name="password2" rules={[{ required: true,message:'Enter' },({ getFieldValue }) => ({
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

        {!confirmPassword&&<Form.Item label="Email" name="email" rules={[{ required: true, message: 'Enter' }, { type: 'email', message: "Incorrect email format" }]}>
            <Input placeholder="Email" />
        </Form.Item>}

        <div className={LoginStyles.btnWrapFirst}><Button onClick={handleSubmit} loading={loading} block size='large' type='primary'>Ok</Button></div>
    </Form>

    return <div className={LoginStyles.formWrap}>
        <div className={LoginStyles.width1280}>
            <div className={LoginStyles.formInner}>
                <div className={LoginStyles.card}>
                    <Tabs centered
                        items={[
                            {
                                label: `${confirmPassword?"Please enter the password":'Please enter your email address'}`,
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
