import { IFamily, IUser } from "../../pages/FamilyDashboard";

const Table: React.FC<{familyCoordinator: IUser, userFamily: IFamily, model: IUser}> = ({familyCoordinator, userFamily, model}) => {
  return (
    <table className="table w-full bg-base-100">
      {/* head */}
      <thead>
        <tr>
          <td>Name</td>
          <td>Role</td>
        </tr>
      </thead>
      <tbody>
        <tr className="items-center">
          <td className={familyCoordinator.username === model.username ? 'bg-primary' : ''}>
            {familyCoordinator.username === model.username ? (
              <span className="badge-accent badge mr-2">You</span>
            ) : (
              <></>
            )}
            {familyCoordinator.name != '' ? familyCoordinator.name : familyCoordinator.username}
          </td>
          <td>
            <span className="badge-primary badge">Coordinator</span>
          </td>
        </tr>

        {userFamily.expand.familyManagers !== undefined &&
          userFamily.expand.familyManagers.map((manager) => (
            <tr
              className={
                manager.username === model.username
                  ? 'bg-base-300 border-base-100 border-4 items-center'
                  : 'items-center'
              }
            >
              <td>{manager.name !== '' ? manager.name : manager.username}</td>
              <td>
                {manager.username === model.username ? <span className="badge-accent badge mr-2">You</span> : <></>}
                <span className="badge-secondary badge">Manager</span>
              </td>
            </tr>
          ))}
        {userFamily.expand.familyRequesters !== undefined &&
          userFamily.expand.familyRequesters.map((requester) => (
            <tr
              className={
                requester.username === model.username
                  ? 'bg-base-300 border-base-100 border-4 items-center'
                  : 'items-center'
              }
            >
              <td>{requester.name != '' ? requester.name : requester.username}</td>
              <td>
                {requester.username === model.username ? <span className="badge-accent badge mr-2">You</span> : <></>}
                <span className=" badge-accent badge">Requester</span>
              </td>
            </tr>
          ))}
        {userFamily.expand.familyViewers !== undefined &&
          userFamily.expand.familyViewers.map((viewer) => (
            <tr
              className={
                viewer.username === model.username
                  ? 'bg-base-300 border-base-100 border-4 items-center'
                  : 'items-center'
              }
            >
              <td>{viewer.name != '' ? viewer.name : viewer.username}</td>
              <td>
                {viewer.username === model.username ? <span className="badge-accent badge mr-2">You</span> : <></>}
                <span className="badge">Viewer</span>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Table;