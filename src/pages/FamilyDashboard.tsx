import React, { useEffect, useMemo, useState } from 'react';
import { hasFamily, isLoggedInAsCoordinator } from '../contexts/pocketbase';
import useGetFamily from '../hooks/useGetFamily';
import Loading from './Loading';
import { useGetLoginState, useGetModel } from '../hooks/useGetLoginState';
import Table from '../components/FamilyDashboard/Table';

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  family: string;
  name: string;
}

export interface IFamilyMember {
  id: string;
  user: string;
  family: string;
  role: 'manager' | 'requester' | 'viewer';
}

export interface IFamilyRequest {
  id: string,
  userRequest: string,
  family: string,
  role: 'manager' | 'requester' | 'viewer';
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
export interface IFamilyRelationship {
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  id: string;
  family: string;
  role: 'manager' | 'requester' | 'viewer';
  expand: {
    familyCoordinator: IUser;
    familyMembers: IFamilyMember[];
    
  };
}

const FamilyDashboard: React.FC = () => {
  const {...query} = useGetFamily();
  const model = useGetModel();

  if (!query.isFamilyQuerySuccess || !query.isRelationQuerySuccess) return <Loading />;
  if (query.isFamilyQueryError || query.isRelationQueryError) return <p>Error</p>;
  if (query.family == undefined) return <p>No Family</p>;
  if (query.familyRelationship == undefined) return <p>No Family Relationship</p>;
  
  const userFamily: IFamily = query.family;
  const userFamilyRelationship: IFamilyRelationship = query.familyRelationship;

  const familyCoordinator: IUser = userFamily.expand.familyCoordinator;
    return (
      <>
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="card card-body bg-base-200 flex flex-col m-6 items-center w-96 h-full justify-center">
            <h1 className="text-4xl max-sm:3xl font-bold">Family Dashboard</h1>
            <h1 className="text-2xl max-sm:lg">Welcome, {model.name != '' ? model.name : model.username}</h1>
            <div className="overflow-x-auto w-full">
              <div className="flex justify-between mb-2">
                <button className="btn btn-primary">Request New Role</button>
                <button className="btn btn-error">Leave family</button>
              </div>
              <Table familyCoordinator={familyCoordinator} userFamily={userFamily} model={model} />
            </div>
          </div>
        </div>
      </>
    );

};

export default FamilyDashboard;
