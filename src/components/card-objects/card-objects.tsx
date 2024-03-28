import "./index.css"
import { Link } from "react-router-dom";
import Skeleton from "../skeleton"
import { useState } from "react";

interface CardProps {
    image: string,
    imageAlt: string,
    title: string,
}

export default function CardObjects(props: CardProps) {
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    const handleImageLoad = () => {
        setIsLoading(false)
    }

    return (
        <div className="card">
            <div className="card-conteiner">
                <h2 className="title">{props.title}</h2>
                <div className="image-conteiner">
                    <Link to={'objects'} className="header">
                        <img className="image" src={props.image} alt={props.imageAlt} onLoad={handleImageLoad} style={{
                            display: isLoading ? 'none' : 'block'
                        }} />

                        {isLoading ? (
                            <Skeleton className="image" />
                        ) : null}
                    </Link>
                </div>
            </div>
        </div>
    )
}