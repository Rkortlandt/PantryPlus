import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Toast from '../components/toast';
import { useUserLogin, useCoordinatorLogin } from '../hooks/useLogin';

export default function Login() {
  const [usernameEmail, setUsernameEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isUsernameEmailValid, setIsUsernameEmailValid] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const { mutate: loginUser, isLoading, isError, isSuccess, error } = useUserLogin();
  const {
    mutate: loginCord,
    isLoading: isLoadingCord,
    isError: isErrorCord,
    isSuccess: isSuccessCord,
    error: errorCord,
  } = useCoordinatorLogin();
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
    const usernameEmailAndPassword = { usernameEmail, password };
    loginUser(usernameEmailAndPassword);
    loginCord(usernameEmailAndPassword);
  };
  if (isErrorCord && isError) {
    setShowToast(true);
    console.log(error, errorCord);
  }
  if (isSuccess || isSuccessCord) {
    navigate('/home');
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="card card-body bg-base-200 flex flex-col m-6 items-center justify-center w-96">
        <h1 className="text-4xl max-sm:3xl font-bold">Login</h1>
        <br className="max-sm:hidden"></br>
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full">
          <input
            type="text"
            placeholder="Username/Email"
            className={`input input-bordered w-full p-2 my-2 ${isUsernameEmailValid ? '' : 'input-error'}`}
            value={usernameEmail}
            onChange={(e) => {
              const value = e.target.value;
              setUsernameEmail(value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className={`input input-bordered w-full p-2 my-2 ${isPasswordValid ? '' : 'input-error'}`}
            value={password}
            onChange={(e) => {
              const value = e.target.value;
              setPassword(value);
            }}
          />
          <button type="submit" className="btn btn-primary w-full p-2 my-2">
            {isLoading || isLoadingCord ? <span className="loading loading-spinner"></span> : 'Login'}
          </button>
        </form>
        Don't have an account?{' '}
        <Link to="/SignUp" className=" text-primary">
          SignUp
        </Link>
        {/* <p>{isLoggedIn() ? 'Logged In' : 'Logged Out'}</p> */}
      </div>
      <Toast message="Invalid username/email or password" hidden={!showToast} type="error" />
    </div>
  );
}
