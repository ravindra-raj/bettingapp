import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './signup.css';
import Grid from '@mui/material/Grid';
import { Select, MenuItem } from '@mui/material';

export const SignupForm = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setfirst_name] = useState('');
  const [last_name, setlast_name] = useState('');
  const [conform_password, setconform_password] = useState('');
  const [role, setRole] = useState('');
  const [contact_number, setContact_number] = useState('');
  const [Dob, setDob] = useState('');
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');
  const [conform_passwordError, setconform_passwordError] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordValidity, setPasswordValidity] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialCharacter: false,
  });
  const [passwordStrength, setPasswordStrength] = useState('');
  const [resendEnabled, setResendEnabled] = useState(true);
  const [resendTimer, setResendTimer] = useState(0);

  const navigate = useNavigate();

  const isUsernameEmailFilled = username.trim() !== '' && email.trim() !== '';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[gmail.com]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const contactNumberRegex = /^\d{10}$/;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countryOptions = response.data.map((country) => ({
          code: country.cca2,
          name: country.name.common,
          dialCode: `${country.idd.root}${country.idd.suffixes ? country.idd.suffixes[0] : ''}`,
        }));
        setCountries(countryOptions);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const length = password.length >= 6;
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const number = /[0-9]/.test(password);
    const specialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setPasswordValidity({
      length,
      uppercase,
      lowercase,
      number,
      specialCharacter,
    });

    const strength = length + uppercase + lowercase + number + specialCharacter;
    switch (strength) {
      case 4:
        setPasswordStrength('Strong');
        break;
      case 3:
        setPasswordStrength('Medium');
        break;
      case 2:
        setPasswordStrength('Weak');
        break;
      default:
        setPasswordStrength('Strong');
    }
  }, [password]);


  useEffect(() => {
    let timer;
    if (!resendEnabled && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setResendEnabled(true);
    }
    return () => clearInterval(timer);
  }, [resendEnabled, resendTimer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };


  const handleChange = (e) => {
    setCountry(e.target.value);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!isUsernameEmailFilled) {
      toast.error('Username and email are required.');
      return;
    }

    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format.');
      return;
    } else {
      setEmailError('');
    }

    try {
      const response = await axios.post('http://localhost:5000/send-otp', { email });
      console.log(response.data);
      setOtpSent(true);
      setVerificationStatus('OTP sent successfully. Please check your email.');
      setResendEnabled(false);
      setResendTimer(60);
    } catch (error) {
      console.error(error);
      setVerificationStatus('Failed to send OTP. Please try again.');
    }
  };

  const handleResendOTP = async (e) => {
    e.preventDefault();
    if (resendEnabled) {
      await handleSendOTP(e);
    }
  };

  const handleSubmits = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/verify-otp', { email, otp });
      setVerificationStatus(response.data.message);
      if (response.data.message === 'OTP verified successfully') {
        setOtpSent(false);
      }
    } catch (error) {
      console.error(error);
      setVerificationStatus('Failed to verify OTP. Please try again.');
    }
  };

  const signupUser = async (e) => {
    e.preventDefault();

    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.');
      return;
    } else {
      setPasswordError('');
    }

    if (password !== conform_password) {
      setconform_passwordError('Passwords do not match.');
      return;
    } else {
      setconform_passwordError('');
    }

    if (!contactNumberRegex.test(contact_number)) {
      setContactNumberError('Contact number must be 10 digits.');
      return;
    } else {
      setContactNumberError('');
    }

    try {
      const response = await axios.post('http://localhost:5000/users', {
        username,
        email,
        contact_number,
        password,
        conform_password,
        first_name,
        last_name,
        Dob,
        country,
        role
      });
      if (response.status === 201) {
        toast.success('Signup successful!');
        navigate('/');
      } else {
        toast.error('Signup failed. Please try again later.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error('Signup failed. Please try again later.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form" style={{ border: '1px solid #ccc', borderRadius: '8px' }}>
        <h1>Create an Account</h1>
        <h2>Account and Contact Details</h2>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <label>
                <input type="text" placeholder='User Name' value={username} onChange={(e) => setUserName(e.target.value)} required />
              </label>
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>
                <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
              </label>
              {emailError && <p className="error">{emailError}</p>}
            </Grid>

            {otpSent ? (
              <>
                <Grid item xs={12} sm={6}>
                  <label>
                    <input type="text" value={otp} placeholder='Enter OTP' onChange={(e) => setOtp(e.target.value)} />
                  </label>
                </Grid>
                <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <div>
                  <button style={{ marginTop: '15px', display: 'flex', justifyContent: 'center' }} onClick={handleSubmits}>Verify OTP</button>
                  </div>
                  <div>
                  <Grid item xs={12} sm={6}>
                    <button 
                      style={{ marginTop: '15px' }} 
                      onClick={handleResendOTP} 
                      disabled={!resendEnabled}
                    >
                      {resendEnabled ? 'Resend OTP' : `Resend OTP in ${formatTime(resendTimer)}`}
                    </button>
                  </Grid>
                  </div>
                </Grid>
              </>
            ) : (
              <button style={{ marginLeft: '5%' }} onClick={handleSendOTP}>Get OTP for Email</button>
            )}
            <Grid item xs={12} sm={12}>
              {verificationStatus && <p>{verificationStatus}</p>}
            </Grid>
            {!otpSent && verificationStatus === 'OTP verified successfully' && (
              <>
                <Grid item xs={12} sm={6}>
                  <label>
                    <div className="password-input">
                      <input
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ height: '45px' }}
                      />
                      <span
                        className="password-toggle-icon"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      >
                        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </label>
                  {passwordError && <p className="error">{passwordError}</p>}
                  <div className="password-requirements">
                    <p className={passwordValidity.length ? 'valid' : 'invalid'}>
                      {passwordValidity.length ? <FaCheckCircle /> : <FaTimesCircle />} Length of at least 8 characters
                    </p>
                    <p className={passwordValidity.uppercase ? 'valid' : 'invalid'}>
                      {passwordValidity.uppercase ? <FaCheckCircle /> : <FaTimesCircle />} At least one uppercase letter
                    </p>
                    <p className={passwordValidity.lowercase ? 'valid' : 'invalid'}>
                      {passwordValidity.lowercase ? <FaCheckCircle /> : <FaTimesCircle />} At least one lowercase letter
                    </p>
                    <p className={passwordValidity.number ? 'valid' : 'invalid'}>
                      {passwordValidity.number ? <FaCheckCircle /> : <FaTimesCircle />} At least one number
                    </p>
                    <p className={passwordValidity.specialCharacter ? 'valid' : 'invalid'}>
                      {passwordValidity.specialCharacter ? <FaCheckCircle /> : <FaTimesCircle />} At least one special character
                    </p>

                  </div>
                  <div className="password-strength">
                    <p>Password Strength: {passwordStrength}</p>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label>
                    <div className="password-input">
                      <input
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder='Confirm Password'
                        value={conform_password}
                        onChange={(e) => setconform_password(e.target.value)}
                        style={{ height: '45px' }}
                      />
                      <span
                        className="password-toggle-icon"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      >
                        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </label>
                  {conform_passwordError && <p className="error">{conform_passwordError}</p>}
                </Grid>
                <Grid item xs={12} sm={6}>
                <h2> Basic Information </h2>
                  <br />
                  <label>
                    <input type="text" placeholder='First Name' value={first_name} onChange={(e) => setfirst_name(e.target.value)} />
                  </label>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label>
                    <input type="text" placeholder='Last Name' value={last_name} onChange={(e) => setlast_name(e.target.value)} />
                  </label>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label>
                    <Select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      displayEmpty
                      fullWidth
                      style={{height:'45px', width:'94%' ,border:'1px solid #393737'}}

                    >
                      <MenuItem value="" disabled>
                      <em>Select Role</em>
                    </MenuItem>
                    <MenuItem value="Admin"> Admin </MenuItem> 
                    <MenuItem value="user"> user </MenuItem>
                    </Select>
                  </label>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label>
                    <Select
                      value={country}
                      onChange={handleChange}
                      displayEmpty
                      fullWidth
                      style={{height:'45px', width:'94%' ,border:'1px solid #393737'}}

                    >
                      <MenuItem value="" disabled>
                      <em>Select Country</em>
                    </MenuItem>

                      {countries.map((country) => (
                        <MenuItem key={country.code} value={country.code}>
                          {country.name} ({country.dialCode})
                        </MenuItem>
                      ))}
                    </Select>
                  </label>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label>
                    <input type="text" placeholder='Contact Number' value={contact_number} onChange={(e) => setContact_number(e.target.value)} style={{marginTop:'20px'}} />
                  </label>
                  {contactNumberError && <p className="error">{contactNumberError}</p>}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label>
                  <span>Date of Birth</span>
                    <input type="date" value={Dob} onChange={(e) => setDob(e.target.value)} />
                  </label>
                </Grid>
              </>
            )}
          </Grid>
       <div style={{ marginLeft:'40%', marginTop: '10%', width:'20%' }}>
       <button style={{width:'100%'}} onClick={signupUser}>Signup</button>
       </div>       
        </form>
      </div>
    </div>
  );
};

export default SignupForm;

