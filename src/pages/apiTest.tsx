import { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import { isLoggedIn, logout } from '../contexts/pocketbase';

export default function ApiTest() {
  const pb = new PocketBase('http://127.0.0.1:8090');
  const [userRequests, setUserRequests] = useState([]);
  const [families, setfamilies] = useState([
    {
      collectionId: '',
      collectionName: '',
      created: '',
      familyCoordinator: '',
      familyMembers: '',
      familyName: '',
      id: '',
      updated: '',
      expand: '',
    },
  ]);

  useEffect(() => {
    console.log(userRequests);
  }, [userRequests]);
  return (
    <>
      <p>Logged in {isLoggedIn() ? 'true' : 'false'}</p>
      <button
        onClick={() => {
          pb.collection('familys').create({
            familyName: '',
            familyMembers: [],
            familyCoordinator: pb.authStore.model?.id,
          });
        }}
        className="btn"
      >
        New Family
      </button>
      <button
        onClick={() => {
          pb.collection('userRequests').create({
            userRequest: pb.authStore.model?.id,
            family: families[1].id,
            role: 'viewer',
          });
        }}
        className="btn"
      >
        addUserRequest
      </button>
      <button onClick={() => logout()} className="btn">
        Logout
      </button>
      <button
        onClick={async () => {
          const authData = await pb.collection('users').authWithPassword('rkortlandt65@gmail.com', 'watermelon');
        }}
        className="btn"
      >
        Auth user
      </button>
      <button
        onClick={async () => {
          const authData = await pb.collection('coordinators').authWithPassword('rojo50', 'watermelon');
        }}
        className="btn"
      >
        Auth corrdinator
      </button>

      <button
        onClick={async () => {
          setUserRequests(
            await pb.collection('userRequests').getFullList({
              //   filter: `family.familyCoordinator.id = "4wtetfc2oct749b"`,
              //   sort: 'created',
            }),
          );
        }}
        className="btn"
      >
        Approve all requests
      </button>
      <button
        onClick={async () => {
          setfamilies(
            await pb.collection('familys').getFullList({
              sort: '-created',
            }),
          );
        }}
        className="btn"
      >
        List Familys
      </button>

      <ul>
        {families.map((family) => (
          <li key={family.id}>
            collectionId: {family.collectionId}
            <br />
            collectionName: {family.collectionName}
            <br />
            creation: {family.created}
            <br />
            coordinator: {family.familyCoordinator}
            <br />
            members: {family.familyMembers}
            <br />
            familyName: {family.familyName}
            <br />
            id: {family.id}
            <br />
            updated: {family.updated}
            <p>--------------</p>
          </li>
        ))}
      </ul>
    </>
  );
}
