import { NextPage } from 'next'
import React, { useState } from 'react'
import CreateStyles from '../styles/Create.module.scss'
import clsx from 'classnames';
import { get } from 'lodash';
import { Radio, Checkbox, Form, Button } from 'antd/lib';
import { useForm } from 'antd/lib/form/Form';
import Image from 'next/image'

type ICommonValue = string | number;

// tag组件
interface IOption { key: string, value: ICommonValue }

interface ITag {
    active: boolean,
    data: IOption,
    closeIcon?: boolean,
    handleClick?: (value: IOption) => void
}

const Tag = (props: ITag) => {
    const { active, data, handleClick, closeIcon } = props;
    return <div
        key={data.key}
        className={clsx(CreateStyles.bodyItem, { [CreateStyles.current]: active })}
        onClick={() => { !!handleClick && handleClick(data) }}>
        {data.value}
        {closeIcon && <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M400 145.49L366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z"></path></svg>}
    </div>
}

interface IType {
    type: string;
    cate: ICate[]
}

interface ICate {
    name: string;
    form: IForm
}

interface IForm {
    type: "radio" | "checkbox"
    cate: (ICommonValue)[]
}

const mockData: IType[] = [
    {
        type: "Ethnicity",
        cate: [
            {
                name: "thin",
                form: { type: 'radio', cate: ['1', '2'] }
            },
            {
                name: "fat",
                form: { type: 'checkbox', cate: ['3', '4'] }
            }
        ]
    }, {
        type: "Age",
        cate: [
            {
                name: "18",
                form: { type: 'radio', cate: ['7', '8'] }
            }
        ]
    }]

const ListItem = (props: { data: IType }) => {

    const { data } = props
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const [currentKey, setCurrentKey] = useState<string>()


    return <div className={clsx(CreateStyles.blockList, { [CreateStyles.open]: isOpen })}>
        <div className={CreateStyles.listHeader} onClick={() => setIsOpen(!isOpen)}>
            <div className={CreateStyles.headerLeft}>
                {get(data, 'type', '')}
            </div>
            <div className={CreateStyles.headerRight}>
                {isOpen ?
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M696 480H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
                    : <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>}
            </div>
        </div>

        {
            <div className={isOpen ? CreateStyles.show : CreateStyles.hide}>

                <div className={CreateStyles.listBody}>
                    {get(data, 'cate', []).map((item: ICate) => {
                        const name = get(item, 'name', '')
                        return <Tag
                        key={name}
                            handleClick={(value: IOption) => setCurrentKey(value.value + "")}
                            active={name === currentKey}
                            data={{ key: name, value: name }} />
                    })}
                </div>

                <div className={CreateStyles.FormItemWrap}>
                    <Form.Item noStyle shouldUpdate>
                        {get(data, 'cate', []).map((item: ICate) => {
                            const { form, name } = item
                            const innerWrap = form.type === "radio" ?
                                <Radio.Group size='large'>{get(form, 'cate', []).map((one: string | number) => <Radio key={one} value={one}>{one}</Radio>)}
                                </Radio.Group> :
                                <Checkbox.Group>
                                    {get(form, 'cate', []).map((one: string | number) => <Checkbox value={one} key={one}>{one}</Checkbox>)}
                                </Checkbox.Group>
                            return (currentKey === name) && <Form.Item key={name} name={name}>
                                {innerWrap}
                            </Form.Item>
                        })}
                    </Form.Item>
                </div>
            </div>
        }
    </div>
}

interface ITagItem {
    [x: string]: ICommonValue | ICommonValue[]
}

const Profile: NextPage = () => {

    const [form] = useForm()
    const [tagsMap, setTagsMap] = useState<ITagItem[]>();

    const formatFormValue = (value: any): ITagItem[] => {
        const arr:ITagItem[] = [];

        for (const item in value) {
            if (value[item] !== undefined && value[item] !== '') {
                arr.push({ [item]: value[item] })
            }
        }
        return arr
    }

    const renderTags = (tagsMap: ITagItem[]): any => {
        return (tagsMap || []).map((item: any) => {
            if (Array.isArray(item)) {
                return renderTags(item)
            }
            else {
                const key = Object.keys(item)[0]
                const value = Object.values(item)[0]
                // 是基本类型
                return (value !== undefined && value !== '') && <Tag
                    active
                    data={{ key, value: Object.values(item)[0] as ICommonValue }}
                    closeIcon
                    handleClick={() => {
                        form.resetFields([key])
                        // 没有触发onValuesChange事件，所以我手动触发下
                        setTagsMap(formatFormValue(form.getFieldsValue()))
                    }}
                />
            }
        })
    }

    return <div className={CreateStyles.wrap}>
        <div className={CreateStyles.width1280}>
            <div className={CreateStyles.innerWrap}>

                <div className={CreateStyles.info}>
                    <h1>生成您的最爱</h1>
                    <p>要生成图片，请选择您的标签并点击“生成”↓</p>
                </div>

                <div className={CreateStyles.pcSuit}>
                    {/* 生成图片区域 */}
                    <div className={CreateStyles.createImgWrap}>

                        <div className={CreateStyles.imgWrap}>
                            <Image src="/banner1.webp" layout="fill" objectFit='contain' ></Image>
                        </div>

                        <div className={CreateStyles.editWrap}>
                            <div className={CreateStyles.editItem}>
                                <div className={CreateStyles.editWrapLeft}>
                                    <span className={CreateStyles.editWrapLeftSvg}>
                                        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"  width="20" height="20"><path d="M925.248 356.928l-258.176-258.176a64 64 0 0 0-45.248-18.752H144a64 64 0 0 0-64 64v736a64 64 0 0 0 64 64h736a64 64 0 0 0 64-64V402.176a64 64 0 0 0-18.752-45.248zM288 144h192V256H288V144z m448 736H288V736h448v144z m144 0H800V704a32 32 0 0 0-32-32H256a32 32 0 0 0-32 32v176H144v-736H224V288a32 32 0 0 0 32 32h256a32 32 0 0 0 32-32V144h77.824l258.176 258.176V880z"  fill="#ffffff"></path></svg>
                                    </span>
                                    保存
                                </div>
                                <div className={CreateStyles.editWrapRight}>Subscribe to access this feature.</div>
                            </div>
                            <div className={CreateStyles.editItem}>
                                <div className={CreateStyles.editWrapLeft}>
                                    <span className={CreateStyles.editWrapLeftSvg}>
                                        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"  width="20" height="20"><path d="M775.84 392.768l-155.2-172.352L160.768 643.264l-38.368 187.936 190.56-12.832zM929.952 229.952l-131.2-150.944-0.288-0.32a16 16 0 0 0-22.592-0.96l-131.168 120.576 155.168 172.352 128.832-118.464a15.936 15.936 0 0 0 1.248-22.24zM96 896h832v64H96z"  fill="#ffffff"></path></svg>    </span>
                                    编辑
                                </div>
                                <div className={CreateStyles.editWrapRight}>Subscribe to access this feature.</div>

                            </div>
                            <div className={CreateStyles.editItem}>
                                <div className={CreateStyles.editWrapLeft}>
                                    <span className={CreateStyles.editWrapLeftSvg}>
                                        <svg fill="#ffffff" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"  width="20" height="20"><path d="M808.192 246.528a320.16 320.16 0 0 0-592.352 0A238.592 238.592 0 0 0 32 479.936c0 132.352 107.648 240 240 240h91.488a32 32 0 1 0 0-64H272a176.192 176.192 0 0 1-176-176 175.04 175.04 0 0 1 148.48-173.888l19.04-2.976 6.24-18.24C305.248 181.408 402.592 111.936 512 111.936a256 256 0 0 1 242.208 172.896l6.272 18.24 19.04 2.976A175.04 175.04 0 0 1 928 479.936c0 97.024-78.976 176-176 176h-97.28a32 32 0 1 0 0 64h97.28c132.352 0 240-107.648 240-240a238.592 238.592 0 0 0-183.808-233.408z" ></path><path d="M649.792 789.888L544 876.48V447.936a32 32 0 0 0-64 0V876.48l-106.752-87.424a31.968 31.968 0 1 0-40.544 49.504l159.04 130.24a32 32 0 0 0 40.576 0l158.048-129.44a32 32 0 1 0-40.576-49.472z" ></path></svg>
                                    </span>
                                    下载
                                </div>
                                <div className={CreateStyles.editWrapRight}>Subscribe to access this feature.</div>
                            </div>
                        </div>
                    </div>

                    <div className={CreateStyles.block}>
                        {!!get(tagsMap,'length',0)&&<div className={CreateStyles.tagMap}>
                            {renderTags(tagsMap as ITagItem[])}
                        </div>}
                        <Form form={form} onValuesChange={(value, allValue) => { console.log(allValue, 'allValue'); setTagsMap(formatFormValue(allValue)) }}>
                            {mockData.map(item => <ListItem key={item.type} data={item} />)}
                        </Form>
                    </div>
                </div>

                <div className={CreateStyles.btnWrap}>
                    <Button block size='large' type="primary">Create</Button>
                </div>

            </div>
        </div>
    </div>
}

export default Profile