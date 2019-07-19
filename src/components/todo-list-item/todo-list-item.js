    
import React from 'react';

import './todo-list-item.css';

//Props - установка свойств компонентам. Свойства получены из тега компонента
const TodoListItem = ({ important, done, text, onToggleImportant, onToggleDone, onDeleted }) => {

  let classNames = 'todo-list-item';
  if (important) {
    classNames += ' important';
  }

  if (done) {
    classNames += ' done';
  }


  return (
    <span className={classNames}>
      <span
        className="todo-list-item-text"
        onClick={onToggleDone}>{text}</span>

      <button type="button"
              className="btn btn-outline-success btn-sm float-right"
              onClick={onToggleImportant}>
        <i className="fa fa-exclamation"></i>
      </button>

      <button type="button"
              className="btn btn-outline-danger btn-sm float-right"
              onClick={onDeleted}>
        <i className="fa fa-trash-o"></i>
      </button>
    </span>
  );
};

export default TodoListItem;