export type ICommonValue = string | number;

// tag组件
export interface IOption { key: string, value: ICommonValue }

export interface ITag {
    active: boolean,
    data: IOption,
    closeIcon?: boolean,
    handleClick?: (value: IOption) => void
}

export interface IType {
    type: string;
    cate: ICate[]
}

export interface ICate {
    name: string;
    form: IForm
}

export interface IForm {
    type: "radio" | "checkbox"
    cate: (ICommonValue)[]
}

export interface ITagItem {
    [x: string]: ICommonValue | ICommonValue[]
}