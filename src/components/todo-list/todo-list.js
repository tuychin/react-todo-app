import React from 'react';

import ToDoListItem from '../todo-list-item';
import './todo-list.css';

//Свойства полученные через массив
const ToDoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {

    //Создание нового массива еа основе todos с помощью метода map
    const elements = todos.map((item) => {

        //С помощью деструктуризации объекта достатся свойство id из объекта item в массиве. Остальные свойства помещаются в itemProps
        const { id, ...itemProps } = item;

        return (
            <li key={id} className="list-group-item">
                <ToDoListItem
                    {...itemProps}
                    onDeleted={() => {
                        onDeleted(id);
                    }}
                    onToggleImportant={() => {
                        onToggleImportant(id);
                    }}
                    onToggleDone={() => {
                        onToggleDone(id);
                    }} />
            </li>
        );
    });

    return (
        //Получение элементов массива с помощью деструктуризации
        <ul className="list-group todo-list">
            {elements}
        </ul>
    );
};

//Экспорт данного модуля по умолчанию
export default ToDoList;