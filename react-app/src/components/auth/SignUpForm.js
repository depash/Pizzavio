import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import About from './about';
import './SighnUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const onSignUp = async (e) => {
    e.preventDefault();
    const data = await dispatch(signUp(username, email, password, repeatPassword));
    if (data) {
      setErrors(data)
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };
  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <div id='sighnupFormContainer'>
      <form id='sighnupForm' onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind} className='Error'>{error}</div>
          ))}
        </div>
        <div className='inputandlabelContainer'>
          <label>User Name</label>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div className='inputandlabelContainer'>
          <label>Email</label>
          <input
            type='email'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div className='inputandlabelContainer'>
          <label>Password</label>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div className='inputandlabelContainer'>
          <label>Repeat Password</label>
          <input
            type='password'
            name='conformpassword'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button type='submit'>Sign Up</button>
      </form>
      <About />
    </div>
  );
};

export default SignUpForm;
