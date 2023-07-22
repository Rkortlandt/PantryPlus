import { useMutation } from '@tanstack/react-query';
import pb from '../contexts/pocketbase';

export function useUserLogin() {
  const LoginUser = async ({ usernameEmail, password }: { usernameEmail: string; password: string }) => {
    await pb.collection('users').authWithPassword(usernameEmail, password);
  };
  return useMutation(LoginUser);
}

export function useCoordinatorLogin() {
  const LoginCoordinator = async ({ usernameEmail, password }: { usernameEmail: string; password: string }) => {
    await pb.collection('coordinators').authWithPassword(usernameEmail, password);
  };
  return useMutation(LoginCoordinator);
}
