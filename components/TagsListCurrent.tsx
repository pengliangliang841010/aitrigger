import clsx from 'classnames';
import React, { Dispatch, SetStateAction, useEffect, useImperativeHandle, useState } from 'react';
import TagsListStyles from '../styles/TagsList.module.scss'
import { cloneDeep, get } from 'lodash';
import { IOption, ITagCurrent, ITagItemCurrent, ITypeCurrent } from '../interfaces/createCurrent';

export const Tag = (props: ITagCurrent) => {
    const { active, data, handleClick, closeIcon } = props;
    return <div
        className={clsx(TagsListStyles.bodyItem, { [TagsListStyles.current]: active })}
        onClick={() => { !!handleClick && handleClick(data) }}>
        {data.label}
        {closeIcon && <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M400 145.49L366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z"></path></svg>}
    </div>
}

export const mockData: ITypeCurrent[] = [
    {
        name: "Base",
        type: "radio",
        cate: [
            { label: "woman", value: "base_woman_default" },
            { label: "model", value: "base_model" },
            { label: "miss universe model", value: "base_miss_universe" },
            { label: "milf", value: "base_milf" },
            { label: "celebrity", value: "base_celebrity" },
            { label: "athlete", value: "base_athlete" },
            { label: "bodybuilder", value: "base_bodybuilder" },
            { label: "lingerie_model", value: "base_lingerie_model" },
            { label: "cyborg", value: "base_cyborg" },
            { label: "sorority", value: "base_sorority" },
            { label: "bimbo", value: "base_bimbo" },
            { label: "woman + man", value: "base_man_woman" },
        ]
    }, {
        name: "Number of people",
        type: "radio",
        cate: [
            { label: "one", value: "number_one_default" },
            { label: "two", value: "number_two" },
            { label: "several", value: "number_group" },
        ]
    },
    {
        name: "Body",
        type: "checkbox",
        cate: [
            { label: "busty", value: "tags_busty" },
            { label: "huge boobs", value: "tags_huge_boobs" },
            { label: "perfect boobs", value: "tags_perfect_boobs" },
        ]
    }
]

export const ListItem = (props: { setTagsMap: Dispatch<SetStateAction<ITagItemCurrent>>, data: ITypeCurrent, tagsMap: ITagItemCurrent }) => {

    const { data, tagsMap, setTagsMap } = props
    const name = data.name
    const { type } = data;
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const [currentKey, setCurrentKey] = useState<IOption[]>([])

    useEffect(() => {
        if (tagsMap && tagsMap[name] && Array.isArray(tagsMap[name])) {
            const current = get(data, 'cate', [])
                .filter(item => tagsMap[name].find(w => w.value === item.value))
            if (current.length) {
                setCurrentKey(current)
                setIsOpen(true)
            }else{
                setCurrentKey([]) 
            }
        }
    }, [tagsMap])


    return <div className={clsx(TagsListStyles.blockList, { [TagsListStyles.open]: isOpen })}>
        <div className={TagsListStyles.listHeader} onClick={() => setIsOpen(!isOpen)}>
            <div className={TagsListStyles.headerLeft}>
                {name}
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
                    {get(data, 'cate', []).map((item: IOption) => {

                        return <Tag
                            key={item.value}
                            handleClick={(value: IOption) => {
                                let nextValue;
                                if (!currentKey.find(c => c.value === value.value)) {
                                    nextValue = type === "checkbox" ? currentKey.concat([value]) : [value]
                                    setCurrentKey(nextValue)
                                    tagsMap[name] = nextValue
                                    setTagsMap(cloneDeep(tagsMap))
                                }
                            }
                            }
                            active={currentKey.includes(item)}
                            data={item} />
                    })}
                </div>

            </div>
        }
    </div>
}

export interface IProps {
    formData?: ITagItemCurrent
}

export default React.forwardRef((props: IProps, ref) => {

    const { formData } = props

    const [tagsMap, setTagsMap] = useState<ITagItemCurrent>({});

    useImperativeHandle(ref, () => ({
         tagsMap
    }));

    const renderTags = (tagsMap: ITagItemCurrent): any => {
        const valueAll = Object.values(tagsMap)
        const keyAll = Object.keys(tagsMap)
        return (valueAll || []).map((item: IOption[], index) => {
            return (

                item.map((one: IOption, index2) => <Tag
                    key={one.value}
                    active
                    data={one}
                    closeIcon
                    handleClick={(data: IOption) => {
                        const nextValue = item.filter(i => i.value !== data.value)
                        //@ts-ignore
                        tagsMap[keyAll[index]] = nextValue
                        setTagsMap(cloneDeep(tagsMap))
                    }}
                />)


            )



        })
    }

    useEffect(() => {
        if (formData) {
            setTagsMap(formData)
        }
    }, [formData])

    return <>{!!Object.keys(tagsMap).length && <div className={TagsListStyles.tagMap}>
        {renderTags(tagsMap as ITagItemCurrent)}
    </div>}
        {mockData.map((item, index) => <ListItem setTagsMap={setTagsMap} tagsMap={tagsMap} key={item.name} data={item} />)}

    </>
})