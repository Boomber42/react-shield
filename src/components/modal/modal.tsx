import { ReactNode, useEffect } from 'react';
import ReactModal from 'react-modal';

const customStyles = {
  content: {
    width: '800px',
    height: '500px',
    zIndex: '1000',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#ede3e3',
    borderRadius: '25px'
  },
};

interface ModalProps {
  isModalOpen: boolean,
  children?: ReactNode,
  width: string,
  height: string,
}

export default function Modal({ children, isModalOpen, width, height }: ModalProps) {

  useEffect(() => {
    if(width){
      customStyles.content['width'] = width;
    }

    if(height){
      customStyles.content['height'] = height
    }
  }, [width, height])

  return (
    <ReactModal
      isOpen={isModalOpen}
      style={customStyles}
      shouldCloseOnOverlayClick={false}
      contentLabel="Modal"
      ariaHideApp={false}
    >
      {children}
    </ReactModal>
  );
}