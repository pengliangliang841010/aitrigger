import { ICate, ICommonValue, IOption, ITag, ITagItem, IType } from '../interfaces/create';
import clsx from 'classnames';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import TagsListStyles from '../styles/TagsList.module.scss'
import { get } from 'lodash';
import { Checkbox, Form, Radio } from 'antd/lib';
import { useForm } from 'antd/lib/form/Form';

export const Tag = (props: ITag) => {
    const { active, data, handleClick, closeIcon } = props;
    return <div
        className={clsx(TagsListStyles.bodyItem, { [TagsListStyles.current]: active })}
        onClick={() => { !!handleClick && handleClick(data) }}>
        {data.value}
        {closeIcon && <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M400 145.49L366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z"></path></svg>}
    </div>
}

export const mockData: IType[] = [
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

export const ListItem = (props: { data: IType, tagsMap?: ITagItem[] }) => {

    const { data, tagsMap } = props
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const [currentKey, setCurrentKey] = useState<string>()

    useEffect(() => {
        if (tagsMap) {
            const current = get(data, 'cate', []).find(item => tagsMap.find(one => Object.keys(one)[0] === item.name))
            if (current) {
                setCurrentKey(current.name)
                setIsOpen(true)
            }
        }
    }, [tagsMap])


    return <div className={clsx(TagsListStyles.blockList, { [TagsListStyles.open]: isOpen })}>
        <div className={TagsListStyles.listHeader} onClick={() => setIsOpen(!isOpen)}>
            <div className={TagsListStyles.headerLeft}>
                {get(data, 'type', '')}
            </div>
            <div className={TagsListStyles.headerRight}>
                {isOpen ?
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M696 480H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
                    : <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>}
            </div>
        </div>

        {
            <div className={isOpen ? TagsListStyles.show : TagsListStyles.hide}>

                <div className={TagsListStyles.listBody}>
                    {get(data, 'cate', []).map((item: ICate) => {
                        const name = get(item, 'name', '')
                        return <Tag
                            key={name}
                            handleClick={(value: IOption) => setCurrentKey(value.value + "")}
                            active={name === currentKey}
                            data={{ key: name, value: name }} />
                    })}
                </div>

                <div className={TagsListStyles.FormItemWrap}>
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

export interface IProps{
formData?:ITagItem
}

export default React.forwardRef((props:IProps,ref) => {

    const [form] = useForm()

    const {formData}=props;

    const [tagsMap, setTagsMap] = useState<ITagItem[]>();

    useImperativeHandle(ref, () => ({
        form,tagsMap
      }));

    const formatFormValue = (value: any): ITagItem[] => {
        const arr: ITagItem[] = [];

        for (const item in value) {
            if (value[item] !== undefined && value[item] !== '') {
                arr.push({ [item]: value[item] })
            }
        }
        return arr
    }

    const renderTags = (tagsMap: ITagItem[]): any => {
        return (tagsMap || []).map((item: any) => {
            const value = Object.values(item)[0]
            if (Array.isArray(value)) {
                return renderTags(value.map(one => ({ [Object.keys(item)[0]]: one })))
            }
            else {
                const key = Object.keys(item)[0]
                const value = Object.values(item)[0]
                // 是基本类型
                return (value !== undefined && value !== '') && <Tag
                    key={key + value}
                    active
                    data={{ key, value: value as ICommonValue }}
                    closeIcon
                    handleClick={(data) => {
                        const prevValue = form.getFieldValue(key)
                        if (Array.isArray(prevValue)) {
                            form.setFieldsValue({ [key]: prevValue.filter(item => item !== data.value) })
                        } else {
                            form.resetFields([key])
                        }
                        // 没有触发onValuesChange事件，所以我手动触发下
                        setTagsMap(formatFormValue(form.getFieldsValue()))
                    }}
                />
            }
        })
    }

    useEffect(()=>{
        if(formData){
            form.setFieldsValue(formData)
            setTagsMap(formatFormValue(formData))
        }
    },[formData])

    return <>{!!get(tagsMap, 'length', 0) && <div className={TagsListStyles.tagMap}>
        {renderTags(tagsMap as ITagItem[])}
    </div>}
        <Form form={form} onValuesChange={(value, allValue) => { console.log(allValue, 'allValue'); setTagsMap(formatFormValue(allValue)) }}>
            {mockData.map(item => <ListItem tagsMap={tagsMap}  key={item.type} data={item} />)}
        </Form>
    </>
})