import React, { createContext, useContext, useState } from 'react';
import PocketBase from 'pocketbase';

// Create a new instance of PocketBase
export const pb = new PocketBase('http://127.0.0.1:8090');
export default pb;
export const addUser = async (
  username: string,
  email: string,
  password: string,
  passwordConfirm: string,
  name?: string,
) => {
  const data = {
    username,
    email,
    emailVisibility: false,
    password,
    passwordConfirm,
    name: name || 'no-name',
  };
  try {
    const record = await pb.collection('users').create(data);
    console.log(record);
  } catch (error) {
    return error;
  }
};

export const addCoordinator = async (
  username: string,
  email: string,
  password: string,
  passwordConfirm: string,
  familyName: string,
  name?: string,
) => {
  const data = {
    username,
    email,
    password,
    passwordConfirm,
    familyCode: generateNewFamilyCode(),
    familyCodeUpdated: new Date().toISOString().toString(),
    name,
    familyName,
  };
  console.log(data);
  try {
    await pb.collection('coordinators').create(data);
    try {
      await pb.collection('coordinators').authWithPassword(data.email, data.password);
    } catch (error) {
      return { error: error, message: 'failed to authenticate' };
    }
  } catch (error) {
    return { error: error, message: 'failed to create a new account' };
  }
};

export const createFamilyRequest = async (familyId: string) => {
  if (!isLoggedInAsCoordinator()) { 
    return {error: "Not a coordinator", message: "Not a coordinator"};
  }
   
  const data = {
    "user": pb.authStore.model?.id,
    "family": familyId,
  }
  try {
    await pb.collection("familyRequests").create(data);
  } catch (error) {
    return {error: error, message: "Failed to create familyRequest"};
  }
}

export const generateNewFamilyCode = ():string => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};


//export const listFamilyRequests = async () => {
  
//}

export const hasFamily = async () => {
  if (!pb.authStore.model) return false;
  try {
    await pb.collection('users').getOne(pb.authStore.model?.id);
    return true;
  } catch {
    return false;
  }
};

export const logout = async () => {
  pb.authStore.clear();
};

export const isLoggedIn = () => {
  return pb.authStore.isValid;
};

export const isLoggedInAsUser = ():boolean => {
  return (pb.authStore.isValid && pb.authStore.model?.collectionName === "users");
};

export const isLoggedInAsCoordinator = ():boolean => {
  return (pb.authStore.isValid && pb.authStore.model?.collectionName === "coordinators");
};
