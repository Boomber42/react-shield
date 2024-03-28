import { Link } from "react-router-dom";
import Skeleton from "./skeleton"
import { useState } from "react";

interface CardProps {
    image: string,
    imageAlt: string,
    title: string,
}

export default function CardItens(props: CardProps) {
    const [isLoading, setIsLoading] = useState<Boolean>(true);

	const handleImageLoad = () => {
		setIsLoading(false)
	}

    return (
        <div>
            <div className="card">
                <h2 className="titulo">{props.title}</h2>
                <Link to={'objects'} className="header">
                    <img className="image" src={props.image} alt={props.imageAlt} style={{
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
        </div>
    )
}