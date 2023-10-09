export type ICommonValue = string ;

// tag组件
export interface IOption { label: string, value: ICommonValue }

export interface ITagCurrent {
    active: boolean,
    data:IOption;
    closeIcon?: boolean,
    handleClick?: (value: IOption) => void
}

export interface ITypeCurrent {
    name: string;
    type:"radio"|"checkbox"
    cate: IOption[]
}

export interface IForm {
    type: "radio" | "checkbox"
    cate: (ICommonValue)[]
}

export interface ITagItemCurrent {
    [x: string]:  IOption[]
}