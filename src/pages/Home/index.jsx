import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { InputTextField } from "../../helper/FormsInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const index = () => {
  
  const [response, setResponse] = useState({});
  const navigate = useNavigate();

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
  const handlelogin = () => {
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }} style={{boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px',margin:'12% 35%',padding:'1rem'}}>
    <h3 style={{ margin: "2rem 0", textAlign: 'center' }}>Welcome Back!</h3>
    <form onSubmit={handleSubmit(submitHandler)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputTextField
              name='from'
              label='From'
              placeholder='From'
              control={control}
              errors={errors.email} />
          </Grid>
          <Grid item xs={12}>
            <InputTextField
              name='to'
              placeholder='to'
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
              Book Ticket
            </Button>
          </Grid>
        </Grid>
      </form>
  </Box>

  )
}

export default index