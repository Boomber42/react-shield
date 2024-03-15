interface ButtonProps{
    name: string,
    onClick: () => void,
}

export default function Button(props: ButtonProps) {
    return(
        <button className="buttonCustom" type="button" onClick={props.onClick}>
            {props.name}
        </button> 
    )
}