import { Link } from 'react-router-dom'
import { Todo, TodosContext } from './store/todos-context';
import { useContext, useState } from 'react'

interface TodoProps {
	todo: Todo,
	detail: boolean
};

const TodoItem = (props: TodoProps)  => {
	const { id, completed, title } = props.todo
	const todoDetail = props.detail
	const  { markTodo, changeTodo, removeTodo } = useContext(TodosContext)
	const [checked, setChecked] = useState<boolean>(false)
	const [newTitle, setNewTitle] = useState<string>(title)

	function handleChange(e: React.FormEvent<HTMLFormElement>, todo: Todo) {
		e.preventDefault();
		changeTodo(todo, newTitle)
	  }

	return (
			<div className={ todoDetail ? "todoItem todoDetail" : "todoItem"}>
				<div className={ todoDetail ? "container todoDetail" : "container"}>
					<button className={completed ? "revive-button" : ""} onClick={() => {markTodo(completed, props.todo); setChecked(completed);}}></button>	
					<h2 className={"title ".concat(`${completed}`)}>{title}</h2>
				</div>
				<div>
					{ todoDetail ? <Link to="/" onClick={() => removeTodo(props.todo)}>🗑️</Link> : <></> }
					<Link to={ todoDetail ? "/" : "/".concat(id)}>{ todoDetail ? "🏠" : "📝"}</Link>
				</div>
				{ todoDetail ? 
				<form className="add-todo change-todo" onSubmit={(e) => handleChange(e, props.todo)}>
					<input type="text" onChange={event => {setNewTitle(event.target.value)}} value={newTitle}/>
					<button type="submit"/>
				</form>
				: <></> }
			</div>
	);
}

export default TodoItem;
