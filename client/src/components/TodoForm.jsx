import React from 'react';
import {Box, Button, CircularProgress, Container, DialogActions, DialogContent, TextField} from "@mui/material";
import {yupResolver} from "@hookform/resolvers/yup";
import {Controller, useForm} from "react-hook-form";
import {DatePicker, LocalizationProvider} from "@mui/lab";
import DateAdapter from '@mui/lab/AdapterMoment';
import {useMutation} from "@apollo/client";
import {ADD_TODO, UPDATE_TODO} from "../graphql/Mutation";
import {GET_TODOS} from "../graphql/Query";
import {todoSchema} from "../utils/yupValidatorSchemas";
import moment from "moment";

function TodoForm({action, handleClose, todo}) {
    const [addTodo, {loading, error}] = useMutation(ADD_TODO);
    const [updateTodo, {loading: updateLoading, error: updateError}] = useMutation(UPDATE_TODO);
    const {register, watch, handleSubmit, reset, control, formState: {errors}} = useForm(
        {
            defaultValues: {
                title: todo?.title,
                details: todo?.details,
                date: todo?.date//moment(todo?.date)?.format("MMM DD YYYY")
            },
            mode: 'onBlur',
            reValidateMode: 'onChange',
            resolver: yupResolver(todoSchema),
        }
    );
    if (loading || updateLoading) return <CircularProgress/>
    if (error) return <div>{error.message}</div>
    if (updateError) return <div>{updateError.message}</div>


    const handleSave = (data) => {
        switch (action) {
            case 'CREATE':
                addTodo({
                    variables:
                        {title: data.title, details: data?.details, date: data.date},
                    refetchQueries: [
                        {query: GET_TODOS}
                    ]
                });
                break;
            case 'UPDATE':
                updateTodo({
                    variables:
                        {id: todo.id, title: data.title, details: data?.details, date: data.date},
                    refetchQueries: [
                        {query: GET_TODOS}
                    ]
                });
                break;
            default:
                break;

        }
        handleClose();
    }
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box
                    onSubmit={handleSubmit(handleSave)}
                    component="form"
                    sx={{
                        '& > :not(style)': {m: 1},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <DialogContent>

                        <TextField
                            id='title'
                            label='Title'
                            variant="outlined"
                            margin={'normal'}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                            {...register("title")}
                            fullWidth={true}
                        />
                        <TextField
                            id='details'
                            label='Details'
                            variant="outlined"
                            margin={'normal'}
                            {...register("details")}
                            fullWidth={true}
                        />
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <Controller
                                control={control}
                                name='date'
                                render={({field: {onChange, value, name}}) => (
                                    <DatePicker
                                        label="Date"
                                        orientation={"landscape"}
                                        value={value}
                                        name={name}
                                        onChange={onChange}
                                        showTodayButton={true}
                                        renderInput={(params) => <TextField {...params}
                                                                            required
                                                                            fullWidth
                                                                            error={Boolean(errors.date)}
                                                                            helperText={errors.date?.message}
                                                                            InputLabelProps={{
                                                                                shrink: true,
                                                                            }}
                                        />}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                        {/*<TextField*/}
                        {/*    id="date"*/}
                        {/*    label="Date"*/}
                        {/*    type="date"*/}
                        {/*    {...register("date")}*/}
                        {/*    fullWidth*/}
                        {/*    error={!!errors.date}*/}
                        {/*    helperText={errors.date?.message}*/}
                        {/*    InputLabelProps={{*/}
                        {/*        shrink: true,*/}
                        {/*    }}*/}
                        {/*/>*/}

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">{action}</Button>
                    </DialogActions>
                </Box>

            </Box>
        </Container>
    );
}

export default TodoForm;
