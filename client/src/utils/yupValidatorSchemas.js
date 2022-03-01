import * as yup from 'yup';

export const todoSchema = yup.object().shape({
    title: yup.string().trim().required('Title is required'),
    details: yup.string().trim().notRequired(),
    date: yup.date().nullable().required('Date is required'),
});
