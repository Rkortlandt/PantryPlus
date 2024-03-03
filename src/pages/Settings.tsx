import UserSettings from './SettingsUsers';
import CoordinatorSettings from './SettingsCoordinators';
import { logout } from '../contexts/pocketbase';
import { isLoggedInAsCoordinator } from '../contexts/pocketbase';
import { Link, useNavigate } from 'react-router-dom';

export default function Settings():JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="h-screen">   
    {/* Settings bubble (Small Screens)*/}
    <div className="join p-2">
      <button 
        className="join-item btn btn-md"
	>
	<Link to="/home/">
	  <span className="material-symbols-outlined">Home</span>
	</Link>
      </button>
      <button className="join-item btn btn-md">
	<span className="material-symbols-outlined">dark_mode</span>
      </button>
      <button
	className="join-item btn btn-primary"
	onClick={() => {
	  logout();
	  navigate("/");
	}}>
	Logout
      </button>
    </div>
      {isLoggedInAsCoordinator()? <CoordinatorSettings/>: <UserSettings/>}
    </div>
  );
}
