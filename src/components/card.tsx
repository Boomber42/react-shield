interface CardProps {
    image: string;
    alt: string;
    title: string;
    name: string;
    codeName: string;
    status: string;
}

export default function Card(props: CardProps){
    return (
        <div>
            <div className = "spy">
                <img src={props.image} alt={props.alt}/>
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