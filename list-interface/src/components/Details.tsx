import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Table from './Table';

const claimsColumns = [
  { key: 'idClaim', header: 'No. Siniestro' },
  { key: 'incidentDate', header: 'Fecha Siniestro' },
  { key: 'affected', header: 'Cliente' },
  { key: 'company', header: 'Aseguradora' },
  { key: 'status', header: 'Estatus' },
  { key: 'folio', header: 'Folio' },
  { key: 'owner', header: 'Empresa' },
  { key: 'daySinceIncident', header: 'Días transcurridos' },
];

/* Descarga un Archivo en Tabla de Centro Digital */
const handleFileDownload = async (rowData) => {
/* Descarga de archivos*/
};

const firstTableColumns = [
  { key: 'fileName', header: 'Nombre', onClick: handleFileDownload },
  { key: 'lastModified', header: 'Fecha de Modificación' },
  { key: 'sizeFile', header: 'Tamaño' },
  { key: 'fileIcon', header: 'Tipo' }
];

const secondTableColumns = [
  { key: 'idReceipt', header: 'No. Recibo' },
  { key: 'expeditionCost', header: 'Coste de expedición' },
  { key: 'iva', header: 'IVA' },
  { key: 'serie', header: 'Serie' },
  { key: 'netPremium', header: 'Prima Neta' },
  { key: 'totalPremium', header: 'Total' },
  { key: 'pending', header: 'Pendiente' },
  { key: 'status', header: 'Estatus' },
];

/**
 * Este componente muestra los detalles de una póliza seleccionada, incluyendo información general,
 * listas de siniestros, centro digital, recibos y bitácora.
 * También proporciona la funcionalidad para descargar certificados y comenzar reclamaciones.
*/
const Details: FC = ({ selectedProduct, openModal }) => {
  /* ESTADOS */
 
  /* Estados de Error para cada Tabla */

  /* FILTROS */

  /* DESCARGAS */

  /* Custom Style */
  const placeholderClasses = "w-16 h-16 flex items-center justify-center bg-[#D3D3D3] text-gray rounded";

  /* Funciones para renderizar las tablas de siniestros, centro digital y recibos, y la línea de tiempo de la bitácora */
  const renderFilteredTable = () => {
    return
  };

  const renderFirstTable = () => {
    return <Table />
  };

  const renderSecondTable = () => {

  };

  const renderTirdTable = () => {

  };

  /* Manejadores de eventos */

  /* DESCARGA DETALLES DE POLIZA */
  const handleDownload = () => {
   return
  };

  const handleModal = () => {
    openModal();
  };

  const handleErrors = (error: CustomError, setter: React.Dispatch<React.SetStateAction<string | null>>) => {
    if (error) {
      setter(error.message);
    } else {
      setter(null);
    }
  };

  return (
    <>
      {selectedProduct ? (
        <div className='flex flex-col gap-4 relative'>
          <div className='flex items-center'>
            <div className='flex flex-col items-center'>
              {blobQrUrl ? (
                <>
                  <img className='w-32' src={"blobQrUrl"} alt="QR Code" />
                  <span className='text-xs font-semibold'>Descarga con QR</span>
                </>

              ) : (
                <>
                  <div className={placeholderClasses}>
                    <FontAwesomeIcon icon={faImage} size="2x" />
                  </div>
                  <span className='text-xs text-red mt-1'>Error loading...</span>
                </>
              )}

            </div>

            <div className='flex flex-col gap-1 md:w-2/3 md:text-sm ml-2'>
              <span className='flex text-gray gap-2' data-tooltip="Número de la póliza">
                Póliza: <p className='text-black truncate'>{selectedProduct?.workOrderExternalNumber}</p>
              </span>
              <span className='flex text-gray gap-2' data-tooltip="Total de reclamos realizados">
                Total Reclamos: <p className='text-black truncate'> {selectedProduct?.totalClaims}</p>
              </span>
              <span className='flex text-gray gap-2' data-tooltip="Ramo de la póliza">
                Ramo: <p className='text-black truncate'>{selectedProduct?.subLineBusiness}</p>
              </span>
              <span className='flex text-gray gap-2' data-tooltip={`Asegurado: ${selectedProduct?.insurerName}`}>
                Asegurado: <p className='text-black truncate'>{selectedProduct?.insurerName}</p>
              </span>
            </div>
          </div>

          <div className='flex items-center justify-start'>
            {downloadMessage ? (
              <button className="bold bg-secondary text-white font-bold py-2 px-4 rounded mr-4" onClick={handleDownload}>
                {downloadMessage.message}
              </button>
            ) : (
              <button className="bold bg-[#470A68] hover:bg-secondary text-white font-bold py-2 px-4 rounded mr-4" onClick={handleDownload}>
                Descargar Certificado
              </button>
            )}

            <button className="bold bg-[#470A68] hover:bg-secondary text-white font-bold py-2 px-4 rounded" onClick={handleModal}>
              Iniciar Reclamación
            </button>
          </div>

          {/* <Tab>
            <Tab.List>
              <Tab.Item>Siniestros</Tab.Item>
              <Tab.Item>Centro Digital</Tab.Item>
              <Tab.Item>Recibos</Tab.Item>
              <Tab.Item>Bitácora</Tab.Item>
            </Tab.List>
            {claimsColumns && (
              <div className="flex space-x-2">
                 //Input de búsqueda
                <input
                  type="text"
                  placeholder="Buscar por ID de siniestro o afectado"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow border border-gray-300 rounded-md px-3 py-1"
                />
                // Filtro de estatus
                <select
                  value={filterStatus ?? ''}
                  onChange={(e) => setFilterStatus(e.target.value || null)}
                  className="flex-grow border border-gray-300 rounded-md px-3 py-1"
                >
                  <option value="">Todos</option>
                  // Obtener todos los valores de estatus únicos
                  {claims.reduce((statuses: string[], claim) => {
                    if (!statuses.includes(claim.status)) {
                      statuses.push(claim.status);
                    }
                    return statuses;
                  }, []).map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            )}
            <Tab.Panels>
              <Tab.Panel>
                {renderFilteredClaimsTable()}
              </Tab.Panel>
              <Tab.Panel>
                {renderDigitalCenterTable()}
              </Tab.Panel>
              <Tab.Panel>
                {renderReceiptsTable()}
              </Tab.Panel>
              <Tab.Panel>
                {renderLogBookTimeline()}
              </Tab.Panel>
            </Tab.Panels>
          </Tab> */}

        </div>
      ) : (
        <>
          <div className='flex'>
            <header className="mb-4">
              <h1 className="text-md text-gray">¡Bienvenido a tu portal de seguros!</h1>
              <h2 className="text-xl font-bold">Elsa Janeth Chapa Quintanilla</h2>
            </header>
            <img src="ruta_al_logo" alt="Logo" className="w-24 h-auto mx-auto mt-4" />
          </div>

          <div className="w-full">
            <h3 className="text-lg font-bold mb-4">Ayuda</h3>
            <div className="bg-gray p-2 rounded-lg">
              <p>¿Qué hacer en caso de siniestro?</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Details;