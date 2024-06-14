import { FC, useEffect, useRef, useState } from "react";
import { KSFormModalProps, FormData } from "../../kernoSuper/types/KSTypes";

export const Modal: FC<KSFormModalProps> = ({ title, onClose, onSubmit }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
  if (files && files.length > 0) {
    setFormData(prevState => ({
      ...prevState,
      file: files[0]
    }));
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray bg-opacity-50">
      <div ref={modalRef} className="modal-container rounded-lg bg-white shadow-lg p-6 h-auto w-96">
        <div className="modal-header flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button className="text-black hover:text-gray" onClick={onClose}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <form className="modal-body" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="incidentDate" className="block text-sm font-medium text-gray">
              Fecha*
            </label>
            <input
              type="date"
              id="incidentDate"
              name="incidentDate"
              value={formData.incidentDate}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray shadow-sm focus:border-indigo focus:ring-indigo sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="situation" className="block text-sm font-medium text-gray">
              Comentarios*
            </label>
            <textarea
              id="situation"
              name="situation"
              value={formData.situation}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray shadow-sm focus:border-indigo focus:ring-indigo sm:text-sm"
              required
            />
            {/* {formErrors.situation && <span className="text-red text-sm">Comentarios es obligatorio</span>} */}
          </div>
          <div className="mb-4">
            <label htmlFor="file" className="block text-sm font-medium text-gray">
              Archivo
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              className="mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="emailContact" className="block text-sm font-medium text-gray">
              Correo*
            </label>
            <input
              type="email"
              id="emailContact"
              name="emailContact"
              value={formData.emailContact}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray shadow-sm focus:border-indigo focus:ring-indigo sm:text-sm"
              required
            />
            {/* {formErrors.emailContact && <span className="text-red text-sm">Correo es obligatorio y debe ser válido</span>} */}
          </div>
          <div className="mb-4">
            <label htmlFor="phoneContact" className="block text-sm font-medium text-gray">
              Teléfono*
            </label>
            <input
              type="tel"
              id="phoneContact"
              name="phoneContact"
              value={formData.phoneContact}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray shadow-sm focus:border-indigo focus:ring-indigo sm:text-sm"
              required
            />
            {/* {formErrors.phoneContact && <span className="text-red text-sm">Teléfono es obligatorio</span>} */}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#470A68] hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};