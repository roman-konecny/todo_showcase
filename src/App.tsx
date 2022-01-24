import { useEffect, useContext, useState } from "react";
import TodoItem from './Todo';
import { TodosContext, Todo } from "./store/todos-context";

function useTodosLoading() {
  const { fetchTodos } = useContext(TodosContext);
  
  useEffect(() => {
      fetchTodos();
    }, [fetchTodos])
}

const App:React.FC = () => {
  const  { todos, doneTodos, loading, fetching, addTodo, isFetching } = useContext(TodosContext);
  const [listType, setListType] = useState<boolean>(true);
  const [newTodo, setNewTodo] = useState<string>("");

  useTodosLoading();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const todo: Todo = {} as Todo;
    todo.completed = false;
    todo.title = newTodo;
    todo.id = `${Math.random() * 1000}`;
    todo.userId = "not-implemented";
    console.log(todo);
    addTodo(todo);
  }

  return (
    <div className="todoList">
      <div className="header">
        <h1>ToDo List</h1>
        <button className={`${fetching}`} onClick={() => isFetching()}>Fetch</button>
      </div>
      <button className={listType ? "first-tab is-active" : "first-tab"} onClick={() => {setListType(true)}}>Your Todos</button>
      <button className={listType ? "" : "is-active"} onClick={() => {setListType(false)}}>Completed Todos</button>
      <div>
      { loading ? <h2 className="todos-state">Loading...</h2> : <></>}
      { listType && todos.length === 0 ? <h2 className="todos-state">This list is empty, try to add some todos!</h2> : <></>}
      { !listType && doneTodos.length === 0 ? <h2 className="todos-state">This list is empty, try to complete some todos!</h2> : <></>}
          { listType ? 
            todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} detail={false}/>
              ))
              :
              doneTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} detail={false}/>
                ))}
      </div>
      { listType &&
        <form className="add-todo" onSubmit={(e) => handleSubmit(e)}>
        <input type="text" onChange={event => {setNewTodo(event.target.value)}} placeholder="Add new todo..."/>
        <button type="submit"/>
        </form>
      }
    </div>
  );
}

export default App;