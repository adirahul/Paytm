import { FormInputInterface } from "./FormInputInterface";

export interface FormInterface {
    inputs: FormInputInterface[];
    formName: string;
    onSubmit: (data: any) => void;
    submitBtnName: string;
 }
 