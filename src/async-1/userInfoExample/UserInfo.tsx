import { Suspense } from 'react';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { ThumbnailLoading } from '../Thumbnial';
import Weather from './Weather';
import { userInfo } from './atom';
function UserInfo({ id }: { id: string }) {
  const info = useRecoilValue(userInfo(id));
  const refetch = useRecoilRefresher_UNSTABLE(userInfo(id));

  return (
    <div className="flex-center flex-col">
      <>
        <h1 className="font-medium mt-2">{info.name}</h1>

        <ul
          className=" list-disc w-[80%] m-auto mt-8 space-y-2
        min-h-[40px] "
        >
          <li>
            email:<b className="pl-4">{info.email}</b>
          </li>
          <li>
            phone:<b className="pl-4">{info.phone}</b>
          </li>
          <li>
            address:
            <b className="pl-4">
              {info.address.city},{info.address.street},{info.address.suite}
            </b>
          </li>
          <li>
            <Suspense
              fallback={
                <div className="flex items-center">
                  <p>Weather for {info.address.city} is : </p>
                  <ThumbnailLoading className="flex-shrink-0 h-[30px] w-[30px] ml-4 rounded" />
                </div>
              }
            >
              <Weather id={id} />
            </Suspense>
          </li>
        </ul>
        <button
          onClick={() => {
            refetch();
          }}
        >
          refetch
        </button>
      </>
    </div>
  );
}

export default UserInfo;
