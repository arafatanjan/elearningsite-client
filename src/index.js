import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import AllRights from './components/AllRights';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Provider store={store}>
      <App />
       <AllRights/> 
    </Provider>
  
)

// ReactDOM.render(
//   // <React.StrictMode>
//   <Provider store={store}>
//     <App />
//     </Provider>,
//   // </React.StrictMode>,
//   document.getElementById('root')
// );

// reportWebVitals();