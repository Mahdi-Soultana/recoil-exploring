import DataTreeExample from './dataTreeExample';
import UserAsync from './userInfoExample/UserAsync';

function Asyn1() {
  return (
    <div className="max-w-xl w-full flex-shrink-0 m-auto h-screen  ">
      <UserAsync />
      {/* <hr className="my-4 h-1" /> */}
      <div className="h-[1px] w-full bg-black my-4"></div>
      <DataTreeExample />
    </div>
  );
}

export default Asyn1;
