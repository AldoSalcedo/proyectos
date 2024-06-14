import { FC, useState } from 'react'
import {
  faFileArchive,
  faAngleDoubleLeft,
  faAngleLeft,
  faAngleRight,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Buttons from './components/Buttons'
import Cards from './components/Cards'
import Carousel from './components/Carousel'
import Details from './components/Details'
import { Modal } from './components/Modal'
import SideBar from './components/SideBar'
import SearchInput from './components/SearchInput'

const branchIcon = faFileArchive

export const Home: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = 10 // Ejemplo, debes ajustar esto según tu lógica
  const startIndex = (currentPage - 1) * 10
  const endIndex = startIndex + 10

  const handleFirstPage = () => setCurrentPage(1)
  const handlePreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const handleLastPage = () => setCurrentPage(totalPages)

  const closeModal = () => setIsModalOpen(false)
  const handleFormSubmit = () => {
    // Lógica para manejar el envío del formulario
    closeModal()
  }

  const filterData = () => {}

  return (
    <div className="h-screen w-screen grid grid-rows-12 grid-cols-7 gap-4 p-4">
      {/* Sidebar */}
      <SideBar />

      {/* Navigation Buttons */}
      <div className="col-span-6 row-span-1 bg-gray-800 rounded-3xl drop-shadow-lg p-2 flex">
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 w-full p-1">
          <Buttons navigateTo="/about">Nav Button</Buttons>
        </div>
      </div>

      {/* Widget 1 */}
      <div className="col-span-3 row-span-8 bg-white rounded-3xl drop-shadow-lg p-6">
        {/* Filter Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-1">
          <Buttons filterFunction={filterData}>
            <FontAwesomeIcon className="mr-2" icon={branchIcon} />
          </Buttons>
        </div>

        {/* Search Bar */}
        <SearchInput />

        {/* Pagination controls */}
        <div className="flex items-center justify-center mt-2">
          <div className="flex items-center justify-between space-x-2">
            <button onClick={handleFirstPage} disabled={currentPage <= 1}>
              <FontAwesomeIcon icon={faAngleDoubleLeft} />
            </button>
            <button onClick={handlePreviousPage} disabled={currentPage <= 1}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>

            <div>
              Mostrando {startIndex + 1} - {endIndex} de {'productos filtrados'}{' '}
              Producos
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
            <button
              onClick={handleLastPage}
              disabled={currentPage >= totalPages}
            >
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </button>
          </div>
        </div>

        {/* Products Cards */}
        <Cards />
      </div>

      {/* Widget 2 */}
      <div className="col-span-3 row-span-11 bg-white rounded-3xl drop-shadow-lg p-6">
        <Details />
      </div>

      {/* Widget 3 */}
      <div className="col-span-3 row-span-3 bg-white rounded-3xl drop-shadow-lg p-6">
        <Carousel />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          title="Iniciar Reclamación"
          onClose={closeModal}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  )
}
