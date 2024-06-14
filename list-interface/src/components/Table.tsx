import {FC} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

const Table: FC = ({ columns, data }) => {
  return (
    <div className='h-[300px] overflow-x-scroll'>
      <table className="min-w-full divide-y divide-gray text-xs">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" className="px-5 text-left font-medium text-gray uppercase tracking-wider">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray">
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => {
                let cellContent;
                if (column.key === 'fileName') {
                  cellContent = (
                    <button
                      className="hover:text-blue"
                      onClick={() => column.onClick?.(row)}
                    >
                      {row[column.key]}
                    </button>
                  );
                } else if (column.key === 'icon' || column.key === 'fileIcon') {
                  const icon = row[column.key] as IconDefinition;
                  cellContent = <FontAwesomeIcon icon={icon} />;
                } else {
                  cellContent = row[column.key];
                }
                return <td key={column.key} className="px-5 py-3 whitespace-nowrap">{cellContent}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;