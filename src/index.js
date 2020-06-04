import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import SesionProvider from './context/SesionProvider';

ReactDOM.render(
  <React.StrictMode>
    <SesionProvider>
      <App />
    </SesionProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


