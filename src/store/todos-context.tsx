import { createContext, useState, useCallback } from 'react';

export interface Todo {
    completed: boolean,
    id: string,
    title: string,
    userId: string
  }

export interface todosContextData {
    todos: Todo[],
    doneTodos: Todo[],
    loading: boolean,
    fetching: boolean,
    isFetching: () => void;
    fetchTodos: () => void;
    addTodo: (todo: Todo) => void;
    markTodo: (completed: boolean, todo: Todo) => void;
    changeTodo: (todo: Todo, newTitle: string) => void;
    removeTodo: (todo: Todo) => void;
}

export const todosContextDefaultValue = {
    todos: [],
    doneTodos: [],
    loading: false,
    fetching: false,
    isFetching: () => null,
    fetchTodos: () => null,
    addTodo: () => null,
    markTodo: () => null,
    changeTodo: () => null,
    removeTodo: () => null

}

export const TodosContext = createContext<todosContextData>(todosContextDefaultValue);

export function TodosContextProvider(props:any) {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [doneTodos, setDoneTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(false)
    const [fetching, setFetching] = useState<boolean>(true)

    const fetchTodos = useCallback(() => {
        if (!fetching) {return;}
        setLoading(true)
        fetch('https://jsonplaceholder.typicode.com/todos/')
        .then(response => response.json())
        .then((json:Todo[]) => {
            const todos = json.slice(0, 10)                      // Set how many todos we should fetch
            todos.forEach((elem, index) => { elem.completed = false; elem.id = `${index}` });   // clean up 
            setTodos([...todos])
        })
        .finally(() => {
            setLoading(false)
        })
    }, [fetching]);

    function addTodo(todo: Todo) {
        setTodos(todos.concat([todo]))
    }

    function markTodo(completed: boolean, todo: Todo) {
        todo.completed = !completed;
        if (completed) {
            setDoneTodos(prevTodo => prevTodo.filter((elem: Todo) => elem !== todo));
            setTodos(todos.concat([todo]))
        } else {
            setTodos(prevTodo => prevTodo.filter((elem: Todo) => elem !== todo));
            setDoneTodos(doneTodos.concat([todo]))
        }
    };

    function isFetching() {
        if (!fetching) {
            fetchTodos();
        } else {
            todos.forEach(todo => {
                if (todo.userId !== "not-implemented") {
                    setTodos(prevTodo => prevTodo.filter((elem: Todo) => elem !== todo));
                    setTodos(prevTodo => prevTodo.filter((elem: Todo) => elem !== todo));
                }
            });
        }
        setFetching(!fetching)
    }

    function changeTodo(todo: Todo, newTitle: string) {
        setFetching(false)
        if(!todo.completed) {
            setTodos(
                todos.map(elem => 
                    elem.id === todo.id 
                    ? {...elem, title : newTitle} 
                    : elem 
            ))
            console.log(todos);
        } else {
            setDoneTodos(
                todos.map(elem => 
                    elem.id === todo.id 
                    ? {...elem, title : newTitle} 
                    : elem 
            ))
        }
    }

    function removeTodo(todo: Todo) {
        setFetching(false)
        if(!todo.completed) {
            setTodos(prevTodo => prevTodo.filter((elem: Todo) => elem !== todo));
        } else {
            setDoneTodos(prevTodo => prevTodo.filter((elem: Todo) => elem !== todo));
        }
    }

    return <TodosContext.Provider value={{
        todos,
        doneTodos,
        loading,
        fetching,
        isFetching,
        fetchTodos,
        addTodo,
        markTodo,
        changeTodo,
        removeTodo
      }}>
        {props.children}
    </TodosContext.Provider>    
}

export default TodosContext;