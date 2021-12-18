import { useNavigate } from 'react-router-dom';

export const LoginScreen = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/marvel', {
      replace: true,
    });
  };

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <p className="text-muted">
        (Don't worry, this is a fake login, you dont need any user or
        credentials 👌)
      </p>
      <hr />
      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};
