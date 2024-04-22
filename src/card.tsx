import { ReactElement } from 'react';

interface cardProps {
   children: ReactElement;
}

export function Card({ children }: cardProps ) {
  return (
    <div className="card h-full flex justify-center items-center m-2 bg-base-300 shadow-xl">
      { children }
    </div>
  );
}


