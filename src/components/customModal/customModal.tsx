import "./index.css"
import { ChangeEvent, useState } from 'react';
import Modal from 'react-modal';
import Button from '../button/button';
import Api, { Subject } from '../../helpers/api';
import Loading from '../loading/loading';
import ImageCropper from '../imageCropper';

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

interface CustomModalProps {
  isModalOpen: boolean,
  closeModal: (reload?: boolean) => void,
  typeModal: string,
}

export default function CustomModal(props: CustomModalProps) {
  let [title, setTitle] = useState<string>('');
  let [name, setName] = useState<string>('');
  let [codeName, setCodeName] = useState<string>('');
  let [status, setStatus] = useState<string>('');
  let [image, setImage] = useState<string>('');
  let [loading, setLoading] = useState(false);
  let [cropOpen, setCropOpen] = useState(false);

  let subtitle: any;

  function afterOpenModal() {
    subtitle.style.color = 'rgb(72, 28, 72)';
  }

  async function submitForm() {
    setLoading(true);

    var form: any = {
      title,
      name,
      codeName,
      status,
      image,
      alt: `Imagem do ${name}`,
      type: props.typeModal
    };

    const api = new Api();
    await api.postSubject(form as Subject);
    setLoading(false);
    props.closeModal(true);
  }

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    var target = e.target as any;
    const file = target.files?.[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = () => {
        var base64String = reader.result as string;
        setImage(base64String);
      }

      reader.readAsDataURL(file);
    }
  }

  const setCropStatus = (isOpen: boolean) => {
    setCropOpen(isOpen);
  }

  const closeImageModal = (imageUrl: string) => {
    setImage(imageUrl);
    setCropOpen(false);
  }

  return (
    <div>
      <Modal
        ariaHideApp={false}
        isOpen={props.isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={() => props.closeModal()}
        style={customStyles}
        contentLabel="Adicionar informações"
        shouldCloseOnOverlayClick={false}
      >
        <form>
          {!cropOpen && (
            <>
              <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Adicionar</h2>
              <div>Preencha o formulário com as informações</div>

              <div className='form'>
                <label htmlFor="titulo"> Titulo </label>
                <input type='text' placeholder='Titulo' id='titulo' onChange={(event) => setTitle(event.target.value)} />

                {['Agente', 'Vingador'].includes(props.typeModal) ? (
                  <>
                    <label htmlFor="nome"> Nome </label>
                    <input type='text' placeholder='Nome' id='nome' onChange={(event) => setName(event.target.value)} />
                  </>
                ) : null}

                {['Agente', 'Vingador'].includes(props.typeModal) ? (<>
                  <label htmlFor="codinome"> Codinome </label>
                  <input type='text' placeholder='Codinome' id='codinome' onChange={(event) => setCodeName(event.target.value)} />
                </>) : null}

                {['Agente', 'Vingador'].includes(props.typeModal) ? (<>
                  <label htmlFor="status"> Status </label>
                  <input type='text' placeholder='Status' id='status' onChange={(event) => setStatus(event.target.value)} />
                </>) : null}

                {['Veiculo', 'Objeto'].includes(props.typeModal) ? (<>
                  <label> Adicione a imagem </label>
                  <input type='file' name='imagem' accept='image/*' onChange={onSelectFile} />
                </>) : null}
              </div>
            </>
          )}

          {['Agente', 'Vingador'].includes(props.typeModal) ? (<>
            <ImageCropper setCropStatus={setCropStatus} closeImageModal={closeImageModal} />
          </>) : null}

          {!cropOpen && (
            <div className='buttonStyle'>
              <Button name='Salvar' onClick={submitForm} loading={loading} />
              <Button name='Fechar' onClick={props.closeModal} loading={loading} />
            </div>
          )}

          {loading ? (
            <div className='loader-default'>
              <Loading />
            </div>
          ) : ''}
        </form>
      </Modal>

    </div>
  );
}