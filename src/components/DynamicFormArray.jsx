import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, FormGroup } from '@mui/material';
import { DynamicFormSchema } from '../helper/validation';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { InputLabel, Select, MenuItem,FormControl ,FormHelperText} from '@mui/material';
export default function DynamicFormArray() {
  const [data, setData] = useState();

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      listArray: [{ firstName: '', lastName: '', age: undefined, gender: '' }]
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
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        '& > :not(style)': { m: 1 },
      }}
    >

      <form>
        {fields.map((field, index) => (
          <div key={field.id}>
            <div style={{ margin: '1rem' }}>
              <Controller
                name={`listArray[${index}].firstName`}
                control={control}
                // rules={{required:true}}
                defaultValue={field.firstName}
                render={({ field }) => (
                  <TextField
                    label={`FirstName`}
                    variant="outlined"
                    {...field}
                    // style={{width:'50%'}}
                    error={errors.listArray?.[index]?.firstName !== undefined}
                    helperText={errors.listArray?.[index]?.firstName?.message}
                  />
                )}
              />

              <Controller
                name={`listArray[${index}].lastName`}
                control={control}
                // rules={{required:true}}
                defaultValue={field.lastName}
                render={({ field }) => (
                  <TextField
                    label={`LastName`}
                    variant="outlined"
                    // style={{width:'50%'}}

                    {...field}
                    error={errors.listArray?.[index]?.lastName !== undefined}
                    helperText={errors.listArray?.[index]?.lastName?.message}
                  />
                )}
              />
              <Controller

                name={`listArray[${index}].age`}
                control={control}
                // rules={{required:true}}
                defaultValue={field.age}
                render={({ field }) => (
                  <TextField
                    label="Age"
                    variant="outlined"
                    {...field}
                    // style={{width:'100%'}}

                    error={errors.listArray?.[index]?.age !== undefined}
                    helperText={errors.listArray?.[index]?.age?.message}
                  />
                )}
              />
              <Controller
                name={`listArray[${index}].gender`}
                control={control}
                rules={{required:true}}
                defaultValue={field.gender}
                render={({ field }) => {
                  
                  return (
                    <FormControl style={{width:'25%'}}>
                      <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Gender"
                        {...field}
                        error={errors.listArray?.[index]?.gender !== undefined}
                      >
                        <MenuItem value={'M'}>Male</MenuItem>
                        <MenuItem value={'F'}>Female</MenuItem>
                        <MenuItem value={'O'}>Others</MenuItem>
                      </Select>
                      <FormHelperText style={{color:'red'}}>{errors.listArray?.[index]?.gender?.message}</FormHelperText>
                    </FormControl>
                  );
                }}
              />
              {fields.length !== 1 && <Button
                style={{ height: '3.5rem', borderRadius: '50px' }}
                disableRipple
                onClick={() => remove(index)}><RemoveIcon /></Button>}
            </div>

            <div >
              
              {fields.length - 1 === index &&
                <Button disableRipple onClick={handleSubmit(() => append({ firstName: '', lastName: '', age: undefined ,gender: ''}))}>
                  <AddIcon />
                </Button>}
            </div>
          </div>
        ))
        }
        < Button disableRipple onClick={handleSubmit(onSave)}>Submit</Button>
      </form>
    </div >
  );
}