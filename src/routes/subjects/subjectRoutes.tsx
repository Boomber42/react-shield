import './index.css'
import { useEffect, useState } from 'react';
import Api, { Subject } from '../../helpers/api';
import Loading from '../../components/loading';
import { useParams } from 'react-router-dom'
import Button from '../../components/button';
import Skeleton from '../../components/skeleton';

function RenderText({ info, type, value, skeletonWidth }: { info: string, type: string | undefined, value: string | undefined, skeletonWidth: string }) {
	return (
		<p className='info'>
			{type ? `${info} ${type}: ${value}` : <Skeleton style={{ width: skeletonWidth }} />}
		</p>
	)
}

export default function SubjectsRouter() {
	const params: any = useParams();
	const [isLoading, setIsLoading] = useState<Boolean>(true);

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

	return (
		<div className='counteiner'>
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
					<div className='buttonDescripition' >
						<Button name='Descrição' onClick={() => { }} loading={loading} />
					</div>
					<p style={{ padding: '5px' }}>{subject?.descripition}</p>
				</div>

				{loading ? (
					<div className='loader'>
						<Loading />
					</div>
				) : ''}

			</div>
		</div>
	)
}