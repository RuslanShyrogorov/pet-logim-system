import { createPortal } from "react-dom";
import { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline/index.js";

const modalRoot = document.querySelector( '#modal-root' )

function Modal( { handleModalClose, children } ) {
  const handlePressEscape = ( e ) => {
    if (e.code === "Escape") {
      handleModalClose()
    }
  }

  const handleBackdropClick = ( e ) => {
    if (e.currentTarget === e.target || e.code === "Escape") {
      handleModalClose()
    }
  }

  useEffect( () => {
    window.addEventListener( 'keydown', handlePressEscape );

    return () => (window.removeEventListener( 'keydown', handlePressEscape ))
  }, [] )

  return createPortal(
    <div
      className="w-screen h-screen fixed top-0 left-0 bg-gray-800/40 backdrop-blur-md"
      onClick={handleBackdropClick}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  p-4 pt-8 rounded-md bg-white"
      >
        {children}
        <XMarkIcon
          className='h-8 w-8 cursor-pointer absolute top-2 right-2'
          onClick={() => handleModalClose()}
        />
      </div>
    </div>, modalRoot
  )
}

export default Modal;