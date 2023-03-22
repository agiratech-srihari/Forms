import React, { useState, useEffect } from "react";


import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
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

      <Box sx={{ flexGrow: 1 }} style={{boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px',margin:'12% 35%',padding:'1rem'}}>
      <h3 style={{ margin: "2rem 0", textAlign: 'center' }}>Welcome Back!</h3>
      <form onSubmit={handleSubmit(submitHandler)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputTextField
                name='email'
                label='Email'
                placeholder='Email'
                control={control}
                errors={errors.email} />
            </Grid>
            <Grid item xs={12}>
              <InputTextField
                name='password'
                placeholder='Password'
                label='password'
                control={control}
                errors={errors.password} />
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: '2rem' }} spacing={2}>
            <Grid item sm={12}>
              <p onClick={handlePassword} style={{ textAlign: 'end', color: 'blue',cursor:'pointer' }}>
                forgetpassword?
              </p>
            </Grid>
            <Grid item sm={12}>
              <Button variant="contained" type="submit" style={{ width: '100%',  }}>
                Login
              </Button>
            </Grid>

            <Grid item sm={12}>
            <p>Don't have a account?<span onClick={handlesignup} style={{marginLeft:'.5rem',cursor:"pointer",color:'blue'}}>Sign-up</span></p>
            </Grid>
          </Grid>
        </form>
    </Box>

  );
}

export default Login;
