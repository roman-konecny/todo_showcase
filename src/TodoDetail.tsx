import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import TodosContext from './store/todos-context';
import Todo from './Todo'

const TodoDetail:React.FC = () => {
    const { slug } = useParams();
    const { todos, doneTodos } = useContext(TodosContext);
    let todoDetail = todos.find(elem => elem.id === slug)
    let doneTodoDetail = doneTodos.find(elem => elem.id === slug)


  return (
      <div>
          {todoDetail === undefined 
          ?
            doneTodoDetail === undefined
            ?
            <div><h1>Something went wrong...</h1><Link  to={"/"}>Home!</Link></div>
            :
            <Todo todo={doneTodoDetail} detail={true}/>
          :
          <Todo todo={todoDetail} detail={true}/>
        }
      </div>
  )
}

export default TodoDetail;
