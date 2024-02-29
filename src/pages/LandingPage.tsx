import { Link } from 'react-router-dom';
import Footer from './Footer';
import { isLoggedIn } from '../contexts/pocketbase';

function LandingPage() {
  return (
    <>
      <Navbar />
      <div className="join left-2 top-2 sticky md:hidden z-50 m-1 bg-black">
        <button className="join-item btn btn-md btn-secondary">SignUp</button>
        <button className="join-item btn btn-primary mx-1">Login</button>
      </div>
      <div className=" hero bg-base-100 w-full text-center" style={{ height: '40vh' }}>
        <h1 className="text-5xl my-10 font-extrabold">
          <span className="font-black italic underline underline-offset-8">Empower</span> your shopping with PantryPlus.
        </h1>
      </div>
      <div className="bg-neutral grid grid-cols-1 md:grid-cols-2 gap-10 p-5 md:p-10">
        <div className="card max-sm:w-11/12 w-9/12 md:aspect-video bg-base-100 shadow-xl m-auto">
          <div className="card-body">
            <h2 className="card-title">Family-friendly grocery list management.</h2>
            <p>
              Always know what your shopping for! Learn what your family wants and needs in your next trip to the store.
            </p>
          </div>
        </div>
        <div className="card max-sm:w-11/12 w-9/12 md:aspect-video bg-base-100 shadow-xl m-auto">
          <div className="card-body">
            <h2 className="card-title">Full control of your list</h2>
            <p>
              Set user roles for your family, control who can add items or remove them, with or without approval from{' '}
              <span className="italic font-bold">you.</span>
            </p>
          </div>
        </div>
        <div className="card max-sm:w-11/12 w-9/12 md:aspect-video bg-base-100 shadow-xl m-auto">
          <div className="card-body">
            <h2 className="card-title">Avoid Conflicts with real time list syncing</h2>
            <p>
              Make sure everyone is on the same page with real time list syncing. So everyone{' '}
              <span className="font-bold italic">always</span> knows whats on the list.{' '}
            </p>
          </div>
        </div>
        <div className="card max-sm:w-11/12 w-9/12 md:aspect-video bg-base-100 shadow-xl m-auto">
          <div className="card-body">
            <h2 className="card-title">Save time with list History</h2>
            <p>Automatic item suggestions based on your list history. Reload an old list at any time</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LandingPage;

function Navbar(props: any) {
  return (
    <>
      <div className="navbar bg-base-200 z-50 max-h-6 sticky left-0 top-0 hidden md:flex shadow-2xl">
        <div className="flex-none"></div>
        <div className="flex-1">
          <a className="m-2 font-semibold btn normal-case text-xl btn-ghost">PantryPlus</a>
        </div>
        <div className="flex-1"></div>
        <div className="flex-none">
          <Link to={isLoggedIn() ? '/home' : '/login'}>
            <button className="btn btn-primary mx-2">Login</button>
          </Link>
          <Link to="/chooseSignUp">
            <button className="btn btn-secondary">SignUp</button>
          </Link>
        </div>
      </div>
    </>
  );
}
