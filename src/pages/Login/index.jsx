import React, { useState, useEffect } from "react";


import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Login.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { loginSchema } from "../../helper/validation";
import { InputTextField } from "../../helper/FormsInput";


function Login() {

  const [response, setResponse] = useState({});

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm({
    resolver: yupResolver(loginSchema),
  });


  const submitHandler = (data) => {
    setResponse(data);
    reset();
  };

  useEffect(() => {
    if (Object.keys(response).length > 0) {
      axios
        .post("http://localhost:3120/api/login", response)
        .then((res) => {
          const token = res.data;
          navigate('/')
          setResponse({});
        })
        .catch((err) => {
          alert(err.response.data);
          setResponse({});
        });
    }
  }, [response]);
  const navigate = useNavigate();
  const handlesignup = () => {
    navigate("/signup");
  };
  const handlePassword = () => {
    navigate("/forgetpassword");
  };

  return (
    <div className="login">

      <div className="login__container">
        <h3 style={{ margin: "2rem 0" ,textAlign:'center'}}>Welcome Back!</h3>

        <div style={{ display: "block" }}>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="form-cont">

          <InputTextField 
                name='email'
                label='Email'
                placeholder='Email'
                control={control}
                errors={errors.email}
                style = {{width:'100%'}}
                />
                </div>
            <div className="form-cont">
            <InputTextField 
                name={`password`}
                label='Password'
                placeholder='Password'
                control={control}
                errors={errors.password}
                style = {{width:'100%'}}
                />

            </div>

            <p onClick={handlePassword} className="fgtps">
              forgetpassword?
            </p>
            <Button variant="contained" type="submit" className="submit__button" style={{width:"100%" , margin:'1rem 0'}}>
              Login
            </Button>
          </form>
        </div>
          <div className="signup-for-cont">
          <p>Don't have a account?<span onClick={handlesignup} className="fgtps">Sign-up</span></p>
          </div>
      </div>
    </div>
  );
}

export default Login;
