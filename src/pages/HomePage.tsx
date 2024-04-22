import Footer from './Footer';
import { useState, useEffect } from 'react';
import { findFamilyWithCode } from '../contexts/pocketbase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { pb } from '../contexts/pocketbase'
import Loading from './Loading';
import Toast from '../components/toast';

export default function HomePage () {
	return (
		<>
			<Footer />
		</>
	);
}

export function AddRequest() {
	const [showToast, setShowToast] = useState(false);
	const queryClient = useQueryClient();
	const [familyCode, setFamilyCode] = useState("");
	const familyRequestMutation = useMutation({
		onSettled: () => queryClient.invalidateQueries({ queryKey: ['pendingRequest'] }),
    	mutationFn: (family) => { return pb.collection("familyRequests").create({"user": pb.authStore.model?.id, "family": family})}
 	})	

	useEffect(() => {
			if (showToast) {
			const timer = setTimeout(() => {
				setShowToast(false);
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [showToast]);


	async function searchForFamily(familyCode: string) {
		try {
			var family = await findFamilyWithCode(familyCode);
			familyRequestMutation.mutate(family.id);
		} catch (error) {
			return setShowToast(true);
		}
	}

	return (
	<>
		<div className="card h-full flex justify-center items-center m-2 bg-base-300 shadow-xl">
			<p className="text-sm font-bold w-fit pb-4">Well this is boring...</p>
			<p className="text-3xl font-bold w-fit pb-8">Join a Family!</p>
			<div className="flex">
				<input type="text" className="input input-bordered mx-2" placeholder="Enter Code" onChange={(e) => setFamilyCode(e.target.value)}/>
				<button className="btn btn-primary" onClick={() => {
					searchForFamily(familyCode);
				}}>Submit</button>
			</div>
        	<Toast message="Failed to find family" hidden={!showToast} type="error" />
		</div>
		<Footer/>
		</>
	);
}

export function PendingRequest() {
	const { isLoading, isError, data, error} = useQuery({ queryKey: ['pendingRequest'], 
		queryFn: () => {
			return pb.collection('familyRequests').getFirstListItem(`user.id="${pb.authStore.model?.id}"`, {
    			expand: 'family',
			})
		},
		refetchOnWindowFocus: false,
		retry: 1
	});

	if (isLoading) {
		return <div className="card h-full flex justify-center items-center m-2 bg-base-300 shadow-xl"><Loading/></div>
	}

	if (isError) {
		console.log(error);
		return false;

	}

	if (data) {
	  return (
	<>
	  <div className="card h-full flex justify-center items-center m-2 bg-base-300 shadow-xl">
	      <p className="text-3xl font-bold w-fit pb-8">You have a pending family request</p>
	      <p className="text-sm font-bold w-fit pb-4">Ask your family coordinator to accept your request (You may need to refresh)</p>
	      </div>
		<Footer/>
		  </>
		);
	}
}
