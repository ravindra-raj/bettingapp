import React, { useState } from 'react';
import './Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [signUpData, setSignUpData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value
    });
  };

  const handleForgotPasswordChange = (e) => {
    setForgotPasswordEmail(e.target.value);
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Login data:', formData);
  };

  const handleSubmitForgotPassword = (e) => {
    e.preventDefault();
    // Add forgot password logic here
    console.log('Forgot password email:', forgotPasswordEmail);
  };

  const handleSubmitSignUp = (e) => {
    e.preventDefault();
    // Add sign-up logic here
    console.log('Sign up data:', signUpData);
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-form">
          {showForgotPassword ? (
            <>
              <h2 className="login-title">Forgot Password</h2>
              <form onSubmit={handleSubmitForgotPassword}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={forgotPasswordEmail}
                    onChange={handleForgotPasswordChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <button type="submit" className="login-button">Reset Password</button>
                <button
                  type="button"
                  className="link-button"
                  onClick={() => setShowForgotPassword(false)}
                >
                  Back to Login
                </button>
              </form>
            </>
          ) : showSignUp ? (
            <>
              <h2 className="login-title">Sign Up</h2>
              <form onSubmit={handleSubmitSignUp}>
                <div className="form-group">
                  <label htmlFor="signup-username">Username</label>
                  <input
                    type="text"
                    id="signup-username"
                    name="username"
                    value={signUpData.username}
                    onChange={handleSignUpChange}
                    placeholder="Enter your username"
                    required
                  />
                </div>
                <div className="form-group password-container">
                  <label htmlFor="signup-password">Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="signup-password"
                    name="password"
                    value={signUpData.password}
                    onChange={handleSignUpChange}
                    placeholder="Enter your password"
                    required
                  />
                  <span
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <div className="form-group password-container">
                  <label htmlFor="signup-confirm-password">Confirm Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="signup-confirm-password"
                    name="confirmPassword"
                    value={signUpData.confirmPassword}
                    onChange={handleSignUpChange}
                    placeholder="Confirm your password"
                    required
                  />
                  <span
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <button type="submit" className="login-button">Sign Up</button>
                <button
                  type="button"
                  className="link-button"
                  onClick={() => setShowSignUp(false)}
                >
                  Back to Login
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="login-title">Login to BetMaster</h2>
              <form onSubmit={handleSubmitLogin}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleLoginChange}
                    placeholder="Enter your username"
                    required
                  />
                </div>
                <div className="form-group password-container">
                  <label htmlFor="password">Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleLoginChange}
                    placeholder="Enter your password"
                    required
                  />
                  <span
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <button type="submit" className="login-button">Login</button>
                <div className="links-container">
                  <button
                    type="button"
                    className="link-button"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Forgot Password?
                  </button>
                  <button
                    type="button"
                    className="link-button"
                    onClick={() => setShowSignUp(true)}
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
