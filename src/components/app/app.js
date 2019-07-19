import React, {Component} from 'react';

//Подключение модулей компонентов
import AppHeader from '../app-header';
import ToDoList from '../todo-list';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

//Подключение css
import './app.css';

export default class App extends Component {

  //Минимальный id новых элементов - 100
  minId = 100;

  state = {
    //Массив списка дел с объектами. Передаётся в качестве свойства в ToDoList
    todoData: [
      this.createTodoItem('Task №1'),
      this.createTodoItem('Task №2'),
      this.createTodoItem('Task №3')
    ],
    //Элемент содержащий в себе значения поля поиска
    term: '',
    filter: 'all'
  };

  //Создание элемента
  createTodoItem(text) {
    return {
      text,
      important: false,
      done: false,
      //Уникальный Id увеличивающийся на единицу
      id: this.minId++
    }
  };

  //Удаление элемента из state
  deleteItem = (id) => {
    //setState - обновление state
    this.setState(({todoData}) => {
      //Поиск индекса элемента массива
      const idx = todoData.findIndex((el) => el.id === id);

      //Не следует менять массив в state на прямую.
      //Лучше создать новый массив из старого и вернуть его в state
      //Копируем все элементы пропуская удалённый и вставляем в новый массив
      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];
      
      //Возвращаем новый массив
      return {
        todoData: newArray
      };
    });
  };

  //Добавление нового элемента в state
  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    //Не следует добавлять новый элемент в массив в state на прямую.
    //Лучше создать новый массив из старого и вернуть его в state
    //Копируем все элементы из todoData в newArr и добавляем в конец новый элемент
    //setState - обновление state
    this.setState(({todoData}) => {
      const newArr = [
        ...todoData,
        newItem
      ]

      //Возвращаем новый массив
      return {
        todoData: newArr
      }
    });
  };

  //Изменение значения в state
  toggleProperty(arr, id, propName) {
      //Поиск индекса элемента массива
      const idx = arr.findIndex((el) => el.id === id);
      const oldItem = arr[idx];
      //Создание нового объекта с обновлённым значением из старого
      const newItem = { ...oldItem, [propName]: !oldItem[propName] };

      //Создание нового массива и замена элемента новым, обновлённым объектом
      return [
        ...arr.slice(0, idx),
        newItem,
        ...arr.slice(idx + 1)
      ];
  };

  //Редактирование значения important в элементе
  onToggleImportant = (id) => {
    //setState - обновление state
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty( todoData, id, 'important' )
      };
    });
  };

  //Редактирование значения done в элементе
  onToggleDone = (id) => {
    //setState - обновление state
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty( todoData, id, 'done' )
      };
    });
  };

  //Изменение значения state.term
  onSearchChange = (term) => {
    this.setState({term});
  }

  //Изменение значения state.filter
  onFilterChange = (filter) => {
    this.setState({filter});
  }

  //Фильтрация элементов по значению в term
  search(items, term) {
    if (term.length === 0) {
      return items;
    };

    return items.filter((item) => {
      //Отмена чувствительности на регистр символов (key sensitive)
      return item.text
                  .toLowerCase()
                  .indexOf(term.toLowerCase()) > -1;
    });
  };

  //Фильтр элементов
  filter( items, filter ) {

    switch(filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
          return items.filter((item) => item.done);
      default:
        return items;
    }

  };

  render() {
    const { todoData, term, filter } = this.state;

    //Фильтр результатов поиска
    const visibleItems = this.filter(
                         this.search( todoData, term ), filter);

    //Счётчик количества объектов с done: true
    const doneCount = todoData
                      .filter((el) => el.done).length;

    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel
            onSearchChange={this.onSearchChange} />
          <ItemStatusFilter filter={filter}
                            //Обновление состояния компонента (state)
                            onFilterChange = {this.onFilterChange} />
        </div>
  
        <ToDoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone} />
        <ItemAddForm
          onItemAdded={this.addItem} />
      </div>
    );
  }
};