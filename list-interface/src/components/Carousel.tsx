import { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

const Carousel: FC = ({ images }) => {
  const [loginQR, setLoginQR] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const placeholderClasses = "w-16 h-16 flex items-center justify-center bg-[#D3D3D3] text-gray rounded";

  useEffect(() => {
    
  }, []);

  return (
    <>
      {/* Carousel */}
      <div className='w-3/5'>
        <h3 className='text-xs mb-2'>Cotiza otros productos disponibles para tí</h3>
        <div className='overflow-auto scrollbar'>
          <div className='flex w-max gap-4'>
            {/* {
              images.map((image, index) => (
                <Card
                  banner='Nuevo'
                  color='red'
                  key={index} image={index}
                  title='Seguro de auto'
                  logo='https://via.placeholder.com/50'
                  cardImg={image}
                  company='GNP'
                  url='https://www.gnp.com.mx/seguros/auto'
                />
              ))
            } */}
          </div>
        </div>
      </div>

      {/* QR sign in instructions */}
      <div className='w-full'>
        <h3 className='text-xs mb-2'>Instrucciones de uso</h3>
        <div className='flex items-center justify-center w-full'>
          <div className='w-3/5 flex items-center justify-center'>
            {loginQR && !error ? (
              <img 
                className='w-36 object-cover' 
                src={loginQR} 
                alt='qr'
                onError={() => setError(true)}
              />
            ) : (
              <div className='flex flex-col items-center'>
                <div className={placeholderClasses}>
                  <FontAwesomeIcon icon={faImage} size="2x" />
                </div>
                <span className='text-xs text-red mt-1'>Error loading QR code</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

type CardProps = {
  image: number,
  title: string,
  logo: string,
  cardImg: string,
  company: string,
  banner: string
  url: string
  color: string
}
const Card: FC<CardProps> = ({ image, title, logo, cardImg, company, banner, url, color }) => {
  /**
   * Abre una nueva ventana con la url del producto
   */
  const handleClick = (url: string) => {
    window.open(url, '_blank')
  }
  return (
    <div className={`cursor-pointer w-56 h-32 bg-[length:110%_110%] bg-no-repeat bg-center rounded-xl flex flex-col p-4 justify-end relative text-white
          before:absolute before:inset-0 before:bg-black before:bg-opacity-50 before:rounded-xl before:-z-0
      `}
      style={{
        backgroundImage: `url(${cardImg}`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
      onClick={() => handleClick(url)}>
      <h3 className='z-10'>{title}</h3>
      <span className={`absolute bottom-4 right-0 rounded-l-lg px-2 py-1 text-sm`}
        style={{ backgroundColor: color }}>
        {banner}
      </span>
    </div>
  )
}
export default Carousel;