import React ,{useState,useEffect}from 'react'
import {Box} from '@mui/material'
import Grid from '@mui/material/Grid';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { InputTextField,DatePickerField } from "../../helper/FormsInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { homeSchema } from '../../helper/validation';
import dayjs from 'dayjs';


const index = () => {
  
  const [response, setResponse] = useState({});
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm({
    resolver: yupResolver(homeSchema),
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
  const maxDate = dayjs().add(1, 'month');

  return (
    <Box sx={{ flexGrow: 1 }} style={{boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px',margin:'12% 35%',padding:'1rem'}}>
    <h3 style={{ margin: "2rem 0", textAlign: 'center' }}>Start Booking!</h3>
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
              placeholder='To'
              label='To'
              control={control}
              errors={errors.password} />
          </Grid>
          <Grid item xs={12}>
            <DatePickerField
              disablePast
              maxDate = {maxDate}
              name='date'
              label='Journey Date'
              control={control}
              errors={errors.date}
              />
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: '2rem' }} spacing={2}>
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