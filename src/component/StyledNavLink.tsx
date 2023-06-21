import { NavLink } from 'react-router-dom';
import { backgroundAtom } from '../AppContainer';
import { useRecoilValue } from 'recoil';

const StyledNavLink = ({
  text = '',
  link = '/',
}: {
  text: string;
  link: string;
}) => {
  const background = useRecoilValue(backgroundAtom);
  return (
    <NavLink
      to={link}
      className={({ isActive, isPending }) => {
        return ` ${
          isActive
            ? 'text-green-500'
            : background
            ? 'text-white'
            : 'text-gray-900 '
        }`;
      }}
    >
      {text}
    </NavLink>
  );
};

export default StyledNavLink;
