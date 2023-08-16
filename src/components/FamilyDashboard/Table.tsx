import { IFamily, IUser, IFamilyMember, IFamilyCoordinator } from "../../pages/FamilyDashboard";

const Table: React.FC<{familyCoordinator: IFamilyCoordinator, familyMembers: IFamilyMember[], model: IUser}> = ({familyCoordinator, familyMembers, model}) => {
  const roleOrder = {
    'manager': 0,
    'requester': 1,
    'viewer': 2
  }
  familyMembers = familyMembers.sort((a, b) => {
    return roleOrder[a.role] - roleOrder[b.role]
  })
  console.log(familyMembers)
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
        {familyMembers.length > 0 && familyMembers.map((member) => {
          return (
            <tr className='items-center'>
              <td className={`${member.user === model.id ? 'bg-neutral' : ''}`}>
                {member.expand.user.name != '' ? member.expand.user.name : member.expand.user.username}
                {member.user === model.id ? (
                  <span className="badge-accent badge ml-2">You</span>
                ) : (
                  <></>
                )}
              </td>
              <td className={`${member.user === model.id ? 'bg-neutral' : ''}`}>
                <span className={`badge-secondary badge`}>{member.role}</span>
              </td>
            </tr>
          );
        })}    
      </tbody>
    </table>
  );
}

export default Table;