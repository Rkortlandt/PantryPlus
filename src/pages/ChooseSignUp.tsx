import { Link } from 'react-router-dom';

export default function ChooseSignUp() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <div className="card card-body bg-base-200 flex flex-col m-6 items-center justify-center w-96">
          <h1 className="text-4xl max-sm:3xl font-bold">Who are you?</h1>
          <br className="max-sm:hidden"></br>
          <div className="flex flex-col items-center justify-center w-full">
            <div className="card card-body bg-neutral w-full p-2 my-2">
              <p className="text-center">I am joining an already established family</p>
              <Link to="/signup">
                <button className="btn btn-primary w-full p-2 my-2">Sign Up as a Member</button>
              </Link>
            </div>
            <div className="card card-body bg-secondary w-full p-2 my-2">
              <p className="text-center">I am creating a new family and will be the coordinator</p>
              <Link to="/signup_coordinators">
                <button className="btn btn-neutral w-full p-2 my-2">Sign Up as a family Coordinator</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
