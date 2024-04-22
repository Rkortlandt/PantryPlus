import React from 'react';
import { useState, useEffect } from 'react';
import { Link, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Loading from './Loading';
import { logout, isLoggedInAsUser, isLoggedInAsCoordinator, pb } from '../contexts/pocketbase';
import { LoginState, useGetLoginState } from '../hooks/useGetLoginState';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import HomePage, { PendingRequest, AddRequest } from './HomePage';
import HomePageCoordinators from './HomePageCoordinators';
function Home() {
  //handle lightmode button click
  const [hasFamily, setHasFamily] = useState(false);
  const [lightMode, setLightMode] = useState(true);
  const loginState: LoginState = useGetLoginState();

  const { isLoading, isError, data, error} = useQuery({ queryKey: ['pendingRequest'], 
	queryFn: () => {
	  return pb.collection('familyRequests').getFirstListItem(`user.id="${pb.authStore.model?.id}"`, {
    	expand: 'family',
  	})
  },
	refetchOnWindowFocus: false,
  	retry: 1
  });
  

  const handleLightMode = () => {
	setLightMode(!lightMode);
	if (lightMode) {
	  document.documentElement.setAttribute('data-theme', 'forest');
	} else {
	  document.documentElement.setAttribute('data-theme', 'bumblebee');
	}
  };
  return (
    <div className="h-full w-full">
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content */}

          {/* Settings bubble (Small Screens)*/}
          <div className="join left-0 top-0 p-2 sticky w-full md:w-auto md:hidden">
            <label htmlFor="my-drawer" className="join-item btn btn-md">
              <span className="material-symbols-outlined">add</span>
            </label>
            <button className="join-item btn btn-md">
	      <Link to="/settings">
              <span className="material-symbols-outlined">settings</span>
	      </Link>
            </button>
            <button className="join-item btn btn-md">
              <span className="material-symbols-outlined">person</span>
            </button>
            <button className="join-item btn btn-md" onClick={handleLightMode}>
              <span className="material-symbols-outlined">{!lightMode ? 'light_mode' : 'dark_mode'}</span>
            </button>
            <button
              className="join-item btn btn-primary"
              onClick={() => {
                logout();
                return <Navigate to="/login" />;
              }}
            >
              Logout
            </button>
			</div>
			{/* Nav (Large Screens) */}
			<Navbar handleLightMode={handleLightMode} lightMode={lightMode} loginState={loginState} />
			{/* Hero Element */}
			<Routes>
				<Route
				path="/"
				element={						
					 <React.Suspense fallback={<Loading />}>
						{!hasFamily && isLoggedInAsUser() && PendingRequest()? <PendingRequest/> : <AddRequest/>}
						{/*hasFamily && isLoggedInAsUser() && <HomePage/>*/}
						{/*isLoggedInAsCoordinator() && <HomePageCoordinators/>*/}
					</React.Suspense>}
				/>
				<Route
				path="/lists"
				element={
					<React.Suspense fallback={<Loading />}>
                  <Outlet />
                  <Loading />
                </React.Suspense>
              }
            />
          </Routes>
          {/* Bottom Navigation (Small Screens)*/}

          <div className="btm-nav md:hidden">
            <button className="w-full h-full" disabled>
              <span className="material-symbols-outlined">kitchen</span>
            </button>
            <Link to="/home/lists">
              <button className="w-full h-full">
                <span className="material-symbols-outlined">shopping_cart</span>
              </button>
            </Link>
            <Link to="/home" className="btn-primary">
              <span className="material-symbols-outlined">home</span>
            </Link>
            <button disabled>
              <span className="material-symbols-outlined">calendar_month</span>
            </button>
            <button disabled>
              <span className="material-symbols-outlined">favorite</span>
            </button>
          </div>
        </div>
        <div className="drawer-side z-10">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;

function Navbar(props: { handleLightMode: () => void; lightMode: boolean; loginState: LoginState }) {
  return (
    <>
      <div className="navbar sticky top-0 left-0 max-h-6 md:flex hidden shadow-xl z-10 bg-base-100">
        <div className="flex-none">
          <button className="btn btn-square">
            <label htmlFor="my-drawer" className="drawer-button">
              <span className="material-symbols-outlined">add</span>
            </label>
          </button>
        </div>
        <div className="flex-none">
          <a className="m-2 font-semibold btn-sm btn normal-case text-xl btn-ghost">PantryPlus</a>
        </div>
        <div className="flex-1"></div>
        <div className="">
          <button className="btn m-2" disabled>
            <span className="material-symbols-outlined">kitchen</span>
          </button>
          <Link to="/home/lists">
            <button className="btn m-2">
              <span className="material-symbols-outlined">shopping_cart</span>
            </button>
          </Link>
          <Link to="/home">
            <button className="btn btn-primary px-6 m-2">
              <span className="material-symbols-outlined">home</span>
            </button>
          </Link>

          <button className="btn m-2" disabled>
            <span className="material-symbols-outlined">calendar_month</span>
          </button>

          <button className="btn m-2" disabled>
            <span className="material-symbols-outlined">favorite</span>
          </button>
        </div>
        <div className="flex-1"></div>
        <div className="flex-none">
          <Link to="/">
            <button
              className="btn btn-primary mx-2"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </Link>
          <details className="dropdown">
            <summary className="btn btn-square btn-ghost duration-0 place-content-center swap swap-rotate z-10">
              <label className="swap swap-rotate z-10">
                <input type="checkbox" />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  className=" stroke-current swap-off"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  ></path>
                </svg>

                <svg
                  className="swap-on fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 512 512"
                >
                  <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                </svg>
              </label>
            </summary>
            <ul tabIndex={0} className="dropdown-content p-0 z-[1] menu shadow bg-neutral rounded-box">
              <li>
                <button className=" btn btn-md btn-square place-content-center btn-ghost">
		<Link to="/settings">
                  <span className="material-symbols-outlined">settings</span>
		</Link>
                </button>
                <Link
                  to={props.loginState === 'users' ? '/familydashboard' : '/home'}
                  className=" btn btn-md btn-square place-content-center btn-ghost"
                >
                  <button className=" btn btn-md btn-square place-content-center btn-ghost">
                    <span className="material-symbols-outlined">person</span>
                  </button>
                </Link>
                <button
                  className=" btn btn-md btn-square place-content-center btn-ghost"
                  onClick={props.handleLightMode}
                >
                  <span className="material-symbols-outlined">{!props.lightMode ? 'light_mode' : 'dark_mode'}</span>
                </button>
              </li>
            </ul>
          </details>
        </div>
      </div>
    </>
  );
}
