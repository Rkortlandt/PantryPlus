import { useMutation } from '@tanstack/react-query';
import pb from '../contexts/pocketbase';

export function useLeaveFamily() {
    const leaveFamily = async () => {
      await pb.collection('familyRelation').delete(pb.authStore.model?.familyRelation);
    };
    return useMutation(leaveFamily);
  }