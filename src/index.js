//Подключение важных библиотек React и ReactDOM для работы приложения
import React from 'react';
import ReactDOM from 'react-dom';

//Подключение модулей компонентов
import App from './components/app';

//Рендер (воспроизведение, передача) React-приложения в index.html в блок с id "root"
ReactDOM.render(<App />, document.getElementById('root'));