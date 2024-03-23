import { useEffect, useState } from 'react';
import Api, { Subject } from '../helpers/api';
import Loading from '../components/loading';
import { useParams } from 'react-router-dom'

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
	})

	return (
		<div>
			<div className='counteiner'>
				<div>
					{subject?.codeName}
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