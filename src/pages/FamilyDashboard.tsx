import React, { useEffect, useMemo, useState } from 'react';
import { hasFamily, isLoggedInAsCoordinator } from '../contexts/pocketbase';
import useGetFamily from '../hooks/useGetFamily';
import Loading from './Loading';
import { useGetLoginState, useGetModel } from '../hooks/useGetLoginState';

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  family: string;
  name: string;
}
export interface IFamily {
  familyName: string;
  familyCoordinator: string;
  expand: {
    familyCoordinator: IUser;
    familyManagers: IUser[];
    familyRequesters: IUser[];
    familyViewers: IUser[];
  };
  familyManagers: string[];
  familyRequesters: IUser[];
  familyViewers: IUser[];
}

const FamilyDashboard: React.FC = () => {
  const { data: family, isError, isSuccess, isFetching } = useGetFamily();
  const model = useGetModel();

  if (!isSuccess) return <Loading />;
  if (isError) return <p>Error</p>;
  console.log(family?.family);
  if (family?.hasFamily != false) {
    if (!family?.family) return;
    const userFamily: IFamily = family?.family;
    return (
      <>
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="card card-body bg-base-200 flex flex-col m-6 items-center w-96 h-full justify-center">
            <h1 className="text-4xl max-sm:3xl font-bold">Family Dashboard</h1>
            <h1 className="text-2xl max-sm:lg">Welcome, {model.name != '' ? model.name : model.username}</h1>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                {/* head */}
                <thead>
                  <tr>
                    <td>Name</td>
                    <td>Role</td>
                  </tr>
                </thead>
                <tbody>
                  <tr className="items-center">
                    <td>
                      {userFamily.expand.familyCoordinator.username === model.username ? (
                        <span className="badge-accent badge mr-2">You</span>
                      ) : (
                        <></>
                      )}
                      {userFamily.expand.familyCoordinator.name != ''
                        ? userFamily.expand.familyCoordinator.name
                        : userFamily.expand.familyCoordinator.username}
                    </td>
                    <td>
                      <span className="badge-primary badge">Coordinator</span>
                    </td>
                  </tr>
                  {userFamily.expand.familyManagers.map((manager) => (
                    <tr className="items-center">
                      <td>{manager.name != '' ? manager.name : manager.username}</td>
                      <td>
                        {manager.username === model.username ? (
                          <span className="badge-accent badge mr-2">You</span>
                        ) : (
                          <></>
                        )}
                        <span className="badge-secondary badge">Manager</span>
                      </td>
                    </tr>
                  ))}
                  {userFamily.expand.familyRequesters.map((requester) => (
                    <tr className="items-center">
                      <td>{requester.name != '' ? requester.name : requester.username}</td>
                      <td>
                        {requester.username === model.username ? (
                          <span className="badge-accent badge mr-2">You</span>
                        ) : (
                          <></>
                        )}
                        <span className=" badge-accent badge">Requester</span>
                      </td>
                    </tr>
                  ))}
                  {userFamily.expand.familyViewers.map((viewer) => (
                    <tr className="items-center">
                      <td>{viewer.name != '' ? viewer.name : viewer.username}</td>
                      <td>
                        {viewer.username === model.username ? (
                          <span className="badge-accent badge mr-2">You</span>
                        ) : (
                          <></>
                        )}
                        <span className="badge">Viewer</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <p>No Family</p>
      </>
    );
  }
};

export default FamilyDashboard;
