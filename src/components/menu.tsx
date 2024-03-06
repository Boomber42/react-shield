const options = [{
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

export default function Menu(props: any){
    return(
        <div className="menu">
            <ul>
                {options.map((iten) => {
                    return (
                        <li>
                            <h2 className = "iten-menu" onClick={() => props.request(iten.optionRequest)}> {iten.optionName} </h2>
                        </li>
                    )
                })}            
            </ul>
         </div>
    )
}