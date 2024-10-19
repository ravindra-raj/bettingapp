import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import './forgot.css';

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('');
  const [resetStatus, setResetStatus] = useState('');
  const navigate = useNavigate();

  const isEmailFilled = email.trim() !== '';

  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!isEmailFilled) {
      toast.error('Email is required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/forgot-password', { email });
      console.log(response.data);
      setOtpSent(true);
      setVerificationStatus('OTP sent successfully. Please check your email.');
    } catch (error) {
      console.error(error);
      setVerificationStatus('Failed to send OTP. Please try again.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error('New password and confirm password do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/reset-password', { email, otp, newPassword });
      setVerificationStatus('');
      setResetStatus(response.data.message);
      toast.success('Password reset successful. Please log in with your new password.');
      navigate('/');
    } catch (error) {
      console.error(error);
      setResetStatus('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-form">
        <h2>Forgot Password</h2>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <label>
                Email:
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
            </Grid>
            {otpSent ? (
              <>
                <Grid item xs={12}>
                  <label>
                    OTP:
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </label>
                </Grid>
                <Grid item xs={12}>
                  <label>
                    New Password:
                    <input
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </label>
                </Grid>
                <Grid item xs={12}>
                  <label>
                    Confirm New Password:
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                  </label>
                </Grid>
                <Grid item xs={12}>
                  <button onClick={handleResetPassword}>Reset Password</button>
                </Grid>
                <Grid item xs={12}>
                  {resetStatus && <p>{resetStatus}</p>}
                </Grid>
              </>
            ) : (
              <Grid item xs={12}>
                <button onClick={handleSendOTP}>Get OTP for Email</button>
              </Grid>
            )}
            <Grid item xs={12}>
              {verificationStatus && <p>{verificationStatus}</p>}
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
