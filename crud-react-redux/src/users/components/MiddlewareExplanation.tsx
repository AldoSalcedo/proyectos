import { Card } from '@tremor/react'
import middlewareImage from '../../assets/middlewaresexplanation.png'

const MiddlewareExplanation = () => {
  return (
    <Card className="mt-4">
      <span className='h-32 w-32'>
        <img src={middlewareImage} alt="middleware" />
      </span>
    </Card>
  )
}

export default MiddlewareExplanation
