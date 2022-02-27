import React from 'react';
import {Box, Button, Container, DialogActions, DialogContent, TextField} from "@mui/material";

function TodoForm({action, handleClose, todo}) {
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
                    <Button type="submit">Save</Button>
                </DialogActions>


            </Box>
        </Container>
    );
}

export default TodoForm;
