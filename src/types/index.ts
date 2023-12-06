export interface OptionsType <T> {
    label: string,
    id: number,
    labelIcon ?: string,
    value: T,
}

export interface DropDownType <T> {
    options : OptionsType<T>[],
    onChange : (value: T) => any
}

export interface CompanyType {
    companyName: string,
    companyLogo: string,
    id: number
}

export type DisplayDataType <T> =  (T & {isPresent:boolean}) | {
    isPresent:boolean
}