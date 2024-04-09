import './index.css'
import { useEffect, useState } from 'react';
import Api, { Subject } from '../../helpers/api';
import Loading from '../../components/loading/loading';
import { useParams } from 'react-router-dom'
import Button from '../../components/button/button';
import Skeleton from '../../components/skeleton';
import Modal from '../../components/modal/modal';
import Logout from '../../components/logout/logout';

function RenderText({ info, type, value, skeletonWidth }: { info: string, type: string | undefined, value: string | undefined, skeletonWidth: string }) {
	return (
		<p className='info'>
			{type ? `${info} ${type}: ${value}` : <Skeleton style={{ width: skeletonWidth }} />}
		</p>
	)
}

export default function SubjectsRouter() {
	const userIsLoggedIn: boolean = !!localStorage.getItem('user');
	const params: any = useParams();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [descripition, setDescripition] = useState<string>();
	const [isModalOpen, setModelOpen] = useState<boolean>(false);

	let [subject, setSubject] = useState<Subject>();
	let [loading, setLoading] = useState(false);

	async function request() {
		setLoading(true);
		const api = new Api();
		var subjectFound: Subject = await api.getSubjectById(params.id);
		setSubject(subjectFound);
		setLoading(false);
	}

	useEffect(() => {
		request();
	}, [])

	const handleImageLoad = () => {
		setIsLoading(false)
	}

	function HandleDescriptionChange(e: any) {
		setDescripition(e.target.value)
	}

	async function submitDescripition() {
		setLoading(true);
		const api = new Api();
		var updateField = await api.patchSubject(params.id, {
			descripition
		});

		if (updateField) {
			setSubject(updateField);
		}

		setLoading(false);
		setModelOpen(false);
	}

	function openDescriptionModel() {
		setDescripition(subject?.descripition);
		setModelOpen(true)
	}

	return (
		<div className='counteiner'>
			{userIsLoggedIn ? (
				<div className='buttonStyle'>
					<Logout/>
				</div>
			) : null}
			
			<div style={{
				padding: "25px 50px 0 50px"
			}}>
				<div className='infoSpy'>
					<img className="image-info" src={subject?.image} alt={subject?.image} onLoad={handleImageLoad} style={{
						display: isLoading ? 'none' : 'block'
					}} />

					{isLoading ? (
						<div className="image-skeleton" >
							<Skeleton className="image-info" style={{
								height: '320px',
							}} />
						</div>
					) : null}
				</div>

				<div className='infoSubject'>
					<RenderText info='Titulo do' type={subject?.type} value={subject?.title} skeletonWidth='200px' />
					<RenderText info='Codinome do' type={subject?.type} value={subject?.codeName} skeletonWidth='400px' />
					<RenderText info='Nome completo do' type={subject?.type} value={subject?.name} skeletonWidth='250px' />
					<RenderText info='Status operacional do' type={subject?.type} value={subject?.status} skeletonWidth='100px' />
				</div>

				<div className='infoSubjectText' style={{ margin: '50px 0px 50px 0px' }}>
					{userIsLoggedIn && (<div className='buttonDescripition' >
						<Button name='Descrição' onClick={openDescriptionModel} loading={loading} />
					</div>)}

					<p style={{ padding: '5px' }}>{subject?.descripition}</p>
				</div>

				<Modal isModalOpen={isModalOpen} height='550px' width='800px'>
					<h3> Adicionar descrição </h3>
					<textarea className='textAreaModal' value={descripition} onChange={HandleDescriptionChange}>
					</textarea>
					<div className='buttonDescripition' >
						<Button name='Salvar' onClick={() => submitDescripition()} />
						<Button name='Fechar' onClick={() => setModelOpen(false)} />
					</div>
				</Modal>

				{loading ? (
					<div className='loader'>
						<Loading />
					</div>
				) : ''}

			</div>
		</div>
	)
}