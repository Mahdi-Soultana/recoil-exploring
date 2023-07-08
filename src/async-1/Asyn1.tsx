import React, { Suspense } from 'react';
import SelectUser from './SelectUser';
import UserInfo from './userInfo/UserInfo';
import { useRecoilValue } from 'recoil';
import { userId } from './atom';

function Asyn1() {
  const id = useRecoilValue(userId);

  return (
    <div className="max-w-xl w-full flex-shrink-0 m-auto h-screen  ">
      <div className="flex items-center justify-end ">
        <SelectUser />
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        {id && <UserInfo id={id} />}
      </Suspense>
    </div>
  );
}

export default Asyn1;
