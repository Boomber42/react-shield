interface ButtonProps{
    name: string,
    onClick: () => void
}

export default function Button(props: ButtonProps) {
    return(
        <button type="button" onClick={props.onClick}>
            {props.name}
        </button> 
    )
}