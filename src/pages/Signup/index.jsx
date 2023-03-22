import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { signupSchema } from "../../helper/validation";
import { InputTextField } from "../../helper/FormsInput";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function Login() {

  const [response, setResponse] = useState({});

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm({
    resolver: yupResolver(signupSchema),
  });


  const submitHandler = (data) => {
    setResponse(data);
    reset();
  };

  useEffect(() => {
    if (Object.keys(response).length > 0) {
      axios
        .post("http://localhost:3120/api/signup", response)
        .then((res) => {
          const token = res.data;
          navigate('/login')
          setResponse({});
        })
        .catch((err) => {
          alert(err.response.data);
          setResponse({});
        });
    }
  }, [response]);
  const navigate = useNavigate();
  const handlelogin = () => {
    navigate("/login");
  };


  return (


      <Box sx={{ flexGrow: 1 }} style={{boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px',margin:'5% 20%',padding:'2% 5%'}}>
      <h3 style={{ margin: "2rem 0", textAlign: 'center' }}>Create An Account</h3>

      <form onSubmit={handleSubmit(submitHandler)}>
      <Grid container  spacing={2}>
        <Grid item xl={6} xs={12} >
        <InputTextField
                name='firstName'
                label='First Name'
                placeholder='First Name'
                control={control}
                errors={errors.firstName}
              />
        </Grid>
        <Grid item xl={6} xs={12} >
        <InputTextField
                name='lastName'
                placeholder='Last Name'
                label='Last Name'
                control={control}
                errors={errors.lastName}
                
              />
        </Grid>
        <Grid item xl={6} xs={12} >
        <InputTextField
                name='email'
                placeholder='Email'
                label='Email'
                control={control}
                errors={errors.email}
              />
        </Grid>
        <Grid item xl={6} xs={12} >
        <InputTextField
                name='mobileNumber'
                placeholder='Phone Number'
                label='Phone Number'
                control={control}
                errors={errors.mobileNumber}
              />
        
        </Grid>
        <Grid item xl={6} xs={12} >
        <InputTextField
                name='companyName'
                placeholder='Company Name'
                label='Company Name'
                control={control}
                errors={errors.companyName}
              />
          </Grid>

        <Grid item xl={6} xs={12} >
        <InputTextField
                name='address'
                placeholder='Address'
                label='Address'
                control={control}
                errors={errors.address}
              />
        </Grid>

        <Grid item xl={6} xs={12} >
        <InputTextField
                name='city'
                placeholder='City'
                label='City'
                control={control}
                errors={errors.city}
              />
        </Grid>

        <Grid item xl={6} xs={12} >
        <InputTextField
                name='state'
                placeholder='State'
                label='State'
                control={control}
                errors={errors.state}
                />         
        </Grid>
        <Grid item xl={6} xs={12}>
        <InputTextField
                name='country'
                placeholder='Country'
                label='Country'
                control={control}
                errors={errors.country}
                />         
        </Grid>
        <Grid item xl={6} xs={12} >
        <InputTextField
                name='pincode'
                placeholder='Pincode'
                label='Pincode'
                control={control}
                errors={errors.pincode}
                />         
        </Grid>
        <Grid item xl={6} xs={12} >
        <InputTextField
                name='password'
                placeholder='Password'
                label='Password'
                control={control}
                errors={errors.password}
                />         
        </Grid>
        <Grid item xl={6} xs={12} >
        <InputTextField
                name='confirmPassword'
                placeholder='Confirm Password'
                label='Confirm Password'
                control={control}
                errors={errors.confirmPassword}
              />         
        </Grid>
   
        </Grid>
        <Grid container style={{marginTop:'2rem'}} spacing={2}>
        <Grid item sm={12}>
        <Button variant="contained" type="submit"  style={{width:'80%',margin:'0 10%'}}>
              Create Account
          </Button>
        </Grid>

        <Grid item sm={12}>
          <p style={{textAlign:'center'}}>Already have a account<span onClick={handlelogin} style={{marginLeft:'.5rem',cursor:"pointer",color:'blue'}}>Login in</span></p>
        </Grid>
      </Grid>
      </form>
    </Box>

  );
}

export default Login;
