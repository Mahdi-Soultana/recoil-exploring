import { motion } from 'framer-motion';
import { RiArrowDownSLine } from 'react-icons/ri';
function Arrow({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.span
      className="absolute  -left-0"
      initial={{ rotate: -90 }}
      animate={{ rotate: !isOpen ? -90 : 0 }}
    >
      <RiArrowDownSLine />
    </motion.span>
  );
}
export default Arrow;
