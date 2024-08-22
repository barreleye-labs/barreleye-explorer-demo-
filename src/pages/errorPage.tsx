import { useNavigate, useRouteError } from 'react-router-dom';

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError() as RouteError;

  return (
    <div id="error-page" style={styles.container}>
      <div style={styles.content}>
        <img src={'src/assets/barreleye.png'} alt="BarrelEye Logo" style={styles.logo} />
        <h1 style={styles.header}>Oops!</h1>
        <p style={styles.message}>Sorry, an unexpected error has occurred.</p>
        {error && (
          <p style={styles.errorDetails}>
            <i>{error.statusText || error.message}</i>
          </p>
        )}
        <button style={styles.button} onClick={() => navigate('/')}>
          Reload Page
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f4f8',
    color: '#333',
    textAlign: 'center' as const,
    padding: '20px'
  },
  content: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    width: '100%'
  },
  logo: {
    width: '100px',
    height: 'auto',
    marginBottom: '20px'
  },
  header: {
    fontSize: '3rem',
    marginBottom: '20px',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    color: '#007bff'
  },
  message: {
    fontSize: '1.5rem',
    marginBottom: '20px',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
  },
  errorDetails: {
    fontSize: '1.2rem',
    fontStyle: 'italic' as const,
    marginBottom: '30px',
    color: '#555'
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#ffffff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  }
};
