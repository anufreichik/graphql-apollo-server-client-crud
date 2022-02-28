import React,{useState} from 'react';
import {
    Avatar,
    Box, Button, Dialog, DialogTitle,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    styled,
    Typography
} from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TodoForm from "./TodoForm";
import {GET_TODOS} from '../graphql/Query';
import {useMutation, useQuery} from '@apollo/client';
import {DELETE_TODO} from "../graphql/Mutation";
import moment from "moment";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
}));
const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));


function TodoList() {
    const {loading, error, data} = useQuery(GET_TODOS);
    const [deleteTodo] = useMutation(DELETE_TODO);
    const [currentTodo, setCurrentTodo] = useState(undefined);
    const [dense, setDense] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [action, setAction] = useState('CREATE');

    if(loading) return <div>Loading...</div>;
    if(error) return <div>{error.message}</div>;

    const handleClickOpen = (action) => {
        setAction(action)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdateTodo=(todo)=>{
        setAction('UPDATE');
        setCurrentTodo(todo);
        setOpen(true);
    }
    const handleDeleteToDo=(id)=>{
       deleteTodo({
           variables: {
               id:id
           } , refetchQueries:[
               {query: GET_TODOS}
           ]
       });
    }
    return (
        <>
            <Box
                sx={{
                    p: 1,
                    backgroundColor: 'background.default',
                    display: 'flex',
                    justifyContent:'center',
                    gap: 2,
                }}
            >

                <Grid item xs={12} md={6}>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                       TODO List
                    </Typography>
                    <Button variant="text" onClick={()=>handleClickOpen('CREATE')}>Create ToDo</Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>{`${action} TODO`}</DialogTitle>
                            <TodoForm action={action} handleClose={handleClose} todo={currentTodo}/>
                    </Dialog>
                    <Demo>
                        <List dense={dense}>
                            {data && data.getTodos.map((todo) =>(
                                 <ListItem key={todo.id}
                                    secondaryAction={
                                     <>

                                         <IconButton edge="end" aria-label="delete">
                                             <EditIcon  onClick={()=>handleUpdateTodo(todo)}/>
                                         </IconButton>
                                         <IconButton edge="end" aria-label="delete" onClick={()=>handleDeleteToDo(todo.id)}>
                                             <DeleteIcon />
                                         </IconButton>
                                     </>

                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={todo.title}
                                        secondary={todo.details ? todo.details : null}
                                    />
                                     <ListItemText>
                                         <Typography>{moment(todo.date).format("MMM DD YYYY")}</Typography>
                                     </ListItemText>

                                </ListItem>
                            ))}
                        </List>
                    </Demo>
                </Grid>


            </Box>
        </>
    );
}

export default TodoList;
