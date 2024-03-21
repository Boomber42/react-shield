interface CardProps {
    image: string,
    imageAlt: string,
    title: string,
    name: string,
    codeName: string,
    status: string,
    onClick: () => void
}

export default function CardAgents(props: CardProps){
    return (
        <div>
            <div className = "spy">
                <img className="image" src={props.image} onClick={props.onClick} alt={props.imageAlt}/>
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