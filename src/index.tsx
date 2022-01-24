import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TodoDetail from './TodoDetail';
import { TodosContextProvider } from './store/todos-context'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';


ReactDOM.render(
  <StrictMode>
    <TodosContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}/>
          <Route path="/:slug" element={<TodoDetail />}/>
        </Routes>
      </BrowserRouter>
    </TodosContextProvider>
  </StrictMode>, 
  document.getElementById('root')
);