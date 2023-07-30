import StyledNavLink from './component/StyledNavLink';

function Nav() {
  return (
    <ul
      className={`absolute top-4 left-8 text-sm capitalize flex items-center space-x-4  z-[100]`}
    >
      <StyledNavLink link="/" text="home" />
      <StyledNavLink link="/themeMode" text="themeMode" />
      <StyledNavLink link="/todoapp" text="TodoApp" />
      <StyledNavLink link="/async1" text="async1" />
      <StyledNavLink link="/datatree" text="dataTree" />
    </ul>
  );
}

export default Nav;
