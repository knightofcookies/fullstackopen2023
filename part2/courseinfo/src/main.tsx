import ReactDOM from 'react-dom/client'
import App from './App'
import { StrictMode } from 'react';

const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);