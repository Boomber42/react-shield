import { useEffect, useState } from 'react';
import Api, { Subject } from '../helpers/api';
import Loading from '../components/loading';
import { useParams } from 'react-router-dom'
import Button from '../components/button';

export default function SubjectsRouter() {
	const params: any = useParams();

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

	return (
		<div className='counteiner'>
			<div style={{
				padding: "25px 50px 0 50px"
			}}>
				<div className='infoSpy'>
					<img className="image" src={subject?.image} alt={subject?.image} />
				</div>
				<div className='infoSubject'>
					<p className='info'> Titulo do {subject?.type}: {subject?.title} </p>
					<p className='info'> Codinome do {subject?.type}: {subject?.codeName} </p>
					<p className='info'> Nome completo do {subject?.type}: {subject?.name} </p>
					<p className='info'> Status operacional do {subject?.type}: {subject?.status} </p>
				</div>

				<div className='infoSubjectText' style={{ marginTop: '50px' }}>
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