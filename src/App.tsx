import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './404';
import SignUpCoordinators from './pages/SignUpCoordinators';
import ChooseSignUp from './pages/ChooseSignUp';
import ApiTest from './pages/apiTest';
import FamilyDashboard from './pages/FamilyDashboard';
import Settings from './pages/Settings'; 
import { isLoggedIn } from './contexts/pocketbase';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoginState, useGetLoginState } from './hooks/useGetLoginState';
import Toast from './components/toast';

function App() {
  //handle lightmode button click
  const [lightMode, setLightMode] = useState(true);

const handleLightMode = () => {
    setLightMode(!lightMode);
    if (lightMode) {
      document.documentElement.setAttribute('data-theme', 'forest');
    } else {
      document.documentElement.setAttribute('data-theme', 'bumblebee');
    }
  };
  const queryClient = new QueryClient();
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<LandingPage />}/>
	  <Route path="/settings" element={<ProtectedElement protectedElement={<Settings />} setShowToast={setShowToast}/>}/>
          <Route path="/chooseSignUp" element={<ChooseSignUp />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/signup_coordinators" element={<SignUpCoordinators />}/>
          <Route path="/login" element={<Login />}/>
          <Route
            path="/home/*"
            element={<ProtectedElement protectedElement={<Home />} setShowToast={setShowToast} />}
          />
          <Route
            path="/familydashboard"
            element={
              <ProtectedElement
                protectedElement={<FamilyDashboard />}
                allowed={['users']}
                setShowToast={setShowToast}
              />
            }
          />
          <Route path="/apitest" element={<ApiTest />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toast message="You cannot access this page" hidden={!showToast} type="error" />
      </QueryClientProvider>
    </>
  );
}

const ProtectedElement = (props: {
  protectedElement: JSX.Element;
  allowed?: LoginState[];
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const loginState = useGetLoginState();
  const allowedStates = props.allowed ?? ['users', 'coordinators'];

  if (allowedStates.includes(loginState)) {
    return props.protectedElement;
  } else if (loginState != null) {
    props.setShowToast(true);
    return <Navigate to="/home" />;
  }
  props.setShowToast(true);
  return <Navigate to="/login" />;
};

export default App;
