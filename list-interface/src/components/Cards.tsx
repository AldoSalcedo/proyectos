import { FC } from 'react'
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { Product, getProducts } from '../urls/products';

interface CardsProps {
  onCardClick: (product: Product) => void;
}

const Cards: FC<CardsProps> = ({ onCardClick }) => {
  const { data, error, isLoading } = useQuery<Product[]>({ queryKey: ['products'], queryFn: getProducts });
  const baseClass =
    'rounded-lg h-10 w-20 flex items-center justify-center text-xs text-white'

  const renderBadge = (category: string) => {
    switch (category) {
      case 'MEN\'S CLOTHING':
        return <div className={`${baseClass} bg-black `}>men's clothing</div>
      case 'JEWELERY':
        return <div className={`${baseClass} bg-yellow-700`}>jewelery</div>
      case 'ELECTRONICS':
        return <div className={`${baseClass} bg-green-600`}>electronics</div>
      case 'WOMEN\'S CLOTHING':
        return <div className={`${baseClass} bg-pink-700`}>women's clothing</div>
      default:
        return null
    }
  }

  const renderIcon = (iconUrl: string | null, companyName: string) => {
    const placeholderClasses =
      'w-16 h-16 flex items-center justify-center bg-[#D3D3D3] text-gray rounded'

    return iconUrl ? (
      <img
        className="w-16 h-16 object-contain object-center"
        src={iconUrl}
        alt={companyName}
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.onerror = null
          target.src = ''
        }}
      />
    ) : (
      <div className={placeholderClasses}>
        <FontAwesomeIcon icon={faImage} size="2x" />
      </div>
    )
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div className="h-[390px] overflow-y-scroll no-scrollbar text-sm">
      {data.map((product) => (
        <div
          key={product.id}
          className="flex items-start gap-4 border-b border-blue py-3 cursor-pointer px-4"
          onClick={() => onCardClick(product)}
        >
          {renderIcon(product.image, product.title)}

          <div className="flex flex-col gap-1 flex-grow">
            <p className="font-semibold">{product.title}</p>
            <div className="flex gap-5 items-center justify-start">
              <span className="text-gray">
                In existence: {product.rating.count}
              </span>

              {/* BADGES */}
              {renderBadge(product.category.toUpperCase())}
            </div>
          </div>

          {/* price */}
          <div className="flex items-center justify-center h-20 w-20 ml-auto">
            {`$${product.price}`}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Cards
