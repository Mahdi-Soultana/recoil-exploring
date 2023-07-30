import { useSetRecoilState } from 'recoil';
import { userId } from './atom';

function SelectUser() {
  const setUserId = useSetRecoilState(userId);
  return (
    <select
      onChange={(e) => setUserId(e.target.value)}
      className=" py-1 p-2 rounded shadow text-lg dark:text-blue-700"
    >
      <option value="1">user 1</option>
      <option value="2">user 2</option>
      <option value="3">user 3</option>
    </select>
  );
}

export default SelectUser;
