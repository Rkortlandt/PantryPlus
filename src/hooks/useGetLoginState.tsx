import { useQuery } from '@tanstack/react-query';
import pb from '../contexts/pocketbase';
import { useEffect, useState } from 'react';

export type LoginState = 'users' | 'coordinators' | null;

export function useGetLoginState(): LoginState {
  const model = pb.authStore.model;
  if (model?.collectionName === 'users') return 'users';
  if (model?.collectionName === 'coordinators') return 'coordinators';
  return null;
}

export function useGetModel(): any {
  const model = pb.authStore.model;
  return model;
}
