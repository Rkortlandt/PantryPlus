import pb from '../contexts/pocketbase';
import { useQuery } from '@tanstack/react-query';
import { IFamily, IFamilyRelationship,  } from '../pages/FamilyDashboard';

export interface familyRelationship {
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  id: string;
  family: string;
  role: 'manager' | 'requester' | 'viewer';
}


async function getFamily (familyId: string) {
  if (familyId) {
    const family: IFamily = await pb.collection('families').getOne(familyId, {
      expand: 'familyCoordinator, familyMembers.user'
    });
    return family;
  } else {
    return;
  }
}
async function getFamilyRelationship() {
  if (pb.authStore.model?.familyRelation) {
    const familyRelationship: IFamilyRelationship = await pb
      .collection('familyRelation')
      .getOne(`${pb.authStore.model?.familyRelation}`);
    return familyRelationship;
  } else {
    return;
  }
}
export default function useGetFamily() {

const { data: familyRelationship, isSuccess: isRelationQuerySuccess, isError: isRelationQueryError} = useQuery({queryKey: ['familyRelationship', pb.authStore.model?.id], queryFn: getFamilyRelationship,})
const familyRelationshipFamily: string | undefined = familyRelationship?.family
const { data: family, isSuccess: isFamilyQuerySuccess, isError: isFamilyQueryError } = useQuery(['family', familyRelationship?.family], () => getFamily(familyRelationship!.family), { enabled: !!familyRelationshipFamily });


console.log( { family, familyRelationship } );
console.log( family, familyRelationship, isRelationQuerySuccess, isFamilyQuerySuccess, isRelationQueryError, isFamilyQueryError);
return { family, familyRelationship, isRelationQuerySuccess, isFamilyQuerySuccess, isRelationQueryError, isFamilyQueryError};

}
  

