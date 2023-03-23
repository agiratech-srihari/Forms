import * as yup from 'yup';

const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;

const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

export const DynamicFormSchema = yup.object().shape({
  listArray: yup.array().of(
    yup.object().shape({
      firstName: yup.string().required("First Name is required"),
      lastName: yup.string().required("Last Name is required"),
      age: yup.number()
        .min(1)
        .max(120)
        .nullable()
        .required('Age is required')
        .typeError('Age must be a Number'),
      gender: yup.string().required('Gender is required')
    })
  )
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegex, "must be a valid email")
    .required("Email Id is required"),
  password: yup
    .string()
    .matches(
      passwordRegex,
      "password must contain atleast one 'A''a''@''1' and min lenght of 8"
    )
    .required("password is required"),
});

export const signupSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .matches(emailRegex, "Must be a valid email")
    .required("Email Id is required"),
  password: yup
    .string()
    .matches(passwordRegex, "Enter a valid password")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  mobileNumber: yup
    .number()
    // .matches(/[6-9]{1}[0-9 ]{4}[0-9 ]{4}[0-9]{3}/, {
    //   message: "Invalid  number",
    //   excludeEmptyString: false,
    // })
    .nullable()
    .test('len', 'Must be exactly 10 characters', val => val.length === 10)
    .required('Phone Number is required')
    .typeError('Phone Number must be number'),
  companyName: yup
    .string()
    .required('Company Name is required'),
  city: yup
    .string()
    .required("City is required") ,
  address: yup 
    .string()
    .required("Address is required"),
  pincode: yup
    .number()
    .test('len', 'Must be exactly 6 characters', val => val.toString().length === 6)
    .nullable()
    .required("Pincode is required")
    .typeError('Pincode must be number'),
  country: yup 
    .string()
    .required("Country is required"),
  state: yup
    .string()
    .required("State is required")
  
});


export const homeSchema = yup.object().shape({
  from: yup
    .string()
    .required("Please Update from Location"),
  to: yup
    .string()
    .required("Please Update to Location"),
});
