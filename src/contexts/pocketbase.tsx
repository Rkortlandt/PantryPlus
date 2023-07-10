import React, { createContext, useContext, useState } from 'react';
import PocketBase from 'pocketbase';

// Create a new instance of PocketBase
const pb = new PocketBase('http://127.0.0.1:8090');

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
    const record = await pb.collection('coordinators').create(data);
    try {
      const authData = await pb.collection('coordinators').authWithPassword(data.email, data.password);
      try {
        const familyData = await pb
          .collection('familys')
          .create({ familyName, familyMembers: [], familyCoordinator: pb.authStore.model?.id });
      } catch (error) {
        return error;
      }
    } catch (error) {
      return error;
    }
  } catch (error) {
    return error;
  }
};

export const login = async (usernameEmail: string, password: string) => {
  try {
    const authData = await pb.collection('users').authWithPassword(usernameEmail, password);
  } catch {
    try {
      const authData = await pb.collection('coordinators').authWithPassword(usernameEmail, password);
    } catch (error) {
      return error;
    }
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
