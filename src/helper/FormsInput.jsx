import * as React from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { FormControl, FormControlLabel, RadioGroup ,FormHelperText} from "@mui/material";
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';


export const AutocompleteField = (props) => {
  const { control, options, name, multiple } = props;
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: "This field is requried*"
      }}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ref } = field;
        return (
          <>
            <Autocomplete

            multiple = { multiple}
              // value={
              //   value
              //     ? options.find((option) => {
              //   return value === option.code;
              //       }) ?? null
              //     : null
              // }
              getOptionLabel={(option) => {
                return option.label
              }}
              renderOption= {(props, option, { selected }) => (
                <li {...props} style={{ color: 'red' }}> {option.label} </li> 
              )}
              onChange={(event, newValue) => {
                console.log('newValue', newValue);
                onChange(newValue ? newValue.code : null);
              }}
              id="controllable-states-demo"
              options={options}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={props.placeholder}
                  inputRef={ref}
                />
              )}
            />
            {error ? (
      <FormHelperText style={{color:'#d32f2f',marginLeft:'1rem'}}>{error.message}</FormHelperText>
             
            ) : null}
          </>
        );
      }}
    />
  );
};

// export const AutocompleteFieldMultiple = (props) => {
//   const { control, options, name, multiple } = props;
//   return (
//     <Controller
//       name={name}
//       control={control}
//       rules={{
//         required: "This field is requried*"
//       }}
//       defaultValue = {[]}
//       render={({ field, fieldState: { error } }) => {
//         const { onChange, value, ref } = field;
//         return (
//           <>
//             <Autocomplete
//               // value={
//               //   value
//               //     ? options.find((option) => {
//               //   return value === option.code;
//               //       }) ?? null
//               //     : null
//               // }
//               multiple
//              defaultValue = {[]}

//               getOptionLabel={(option) => {
//                 return option.label
//               }}
//               renderOption= {(props, option, { selected }) => (
//                 <li {...props} style={{ color: 'red' }}> {option.label} </li> 
//               )}
//               onChange={(event, newValue) => {
//                 console.log('newValue', newValue);
//                 onChange(newValue ? newValue.code : []);
//               }}
//               id="controllable-states-demo"
//               options={options}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label={props.placeholder}
//                   inputRef={ref}
//                 />
//               )}
//             />
//             {error ? (
//       <FormHelperText style={{color:'#d32f2f',marginLeft:'1rem'}}>{error.message}</FormHelperText>
             
//             ) : null}
//           </>
//         );
//       }}
//     />
//   );
// };


export const InputTextField = (props) => {
  const { control, name, errors } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...props}
          {...field}
          error={errors}
          helperText={errors?.message}
          fullWidth
        />
      )}
      />
  )
}

export const InputRadioField = (props) => {
  const { control, name, errors,options, rules } = props;
  return (
    <Controller
    control={control}
    name={name}
    rules={rules}
    render={({ field,fieldState: { error }  }) => (
      
      <div>

      <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
      
      <RadioGroup
      row
      {...props}
      {...field}
      error={Boolean(errors[name])}
      // helperText={errors[name]?.message}
      >
        {options.map((item)=> {
          return (
            <FormControlLabel
            value={item}
            control={<Radio/>}
            label={item}
            />
            )
          })}
      </RadioGroup>
      <FormHelperText style={{color:'#d32f2f',marginLeft:'1rem'}}>{errors[name]?.message}</FormHelperText>
      </div>
        
    )}

    />
  )
}


