import {FC} from 'react'

const SearchInput: FC = ({ value, onChange }) => {
  return (
    <input
      className='rounded border border-gray focus:outline-none focus:border-blue p-2 mb-2 w-full'
      type="text"
      placeholder='Search'
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchInput;