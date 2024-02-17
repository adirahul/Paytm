import { Button, Form, Input } from "antd";
import React from "react";
import { FormInputInterface } from "../utils/interfaces/FormInputInterface";
import { FormInterface } from "../utils/interfaces/FormInterface";

const renderInput = (input: FormInputInterface) => {
   return (
      <div key={input.name}>
         <label>{input.label}</label>
         <Form.Item
            name={input.name}
            wrapperCol={{ span: 24 }}
            rules={[
               {
                  required: input.required,
                  message: `Please enter ${input.label}`,
               },
               { validator: input.validator },
            ]}
         >
            <Input placeholder={input.placeholder} type={input.type} />
         </Form.Item>
      </div>
   );
};


const DynamicForm: React.FC<FormInterface> = ({
   inputs,
   formName,
   onSubmit,
   submitBtnName
}) => {
   const [form] = Form.useForm();

   const submitForm = (data: any) => {
      onSubmit(data);
      form.resetFields();
   };
   return (
      <Form
        form={form}
         name={formName}
         onFinish={(data) => submitForm(data)}
         className="w-full"
      >
         {inputs?.map((input: FormInputInterface) => renderInput(input))}
         <Form.Item wrapperCol={{ span: 24 }}>
            <Button
               htmlType="submit"
               className="w-full text-white font-medium bg-gray-800 hover:bg-gray-900 "
            >
               {submitBtnName ?? 'Submit'}
            </Button>
         </Form.Item>
      </Form>
   );
};

export default DynamicForm;
