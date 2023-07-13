import { useRecoilValue } from 'recoil';
import { getPicture } from './userInfoExample/atom';
export const ThumbnailLoading = ({ className = 'rounded-full w-12 h-12 ' }) => (
  <div className=" flex justify-center items-center">
    <div
      className={`  bg-gray-300 border animate-pulse ${className} border-gray-300`}
    />
  </div>
);
// other way to load async data
// const data = useRecoilValueLoadable(getPicture);
// let picture = null;
// switch (data.state) {
//   case 'hasValue':
//     picture = data.contents;
//     break;
//   case 'hasError':
//     console.log('error');
//     break;
//   case 'loading':
//     console.log('loading');
//     return null;
// }
function Thumbnail() {
  const picture = useRecoilValue(getPicture);

  if (picture == null) return null;
  return (
    <div className=" flex justify-center items-center">
      <img
        src={picture}
        className="rounded-full w-12 h-12 border-gray-300 border   m-auto"
      />
    </div>
  );
}

export default Thumbnail;
