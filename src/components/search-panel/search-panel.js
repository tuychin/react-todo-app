import React, {Component} from 'react';

import './search-panel.css'

export default class SearchPanel extends Component {

  //Элемент содержащий в себе значения поля поиска
  state = {
    term: ''
  };

  
  onSearchChange = (evt) => {
    //Значение события (текст поля формы)
    const term = evt.target.value;
    //Изменение значения state.term
    this.setState({term});
    //Передача значения term в state из app
    this.props.onSearchChange(term);
  }

  render() {
    return (
      <input type="text"
             className="form-control search-input"
             placeholder="Type to search"
             value={this.state.term}
             //При изменении содержимого поля формы, вызывается функция
             onChange={this.onSearchChange} />
    );
  };
};