import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import Nav from './Navigation';

function AppContainer() {
  return (
    <div className={` relative font-Lato `}>
      <Nav />
      <Background />
      <ToggleButton />
      <ContentContainer />
    </div>
  );
}

function ContentContainer() {
  const background = useRecoilValue(backgroundAtom);
  return (
    <div
      className={` ${
        background ? 'text-white' : 'text-gray-900'
      } relative z-20  min-h-screen   pt-20 flex items-center justify-center `}
    >
      <Outlet />
    </div>
  );
}
function Background() {
  const background = useRecoilValue(backgroundAtom);
  return (
    <div
      className={`min-h-screen   flex items-center justify-center ${
        background ? 'bg-gray-950 text-white' : 'bg-gray-100 text-gray-950'
      } absolute top-0 left-0 w-full h-full`}
    />
  );
}

export default AppContainer;

export const backgroundAtom = atom({
  key: 'backgroundAtom',
  default: false,
});
function ToggleButton() {
  const [background, setBackground] = useRecoilState(backgroundAtom);
  const classes = {
    dark: 'bg-gray-800',
    light: 'bg-white',
  };
  return (
    <motion.button
      onClick={() => {
        setBackground((s) => !s);
      }}
      title={background ? 'off' : 'on'}
      className={`w-[4rem] h-[1.55rem] z-[100] rounded-full  ${
        !background ? classes.dark : classes.light
      }   group absolute group top-8 right-8 flex items-center hover:opacity-80 shadow ${
        !background ? 'shadow-black/50' : 'shadow-yellow-100/70'
      }`}
    >
      <motion.div
        animate={{
          x: background ? '-8%' : '123%',
          transition: { duration: 0.3 },
        }}
        className={`h-[1.8rem] w-[1.8rem] rounded-full  relative z-20 ${
          !background ? classes.light : classes.dark
        } `}
      />
      <div className="w-full h-full absolute top-0 left-0 flex items-center z-10">
        <span className="w-full h-full block">🌛</span>
        <span className="w-full h-full block">🌞</span>
      </div>
    </motion.button>
  );
}
