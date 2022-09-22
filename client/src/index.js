import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import {Provider} from "react-redux";
import {createStore} from "./store/createStore";
import history from "./utils/history";
import {Router} from "react-router-dom";

const store=createStore();

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <Router history={history}>
              <App />
          </Router>
      </Provider>
  </React.StrictMode>,
    document.getElementById('root')

)

