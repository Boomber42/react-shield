interface CardProps {
    image: string;
    imageAlt: string;
    title: string;
}

export default function CardItens(props: CardProps){
    return (
        <div>
            <div className = "card">
                <img src={props.image} alt={props.imageAlt}/>
                <h2 className="titulo">{props.title}</h2>
            </div>
        </div>
    )
}