export interface FormInputInterface{
    name: string,
    type: string,
    placeholder: string,
    required: boolean,
    label: string,
    validator?: (_: any, value: string | undefined) => Promise<void>;
    className?:string;
}