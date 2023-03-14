import * as yup from 'yup';

export const DynamicFormSchema = yup.object().shape({
    listArray: yup.array().of(
      yup.object().shape({
        firstName: yup.string().required("First Name is required"),
        lastName: yup.string().required("Last Name is required"),
        age: yup.number()
        .positive(`Age can't be a minus value`)
        .min(1)
        .max(100)
        .required('Age is required')
      })
    )
  });
  