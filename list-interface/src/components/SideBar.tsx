import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className="row-span-12 col-span-1 bg-gray-800 text-white p-4 rounded-3xl">
      <div className="grid grid-rows-6 h-full">
        <div className="h-20 flex flex-col items-center">
          <img className="w-10 h-10" src="" alt="" />
        </div>

        <ul className="row-start-2 row-end-6 h-full flex flex-col items-start">
          <li className="mb-2">
            <Link to="/" className="hover:text-gray-400">
              Home
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/about" className="hover:text-gray-400">
              About
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/contact" className="hover:text-gray-400">
              Contact
            </Link>
          </li>
        </ul>

        <div className="row-start-6 flex flex-col items-start mt-auto">
          <Link to="/login" className="hover:text-gray-400">Log Out</Link>
        </div>
      </div>
    </div>
  )
}

export default SideBar
