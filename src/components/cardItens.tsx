import { Link } from "react-router-dom";

interface CardProps {
    image: string,
    imageAlt: string,
    title: string,
}

export default function CardItens(props: CardProps) {
    return (
        <div>
            <div className="card">
                <h2 className="titulo">{props.title}</h2>
                <Link to={'objects'}>
                    <img className="image" src={props.image} alt={props.imageAlt} />
                </Link>
            </div>
        </div>
    )
}