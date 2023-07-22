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
    name,
    familyName,
  };

  try {
    const user = await pb.collection('coordinators').create(data);
    try {
      await pb.collection('coordinators').authWithPassword(data.email, data.password);
      try {
        const familyData = await pb
          .collection('familys')
          .create({ familyName, familyMembers: [], familyCoordinator: user.id });
        try {
          await pb.collection('coordinators').update(`${user.id}`, { family: `${familyData.id}` });
        } catch (error) {
          return { error: error, message: 'failed to update link to family' };
        }
      } catch (error) {
        return { error: error, message: 'failed to create family' };
      }
    } catch (error) {
      return { error: error, message: 'failed to authenticate' };
    }
  } catch (error) {
    return { error: error, message: 'failed to create a new account' };
  }
};

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

export const isLoggedInAsCoordinator = () => {
  return pb.authStore.isValid;
};
