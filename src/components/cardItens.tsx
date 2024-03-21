interface CardProps {
    image: string,
    imageAlt: string,
    title: string,
    onClick: () => void
}

export default function CardItens(props: CardProps){
    return (
        <div>
            <div className = "card">
                <img className="image" src={props.image} onClick={props.onClick} alt={props.imageAlt}/>
                <h2 className="titulo">{props.title}</h2>
            </div>
        </div>
    )
}