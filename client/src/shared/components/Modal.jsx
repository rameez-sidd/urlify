import { useEffect } from 'react';
import { IoCloseSharp } from "react-icons/io5";

export const Modal = ({ isOpen, setIsOpen, title, children }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(!isOpen);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setIsOpen, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Clickable overlay to close the modal */}
      <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

      <div className="relative w-full max-w-xl p-6 mx-4 bg-white rounded-2xl shadow-xl">
        <div className="flex items-center justify-between pb-4">
          <h2 id="modal-title" className="text-xl font-extrabold">
            {title}
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 cursor-pointer text-slate-400 rounded-full hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close modal"
          >
            <span><IoCloseSharp/></span>
          </button>
        </div>
        <div className="mt-2">
          {children}
        </div>
      </div>
    </div>
  );
};