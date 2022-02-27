import {gql} from "apollo-server-express";

const typeDefs = gql`
    scalar Date
    
    type Todo{
        id:ID
        title:String
        details:String
        date:Date
    }
    
    type Query{
        welcome:String
        getTodos:[Todo]
        getTodo(id:ID):Todo
    }
    
    type Mutation{
        addTodo(title:String, details:String, date:Date):Todo
        deleteTodo(id:ID):String
        updateTodo(id:ID, title:String, details:String, date:Date ):Todo
    }
`

export default typeDefs;
