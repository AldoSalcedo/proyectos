import { FC, useState } from 'react'
import { faFileArchive } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Buttons from './components/Buttons'
import Cards from './components/Cards'
import Carousel from './components/Carousel'
import Details from './components/Details'
import { Modal } from './components/Modal'
import SideBar from './components/SideBar'
import SearchInput from './components/SearchInput'
import { Product, getAllCategories, getSingleProduct } from './urls/products'
import PaginationController from './components/Pagination'
import { useQuery } from '@tanstack/react-query'

export const Home: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const totalPages = 10 // Ejemplo, debes ajustar esto según tu lógica

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

  const handleSelectedProduct = (product) => {
    getSingleProduct(product.id)
  }

  const filterData = (category: string) => {
    setSelectedCategory(category)
    // Fetch and filter products based on category
    // This is a placeholder, replace it with the actual logic to fetch and filter products
    setProducts([])
  }

  const { data, error, isLoading } = useQuery({ queryKey: ['categories'], queryFn: getAllCategories });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;

  return (
    <div className="h-screen w-screen grid grid-rows-12 grid-cols-7 gap-4 p-4">
      {/* Sidebar */}
      <SideBar />

      {/* Navigation Buttons */}
      <div className="col-span-6 row-span-1 bg-gray-800 rounded-3xl drop-shadow-lg p-2 flex">
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 w-full p-1">
          <Buttons navigateTo="/">Manage Products</Buttons>
          <Buttons navigateTo="/sales">Sales</Buttons>
          <Buttons navigateTo="/clients">Clients</Buttons>
          <Buttons navigateTo="/services">Services</Buttons>
        </div>
      </div>

      {/* Widget 1 */}
      <div className="col-span-3 row-span-8 bg-white rounded-3xl drop-shadow-lg p-6">
        {/* Filter Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-1">
          {data?.map((item, index) => (
            <Buttons key={index} filterFunction={() => filterData(item)}>
              {item}
            </Buttons>
          ))}
        </div>

        {/* Search Bar */}
        <SearchInput />

        {/* Pagination controls */}
        <PaginationController
          currentPage={currentPage}
          totalPages={totalPages}
          onFirstPage={handleFirstPage}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
          onLastPage={handleLastPage}
        />

        {/* Products Cards */}
        <Cards onCardClick={handleSelectedProduct} />
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
