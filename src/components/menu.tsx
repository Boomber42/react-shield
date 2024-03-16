interface MenuProps{
    request: Function
}

interface Options{
    optionName: string;
    optionRequest: string
}

const options: Options[] = [{
    optionName: 'Agentes',
    optionRequest: 'Agente'
},
{
    optionName: 'Vingadores',
    optionRequest: 'Vingador'
},
{
    optionName: 'Veiculos',
    optionRequest: 'Veiculo'
},
{
    optionName: 'Objetos',
    optionRequest: 'Objeto'
},
]

export default function Menu(props: MenuProps){
    return(
        <div className="menu">
            <ul className="ul">
                {options.map((element: Options) => {
                    return (
                        <li>
                            <h2 className = "element-menu" onClick={() => props.request(element.optionRequest)}> {element.optionName} </h2>
                        </li>
                    )
                })}            
            </ul>
         </div>
    )
}