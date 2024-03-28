import { Link } from "react-router-dom"
import Skeleton from "./skeleton"
import { useState } from "react"

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
	const [isLoading, setIsLoading] = useState<Boolean>(true);

	const handleImageLoad = () => {
		setIsLoading(false)
	}

	return (
		<div>
			<div className="spy">
				<Link to={'/subjects/' + props.id}>
					<img className="image" src={props.image} alt={props.imageAlt} onLoad={handleImageLoad} style={{
						display: isLoading ? 'none' : 'block'
					}}/>

					{isLoading ? (
						<div className="image-skeleton" >
							<Skeleton className="image" style={{
								height: '-webkit-fill-available',
								width: '100%'
							}} />
						</div>
					): null}
				</Link>
			</div>
			<blockquote>
				<h3>{props.title ?? <Skeleton />}</h3>
				<p>Nome: {props.name}</p>
				<p>Codinome: {props.codeName}</p>
				<p>Status: {props.status}</p>
			</blockquote>
		</div>
	)
}