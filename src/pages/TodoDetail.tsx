import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TodosContext } from '../store/todos-context';
import TodoItem from '../components/Todo'

const TodoDetail = () => {
    const { slug } = useParams();
    const { todos, doneTodos } = useContext(TodosContext);
    let todoDetail = todos.find(elem => elem.id === slug)
    let doneTodoDetail = doneTodos.find(elem => elem.id === slug)


  return (
      <div className="todoWrapper">
          {todoDetail === undefined 
          ?
            doneTodoDetail === undefined
            ?
            <div><h1>Something went wrong...</h1><Link  to={"/"}>Home!</Link></div>
            :
            <TodoItem todo={doneTodoDetail} detail={true}/>
          :
          <TodoItem todo={todoDetail} detail={true}/>
        }
      </div>
  )
}

export default TodoDetail;
