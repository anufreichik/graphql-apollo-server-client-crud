import { gql } from '@apollo/client';

export const DELETE_TODO = gql`
    mutation DeleteTodo($id: ID!) {
        deleteTodo(id: $id) 
    }
`;

export const ADD_TODO = gql`
    mutation AddTodo($title: String!, $details:String!, $date:Date) {
        addTodo(title: $title, details:$details, date:$date ) {
            id
            title
            details
            date
        }
    }
`;

export const UPDATE_TODO = gql`
    mutation UpdateTodo($id: ID!,$title: String!, $details:String!, $date:Date) {
        updateTodo(id:$id, title: $title, details:$details, date:$date ) {
            id
            title
            details
            date
        }
    }
`;
