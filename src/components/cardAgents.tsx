import { Link } from "react-router-dom"

interface CardProps {
	id: string,
	image: string,
	imageAlt: string,
	title: string,
	name: string,
	codeName: string,
	status: string,
}

export default function CardAgents(props: CardProps) {
	return (
		<div>
			<div className="spy">
				<Link to={'/subjects/'+props.id}>
					<img className="image" src={props.image} alt={props.imageAlt} />
				</Link>
			</div>
			<blockquote>
				<h3>{props.title}</h3>
				<p>Nome: {props.name}</p>
				<p>Codinome: {props.codeName}</p>
				<p>Status: {props.status}</p>
			</blockquote>
		</div>
	)
}