import { useEffect, useState } from 'react';
import CardSubjects from '../components/card-subjects/card-subjects';
import CardObjects from '../components/card-objects/card-objects';
import Loading from '../components/loading/loading';
import Api, { Subject } from '../helpers/api';
import Button from '../components/button/button';
import CustomModal from '../components/customModal/customModal';
import { useSearchParams } from 'react-router-dom';

function HomeRouter() {
	const userIsLoggedIn: boolean = !!localStorage.getItem('user');

	const [searchParams] = useSearchParams();
	let [itens, setItens] = useState<Subject[]>([]);
	let [loading, setLoading] = useState(false);
	let [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	let [currentType, setCurrentType] = useState<string>('Agente');

	async function request() {
		const type = searchParams.get('type') ?? 'Agente';
		setCurrentType(type);
		setLoading(true); //Inicia a tela de carregamento no front enquanto filtra os dados.
		setItens([]) //Limpando o valor da variavel itens.
		const api = new Api();
		var filteredItens: Subject[] = await api.getSubjectsByType(type);
		setItens(filteredItens); //Preenchendo a lista itens com os itens filtrados.
		setLoading(false); //Finaliza a tela de carregamento após trazer os dados.
	}

	useEffect(() => {
		request();
	}, [searchParams])

	function closeModal(reload?: boolean) {
		if (reload === true) {
			request();
		}

		setIsModalOpen(false);
	}

	function openModal() {
		setIsModalOpen(true);
	}

	return (
		<div>
			<div className='counteiner'>
				{userIsLoggedIn ? (
					<div className='buttonStyle'>
						<Button name='Adicionar novo' onClick={openModal} />
					</div>
				) : null}
				<CustomModal isModalOpen={isModalOpen} closeModal={closeModal} typeModal={currentType} />
				{itens?.map((item: Subject, index: number) => {
					var card;
					if (item.type === 'Agente' || item.type === 'Vingador') {
						card = <CardSubjects
							id={item.id}
							title={item.title}
							imageAlt={item.alt}
							codeName={item.codeName || ''}
							image={item.image}
							name={item.name || ''}
							status={item.status || ''}
							key={index}
						/>
					}

					if (item.type === 'Objeto' || item.type === 'Veiculo') {
						card = <CardObjects
							title={item.title}
							imageAlt={item.alt}
							image={item.image}
							key={index}
						/>
					}

					return (
						card
					)
				})}
				{loading ? (
					<div className='loader'>
						<Loading />
					</div>
				) : ''}
			</div>
		</div>
	);
}

export default HomeRouter;