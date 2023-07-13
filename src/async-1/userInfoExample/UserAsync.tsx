import { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import Thumbnail, { ThumbnailLoading } from '../Thumbnial';
import SelectUser from './SelectUser';
import UserInfo from './UserInfo';
import { userId } from './atom';

function UserAsync() {
  const id = useRecoilValue(userId);

  return (
    <>
      <div className="flex items-center justify-end ">
        <SelectUser />
      </div>
      <Suspense fallback={<ThumbnailLoading />}>
        <Thumbnail />
      </Suspense>
      <Suspense
        fallback={
          <>
            <ThumbnailLoading className="w-full h-[100px] rounded  mt-6" />
          </>
        }
      >
        {id && <UserInfo id={id} />}
      </Suspense>
    </>
  );
}

export default UserAsync;
