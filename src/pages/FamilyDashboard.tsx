import React, { useEffect, useMemo, useState } from 'react';
import { hasFamily, isLoggedInAsCoordinator } from '../contexts/pocketbase';
import useGetFamily from '../hooks/useGetFamily';
import Loading from './Loading';
import { useGetLoginState, useGetModel } from '../hooks/useGetLoginState';
import Table from '../components/FamilyDashboard/Table';
import { useLeaveFamily } from '../hooks/useLeaveFamily';
import { useNavigate } from 'react-router-dom';

export interface IUser {
  avatar: string;
  collectionId: string;
  collectionName: string;
  created: string;
  email: string;
  emailVisibility: boolean;
  familyRelation: string;
  id: string;
  name: string;
  updated: string;
  username: string;
  verified: boolean;
}


export interface IFamilyMember {
  collectionId: string;
  collectionName: string;
  created: string;
  expand: {
    user: IUser;
  };
  family: string;
  id: string;
  role: 'manager' | 'requester' | 'viewer';
  updated: string;
  user: string;
}

export interface IFamilyRequest {
  id: string,
  userRequest: string,
  family: string,
  role: 'manager' | 'requester' | 'viewer';
}

export interface IFamilyCoordinator {
  collectionId: string;
  collectionName: string;
  created: string;
  emailVisibility: boolean;
  expand: any;
  family: string;
  familyName: string;
  id: string;
  name: string;
  updated: string;
  username: string;
  verified: boolean;
}

export interface IFamily {
  collectionId: string;
  collectionName: string;
  created: string;
  expand: {
    familyCoordinator: IFamilyCoordinator;
    familyMembers: IFamilyMember[];
  };
  familyCoordinator: string;
  familyMembers: string[];
  familyName: string;
  familyRequests: string;
  hidden: boolean;
  id: string;
  updated: string;
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
declare global {
  interface Window {
    deleteFamilyModal: any; 
    changeRoleModal: any;// Replace 'any' with the actual type if known
  }
}

const FamilyDashboard = () => {
  const {...query} = useGetFamily();
  const {mutate: leaveFamilyMutate, ...leaveFamily} = useLeaveFamily();
  const model = useGetModel();
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  if (!query.isFamilyQuerySuccess || !query.isRelationQuerySuccess) return <Loading />;
  else if (query.isFamilyQueryError || query.isRelationQueryError) return navigate('/home');
  else if (query.family == undefined) return <p>No Family</p>;
  else if (query.familyRelationship == undefined) return <p>No Family Relationship</p>;
  else if (query.familyRelationship.role === 'requester') return <p>Waiting for approval</p>;

  
  const userFamily: IFamily = query.family;
  const userFamilyRelationship: IFamilyRelationship = query.familyRelationship;
  const familyCoordinator: IFamilyCoordinator = userFamily.expand.familyCoordinator;

    return (
      <>
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="card card-body bg-base-200 flex flex-col m-6 items-center w-96 h-full justify-center">
            <h1 className="text-4xl max-sm:3xl font-bold">Family Dashboard</h1>
            <h1 className="text-2xl max-sm:lg">Welcome, {model.name != '' ? model.name : model.username}</h1>
            <div className="overflow-x-auto w-full">
              <div className="flex justify-between mb-2">
                <button className="btn btn-primary" onClick={()=>window.changeRoleModal.showModal()}>Request New Role</button>
                <button className="btn btn-error" onClick={()=>window.deleteFamilyModal.showModal()}>Leave family</button>
              </div>
              <Table familyCoordinator={familyCoordinator} familyMembers={userFamily.expand.familyMembers} model={model} />
              
              <dialog id="deleteFamilyModal" className="modal modal-bottom sm:modal-middle">
                <form method="dialog" className="modal-box">
        
                  <div className='flex justify-between modal-top items-center'>
                    <h3 className="font-bold text-lg">Leave Family</h3> 
                    <button className='btn btn-square' onClick={() => setInputValue('')}><span className="material-symbols-outlined">close</span></button>
                  </div>
                  <p className="py-4">Are you sure you want to leave this family? Your family coordinator will have to approve you if you wish to rejoin. Type <span className='italic'>yes</span> below to confirm.</p>
                  <div className="modal-action">
                    <input 
                      type="text" 
                      className='input input-bordered'
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)} 
                    />
                    <button className="btn btn-error" disabled={inputValue !== 'yes'} onClick={() => {leaveFamilyMutate(); navigate('/home')}}>Delete</button>
                  </div>
                </form>
              </dialog>

              <dialog id="changeRoleModal" className="modal modal-bottom sm:modal-middle">
                <form method="dialog" className="modal-box">
                  <h3 className="font-bold text-lg">Hello!</h3>
                  <p className="py-4">Press ESC key or click the button below to close</p>
                  <div className="modal-action">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </div>
                </form>
              </dialog>
            </div>
          </div>
        </div>
      </>
    );

};

export default FamilyDashboard;
