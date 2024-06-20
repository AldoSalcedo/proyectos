import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleLeft,
  faAngleLeft,
  faAngleRight,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';

interface PaginationControllerProps {
  currentPage: number;
  totalPages: number;
  onFirstPage: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onLastPage: () => void;
}

const PaginationController: FC<PaginationControllerProps> = ({
  currentPage,
  totalPages,
  onFirstPage,
  onPreviousPage,
  onNextPage,
  onLastPage,
}) => {
  return (
    <div className="flex items-center justify-center mt-2">
      <div className="flex items-center justify-between space-x-2">
        <button onClick={onFirstPage} disabled={currentPage <= 1}>
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </button>
        <button onClick={onPreviousPage} disabled={currentPage <= 1}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>

        <div>
          Mostrando {(currentPage - 1) * 10 + 1} - {Math.min(currentPage * 10, totalPages * 10)} de {'productos filtrados'} Productos
        </div>

        <button onClick={onNextPage} disabled={currentPage >= totalPages}>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
        <button onClick={onLastPage} disabled={currentPage >= totalPages}>
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </button>
      </div>
    </div>
  );
};

export default PaginationController;