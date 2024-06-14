import {FC} from 'react';
import { useNavigate } from 'react-router-dom';

interface ButtonsProps {
  filterFunction?: () => void;
  navigateTo?: string;
  selected?: boolean;
  children: React.ReactNode;
}

const Buttons: FC<ButtonsProps> = ({ filterFunction, navigateTo, selected, children }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (filterFunction) {
      filterFunction();
    }
    if (navigateTo) {
      navigate(navigateTo);
    }
  };
  
  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-center justify-center relative text-[#B4B5DF] rounded-xl font-bold bg-[#4755d6] mb-2 py-2 px-2 ${selected ? 'text-white' : ''}`}
    >
      {children}
    </button>
  );
};

export default Buttons;