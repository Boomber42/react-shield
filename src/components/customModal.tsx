import React, { useState } from 'react';
import Modal from 'react-modal';
import Button from './button';
import Api, { Subject } from '../helpers/api';

const customStyles = {
  content: {
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

interface CustomModalProps{
    isModalOpen: boolean,
    closeModal: (reload?: boolean) => void,
    typeModal: string
}

export default function CustomModal(props: CustomModalProps) {
  let [title, setTitle] = useState<string>('');
  let [name, setName] = useState<string>('');
  let [codeName, setCodeName] = useState<string>('');
  let [status, setStatus] = useState<string>('');
  let [image, setImage] = useState<string>('');

  let subtitle: any;

  function afterOpenModal() {
    subtitle.style.color = 'rgb(72, 28, 72)';
  }

  async function submitForm() {
    var form: Subject = {
      title,
      name,
      codeName,
      status,
      image,
      alt: `Imagem do ${name}`,
      type: props.typeModal
    }
    const api = new Api();
    await api.postSubject(form);
    props.closeModal(true);
  }

  return (
    <div>
      <Modal
        isOpen={props.isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={() => props.closeModal()}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Adicionar</h2>
        <div>Preencha o formulário com as informações</div>
        <form>
          <div className='form'>
            {['Agente', 'Vingador'].includes(props.typeModal) ? (
              <>
                <label htmlFor="titulo"> Titulo </label>
                <input type='text' placeholder='Titulo' id='titulo' onChange={(event) => setTitle(event.target.value)}/>
              </>
            ): null }

            <label htmlFor="nome"> Nome </label>
            <input type='text' placeholder='Nome' id='nome' onChange={(event) => setName(event.target.value)}/>

            {['Agente', 'Vingador'].includes(props.typeModal) ? (<>
              <label htmlFor="code-nome"> Code nome </label>
              <input type='text' placeholder='Code nome' id='code-nome' onChange={(event) => setCodeName(event.target.value)}/>
            </>): null }

            {['Agente', 'Vingador'].includes(props.typeModal) ? (<>            
              <label htmlFor="status"> Status </label>
              <input type='text' placeholder='Status' id='status' onChange={(event) => setStatus(event.target.value)}/>
            </>): null }

            <label htmlFor="imagem"> Imagem </label>
            <input type='text' placeholder='Imagem' id='imagem' onChange={(event) => setImage(event.target.value)}/>
          </div>
          <div className='buttonStyle'>
            <Button name='Salvar' onClick={submitForm} />
            <Button name='Fechar' onClick={props.closeModal}/>
          </div>
        </form>
      </Modal>
    </div>
  );
}