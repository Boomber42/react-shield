import "./index.css"
import { ChangeEvent, useState } from 'react';
import Modal from 'react-modal';
import Button from '../button/button';
import Api, { Subject } from '../../helpers/api';
import Loading from '../loading/loading';
import ImageCropper from '../imageCropper';
import { toast, Bounce } from "react-toastify";
import Toast from "../toast/toast";
import { z } from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

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
  let [image, setImage] = useState<string>('');
  let [loading, setLoading] = useState(false);
  let [cropOpen, setCropOpen] = useState(false);

  const createSubjectFormSchema = z.object({
    title: z.string().min(1, { message: 'Este campo é obrigatório' }).default(''),
    name: z.lazy(() => {
      return ['Agente', 'Vingador'].includes(props.typeModal) ? z.string().min(1, { message: 'Este campo é obrigatório' }).default('') : z.undefined();
    }),
    codeName: z.lazy(() => {
      return ['Agente', 'Vingador'].includes(props.typeModal) ? z.string().min(1, { message: 'Este campo é obrigatório' }).default('') : z.undefined();
    }),
    status: z.lazy(() => {
      return ['Agente', 'Vingador'].includes(props.typeModal) ? z.string().min(1, { message: 'Este campo é obrigatório' }).default('') : z.undefined();
    })
  });

  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<z.infer<typeof createSubjectFormSchema>>({
    mode: "all",
    resolver: zodResolver(createSubjectFormSchema),
  });

  let subtitle: any;

  function afterOpenModal() {
    subtitle.style.color = 'rgb(72, 28, 72)';
  }

  async function submitForm(data: any) {
    const response = createSubjectFormSchema.safeParse(data);

    if (!response.success || !image) {
      return
    }

    try {
      setLoading(true);

      var form: any = {
        ...data,
        ...{
          image,
          alt: `Imagem do ${data.name}`,
          type: props.typeModal
        }
      }

      reset();
      setImage('');

      const api = new Api();
      await api.postSubject(form as Subject);
      setLoading(false);
      toast.success('Cadastrado com sucesso!', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      props.closeModal(true);
    } catch(error) {
      setLoading(false);
      toast.error('Erro no cadasto!', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      props.closeModal(true);
    }
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

  const closeModal = (): void => {
    reset();
    setImage('');
    props.closeModal();
  }

  return (
    <div>
      <Toast/>
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
                <label htmlFor="title"> Titulo </label>
                <input type='text' placeholder='Titulo' id='titulo' {...register("title", { required: true })} />
                {errors.title && <span>{errors.title.message}</span>}

                {['Agente', 'Vingador'].includes(props.typeModal) ? (
                  <>
                    <label htmlFor="name"> Nome </label>
                    <input type='text' placeholder='Nome' id='nome' {...register("name", { required: true })} />
                    {errors.name && <span>{errors.name.message}</span>}
                  </>
                ) : null}

                {['Agente', 'Vingador'].includes(props.typeModal) ? (<>
                  <label htmlFor="codeName"> Codenome </label>
                  <input type='text' placeholder='Codinome' id='codinome' {...register("codeName", { required: true })} />
                  {errors.codeName && <span>{errors.codeName.message}</span>}
                </>) : null}

                {['Agente', 'Vingador'].includes(props.typeModal) ? (<>
                  <label htmlFor="status"> Status </label>
                  <input  type='text' placeholder='Status' id='status' {...register("status", { required: true })} />
                  {errors.status && <span>{errors.status.message}</span>}
                </>) : null}

                {['Veiculo', 'Objeto'].includes(props.typeModal) ? (<>
                  <label> Adicione a imagem </label>
                  <input type='file' name='imagem' accept='image/*' onChange={onSelectFile} />
                  {!isValid || !image ? <span>Este campo é obrigatório</span> : null}
                </>) : null}
              </div>
            </>
          )}

          {['Agente', 'Vingador'].includes(props.typeModal) ? (<div style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            <ImageCropper setCropStatus={setCropStatus} closeImageModal={closeImageModal} />
            {!isValid || !image ? <span>Este campo é obrigatório</span> : null}
          </div>) : null}

          {!cropOpen && (
            <div className='buttonStyle'>
              <Button name='Salvar' onClick={handleSubmit(submitForm)} loading={loading} />
              <Button name='Fechar' onClick={closeModal} loading={loading} />
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