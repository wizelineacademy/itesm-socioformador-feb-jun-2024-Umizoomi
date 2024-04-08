import React from 'react';
import Input from '../Elements/Input';
import './LoginForm.css';

const LoginForm = () => {
  return (
    <div className="wrapper">
      <form action="">
        <h1>Login</h1>
        <Input type="text" placeholder="Username" required />
        <Input type="password" placeholder="Password" required />
        <div className="remember-forgot">
          <label>
            <input type="checkbox" />Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;