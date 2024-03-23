import { Link } from "react-router-dom";

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

export default function Menu(){
    return(
        <div className="menu">
            <ul className="ul">
                {options.map((element: Options, index: number) => {
                    return (
                        <li key={index}>
                            <Link to={`/?type=${element.optionRequest}`} style={{
                                textDecoration: 'none'
                            }}>
                                <h2 className = "element-menu"> {element.optionName} </h2>
                            </Link>
                        </li>
                    )
                })}            
            </ul>
         </div>
    )
}