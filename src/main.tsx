import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import '@src/App.css';
import { router } from '@src/router';

import './index.css';
import './styles/main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
