import {FC} from 'react';

const Badge: FC = ({ value }) => {
  return (
      <span className="absolute bg-blue-600 -top-2 -right-2 -pt-1 -mr-0 rounded-full w-6 h-6 flex items-center justify-center text-xs text-white z-10">
        {value}
      </span>
  );
};

export default Badge;