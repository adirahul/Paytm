import React from "react";
import DynamicForm from "../Form";
import { FormInputInterface } from "../utils/interfaces/FormInputInterface";
import { FormInterface } from "../utils/interfaces/FormInterface";
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { notification } from "antd";





const userInputs: FormInputInterface[] = [
  {
    name: "firstName",
    placeholder: "Aditya",
    type: "text",
    required: true,
    label: "First Name",
  },
  {
    name: "lastName",
    placeholder: "Raj",
    type: "text",
    required: true,
    label: "Last Name",
  },
  {
    name: "username",
    placeholder: "aditya@gmail.com",
    type: "text",
    required: true,
    label: "Username",
    validator: async (_, value) => {
      if (!value || !/\S+@\S+\.\S+/.test(value)) {
        throw new Error("Incorrect email format");
      }
    },
  },
  {
    name: "password",
    placeholder: "Password of the user ",
    type: "password",
    required: true,
    label: "Password",
    validator: async (_, value) => {
      if (!value || value.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }
    },
  },
];




function Signup() {
  const navigate = useNavigate()
  const [api, contextHolder] = notification.useNotification();
  const onSubmit = async(formData: any) => {
    try {
      const {data} = await axios.post(`https://paytm-lake.vercel.app/api/v1/user/signup`, formData)
      console.log(data)
      const savedUser = data.data
      console.log(savedUser)
      if(data.success){
        api["success"]({
          message: data.message,
          description:
            `User saved with username:   ${savedUser.username}`,
          duration: 3
        });
        setTimeout(() => {
          navigate("/signin")
        }, 3000)
      }
      
    } catch (e) {
      console.log(e)
      api["warning"]({
        message: e.response.data.message,
        duration: 3
      })
    }
  };

  const formParams: FormInterface = {
    formName: "Sign Up",
    inputs: userInputs,
    onSubmit,
    submitBtnName: "Sign up",
  };
  
  return (
    <>
      {contextHolder}
      <div className="w-full grid place-items-center h-screen bg-slate-300">
        <div className="p-4 rounded-lg  w-80 bg-white">
          <h3 className="text-3xl font-medium text-center mb-10">{formParams.formName}</h3>
          <div>
            <DynamicForm {...formParams} />
          </div>
          <div className="ml-2">Already have an account? <button className="ml-2 text-decoration-line: underline" onClick={() => navigate("/signin")}>Sign In</button></div>
        </div>
      </div>
    </>
  );
}

export default Signup;
