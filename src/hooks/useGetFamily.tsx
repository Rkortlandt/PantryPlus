import { useState } from 'react';
import pb from '../contexts/pocketbase';
import { useQuery } from '@tanstack/react-query';
import { IFamily } from '../pages/FamilyDashboard';

export default function useGetFamily() {
  async function getFamily() {
    if (pb.authStore.model?.family) {
      const family: IFamily = await pb
        .collection('familys')
        .getOne(`${pb.authStore.model?.family}`, {
          expand: 'familyCoordinator,familyManagers,familyRequesters,familyViewers',
        });
      return { family: family, hasFamily: true };
    } else {
      return { hasFamily: false };
    }
  }
  return useQuery(['getFamily', pb.authStore.model?.id], getFamily);
}
