import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { SnackbarProvider } from 'notistack';

import { GlobalStyle } from '@styles/globalStyle';

import './App.css';

export function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') navigate('/dashboard');
  }, [pathname, navigate]);

  return (
    <SnackbarProvider maxSnack={3}>
      <GlobalStyle />
    </SnackbarProvider>
  );
}

export default App;
