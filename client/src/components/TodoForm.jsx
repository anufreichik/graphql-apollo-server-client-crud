import React from 'react';
import {Box, Button, CircularProgress, Container, DialogActions, DialogContent, TextField} from "@mui/material";
import {useMutation} from "@apollo/client";
import {ADD_TODO, UPDATE_TODO} from "../graphql/Mutation";
import {GET_TODOS} from "../graphql/Query";

function TodoForm({action, handleClose, todo}) {
    const [addTodo, { loading, error}] = useMutation(ADD_TODO);
    const [updateTodo, {loading: updateLoading, error: updateError}] = useMutation(UPDATE_TODO);

    if(loading || updateLoading) return <CircularProgress/>
    if(error) return <div>{error.message}</div>
    if(updateError) return <div>{updateError.message}</div>


    const handleSave = () => {
        switch (action) {
            case 'CREATE':
                addTodo({
                    variables:
                        {title: "Dinner1", details: "dinner details1", date: "2022-02-23"},
                    refetchQueries: [
                        {query: GET_TODOS}
                    ]
                });
                break;
            case 'UPDATE':
                updateTodo({
                    variables:
                        {id:todo.id, title: "Dinner1", details: "dinner details1", date: "2022-02-23"},
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

                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': {m: 1},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="title" label="Title" variant="outlined" fullWidth/>
                        <TextField id="details" label="Details" variant="outlined" fullWidth/>
                        <TextField id="date" label="Date" variant="outlined" fullWidth/>
                        <TextField
                            id="date"
                            label="Date"
                            type="date"
                            fullWidth
                            defaultValue="2022-01-01"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" onClick={handleSave}>Save</Button>
                </DialogActions>


            </Box>
        </Container>
    );
}

export default TodoForm;
