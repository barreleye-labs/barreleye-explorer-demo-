import { RouterProvider } from 'react-router-dom';

import { router } from '@src/router';

import './App.css';

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
