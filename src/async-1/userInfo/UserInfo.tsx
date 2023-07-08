import React from 'react';
import { selector, selectorFamily, useRecoilValue } from 'recoil';
import { userId } from '../atom';
import axios from 'axios';
const userInfo = selectorFamily<any, string>({
  key: 'userInfoSelector',
  get: (id) => async () => {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    );

    return res.data;
  },
});

function UserInfo({ id = '1' }) {
  const info = useRecoilValue(userInfo(id));

  return (
    <div className="flex-center flex-col">
      <div className="rounded-full w-12 h-12  bg-red-500"></div>
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
      </ul>
    </div>
  );
}

export default UserInfo;
