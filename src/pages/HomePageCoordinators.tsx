import { Link } from 'react-router-dom';
import Footer from './Footer';
import { useQuery } from '@tanstack/react-query'
import { pb } from '../contexts/pocketbase'
import Loading from './Loading';
import Table from '../components/FamilyDashboard/Table';
export default function HomePageCoordinators() {
	return (
			<>
				{PendingRequest()? <PendingRequest/> : <div className="card h-full flex justify-center items-center m-2 bg-base-300 shadow-xl">
					<p className="text-2xl font-bold w-fit pb-8">It seems no ones here yet...</p>
					<Link to="/settings" className="w-auto">
						<button className="btn btn-primary px-10">Invite People</button>
					</Link>
				</div>}
				<Footer />
			</>);
}

function PendingRequest() {
	const { isLoading, isError, data, error} = useQuery({ queryKey: ['requests'], 
		queryFn: () => {
			return pb.collection('familyRequests').getList(1, 5, {filter:`family.id="${pb.authStore.model?.id}"`, expand:"user"})
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
		console.log(data.items)
		return (
			<div className="card h-full flex justify-center items-center m-2 bg-base-300 shadow-xl">
				<table className="table w-full bg-base-100">
					<thead>
						<tr>
						<td>Name</td>
						<td>Role</td>
						</tr>
					</thead>
					<tbody>
						{data.items.map((request) => {
							return (
								<tr className='items-center'>
									<td>
										{request.expand.user.name != '' ? request.expand.user.name : request.expand.user.username}
									</td>
								</tr>
							);
						})}    
					</tbody>
				</table>
			</div>
		);
	}
}
