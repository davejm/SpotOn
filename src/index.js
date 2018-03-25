import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {unregister} from './serviceWorker';

require('dotenv').config();

ReactDOM.render(<App />, document.getElementById('root'));
unregister();
