import Todo from "./models/Todo.js";

const resolvers={
    Query:{
        welcome:()=>{
            return "Welcome to application, Marina!"
        },
        getTodos: async ()=>{
            const todos = await Todo.find();
            return todos;
        },
        getTodo:async (root, args)=>{
            const todo = Todo.findById(args.id);
            return todo;
        }

    },
    Mutation:{
        addTodo:async (root, args)=>{
            const newTodo = new Todo({title: args.title, details: args.details, date: args.date});
            await newTodo.save();
            return newTodo;

        },
        deleteTodo:async (root, args)=>{
           await Todo.findByIdAndDelete(args.id);
           return "The todo delete successfully";

        },
        updateTodo: async(root, args)=>{
           const {id, title, details, date}=args;
           const updatedTodo={};
           if(title!=undefined){
               updatedTodo.title=title;
           }
            if(details!=undefined){
                updatedTodo.details=details;
            }
            if(date!=undefined){
                updatedTodo.date=date;
            }
            const todo = await Todo.findByIdAndUpdate(id, updatedTodo, {new:true});
            return todo;
        }
    }
}
export default resolvers;
