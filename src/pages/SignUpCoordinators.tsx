import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Toast from '../components/toast';
import { addCoordinator } from '../contexts/pocketbase';

export default function SignUpCoordinators() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [isFamilyNameValid, setIsFamilyNameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState('not-clicked');
  const [isPasswordConfirmValid, setIsPasswordConfirmValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = await addCoordinator(username, email, password, passwordConfirm, familyName, name);
    if (error) {
      console.log(error);
      return setShowToast(true);
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="card card-body bg-base-200 flex flex-col m-6 items-center justify-center w-96">
        <h1 className="text-4xl max-sm:3xl font-bold">Sign Up</h1>
        <h1 className="text-3xl max-sm:2xl">Coordinators</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full">
          <input
            type="text"
            placeholder="Username (Public)"
            className="input input-bordered w-full p-2 my-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div
            className={`focus-within:tooltip-warning tooltip-error tooltip-right w-full ${
              isEmailValid ? '' : 'tooltip tooltip-open'
            }`}
            data-tip="Not a valid email"
          >
            <input
              type="email"
              placeholder="Email"
              className={`input input-bordered w-full p-2 my-2 ${
                isEmailValid ? '' : 'focus:input-warning input-error'
              }`}
              value={email}
              onChange={(e) => {
                const value = e.target.value;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                setIsEmailValid(emailRegex.test(value));
                setEmail(value);
              }}
            />
          </div>
          <div
            className={`focus-within:tooltip-warning tooltip-error tooltip-right w-full ${
              isPasswordValid ? '' : 'tooltip tooltip-open'
            }`}
            data-tip="Must Be 8-20 digits long"
          >
            <input
              type="password"
              placeholder="Password - 8 characters"
              className={`input input-bordered w-full p-2 my-2 ${
                isPasswordValid ? 'input' : 'focus:input-warning input-error'
              }`}
              value={password}
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);
                if (value.length >= 8 && value.length <= 20) {
                  setIsPasswordValid('true');
                } else {
                  setIsPasswordValid('');
                }
              }}
            />
          </div>
          <div
            className={`focus-within:tooltip-warning tooltip-error tooltip-right w-full ${
              isPasswordConfirmValid ? '' : 'tooltip tooltip-open'
            }`}
            data-tip="Passwords do not match"
          >
            <input
              type="password"
              placeholder="Confirm Password"
              className={`input input-bordered w-full p-2 my-2 ${
                isPasswordConfirmValid ? '' : 'focus:input-warning input-error'
              }`}
              value={passwordConfirm}
              onChange={(e) => {
                const value = e.target.value;
                setPasswordConfirm(value);
                if (value === password) {
                  setIsPasswordConfirmValid(true);
                } else {
                  setIsPasswordConfirmValid(false);
                }
              }}
            />
          </div>
          <div
            className={`focus-within:tooltip-warning tooltip-error tooltip-right w-full ${
              isFamilyNameValid ? '' : 'tooltip tooltip-open'
            }`}
            data-tip="Must be 5-20 digits long"
          >
            <input
              type="text"
              placeholder="Family Name (Required 5-20 characters)"
              className={`input input-bordered w-full p-2 my-2 ${
                isFamilyNameValid ? '' : 'focus:input-warning input-error'
              }`}
              value={familyName}
              onChange={(e) => {
                const value = e.target.value;
                setFamilyName(value);
                if (value.length >= 5 && value.length <= 20) {
                  setIsFamilyNameValid(true);
                } else {
                  setIsFamilyNameValid(false);
                }
              }}
            />
          </div>
          <input
            type="text"
            placeholder="Name (Optional)"
            className="input input-bordered w-full p-2 my-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {isPasswordValid &&
          isPasswordConfirmValid &&
          isEmailValid &&
          passwordConfirm.length != 0 &&
          email.length != 0 &&
          password.length != 0 ? (
            <button type="submit" className="input input-primary w-full p-2 my-2">
              Sign Up
            </button>
          ) : (
            <button type="submit" disabled className="input w-full p-2 my-2">
              Sign Up
            </button>
          )}
        </form>
        <p className="my-2">
          Already have an account?{' '}
          <Link to="/login" className=" text-primary">
            Log In
          </Link>
        </p>
      </div>
      {<Toast type="error" hidden={!showToast} message="Your username or password may already be in use." />}
    </div>
  );
}
