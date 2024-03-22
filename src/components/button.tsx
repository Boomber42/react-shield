interface ButtonProps{
	name: string,
	onClick: () => void,
	loading?: boolean
}

export default function Button(props: ButtonProps) {
	return(
		<button className="buttonCustom" type="button" onClick={props.onClick} disabled={props.loading}>
			{props.name}
		</button> 
	)
}