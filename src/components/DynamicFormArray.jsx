
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import { DynamicFormSchema } from '../helper/validation';

export default function DynamicFormArray() {
  const [data, setData] = useState();

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      listArray: [{ firstName: '', lastName: '', age: '' }]
    },
    resolver: yupResolver(DynamicFormSchema)
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "listArray"
  });

  const onSave = data => {
    setData({ ...data });
    console.log(data)
  }
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        '& > :not(style)': { m: 1 },
      }}
    >

      <form>
        {fields.map((field, index) => (
          <div key={field.id}>
            <div>

              <Controller
                name={`listArray[${index}].firstName`}
                control={control}
                defaultValue={field.firstName}
                render={({ field }) => (
                  <TextField
                    label={`FirstName`}
                    variant="outlined"
                    {...field}
                    style={{width:'50%'}}
                    error={errors.listArray?.[index]?.firstName !== undefined}
                    helperText={errors.listArray?.[index]?.firstName?.message}
                  />
                )}
              />

              <Controller
                name={`listArray[${index}].lastName`}
                control={control}
                defaultValue={field.lastName}
                render={({ field }) => (
                  <TextField
                    label={`LastName`}
                    variant="outlined"
                    style={{width:'50%'}}

                    {...field}
                    error={errors.listArray?.[index]?.lastName !== undefined}
                    helperText={errors.listArray?.[index]?.lastName?.message}
                  />
                )}
              />
            </div>
            <div>
            <Controller
              
              name={`listArray[${index}].age`}
              control={control}
              defaultValue={field.age}
              render={({ field }) => (
                <TextField
                  label={`Age`}
                  variant="outlined"
                  {...field}
                  style={{width:'100%'}}

                  error={errors.listArray?.[index]?.age !== undefined}
                  helperText={errors.listArray?.[index]?.age?.message}
                />
              )}
            />
            </div>
            <div className="btn-box">
              {fields.length !== 1 && <Button
                onClick={() => remove(index)}>Remove</Button>}
              {fields.length - 1 === index && <Button onClick={() => append({ firstName: '', lastName: '' })}>Add</Button>}
            </div>
          </div>
        ))
        }
        < Button onClick={handleSubmit(onSave)}>Submit</Button>
      </form>
    </Box >
  );
}