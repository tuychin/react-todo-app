import React, {Component} from 'react';
import './item-add-form.css';

export default class ItemAddForm extends Component {

    //В state будет содержаться текущий текст написанный в поле формы
    state = {
        text: ''   
    };

    //Текущий текст в поле формы, передаётся в state напрямую
    //state можно менять напрямую, если его состояние не зависит от предыдущего
    onTextChange = (evt) => {
        this.setState({
            //Значение события (текст поля формы)
            text: evt.target.value
        });
    };

    onSubmit = (evt) => {
        //Отмена действия по умолчанию (для отмены перезагрузки страницы)
        evt.preventDefault();
        //Передача текста из state и создание нового элемента
        this.props.onItemAdded(this.state.text);
        //Обновление свойства state, для того, что-бы сделать поле формы пустым после отправки
        this.setState ({
            text: ''
        });
    };

    render() {
        return (
            <form className="item-add-form d-flex"
                  //Вызов функции при отправке формы
                  onSubmit={this.onSubmit}>
                <input type="text"
                       className="form-control"
                       //Вызов функции при изменении текста в поле ввода
                       onChange={this.onTextChange}
                       placeholder="What needs to be done"
                       //Значение value которое передаётся из state, делает этот элемент контролируемым
                       value={this.state.text} />
                <button
                    className="btn btn-outline-secondary">
                    Add
                </button>
            </form>
        )
    }
};