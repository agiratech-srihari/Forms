import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Container } from '@mui/system';
import RouterLayout from './router/RouterLayout';

const schema = yup.object().shape({
  list: yup.array().of(
    yup.object().shape({
      firstName: yup.string().required("First Name is required"),
      lastName: yup.string().required("Last Name is required")
    })
  )
});

const App = () => {



  return (
    <div>
      <RouterLayout />
    </div>
  )
}

export default App;