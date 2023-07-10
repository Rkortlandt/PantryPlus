import { useState } from 'react';
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
import { isLoggedIn } from './contexts/pocketbase';
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
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/chooseSignUp" element={<ChooseSignUp />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signup_coordinators" element={<SignUpCoordinators />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home/*" element={<ProtectedElement protectedElement={<Home />} />} />
        <Route path="/familydashboard" element={<ProtectedElement protectedElement={<FamilyDashboard />} />} />
        <Route path="/apitest" element={<ApiTest />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const ProtectedElement = (props: { protectedElement: JSX.Element }) => {
  return isLoggedIn() ? props.protectedElement : <Navigate to="/login" />;
};

export default App;
