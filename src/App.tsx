import React from 'react';
import './App.css';
import Card from './components/card';

const agents: any[] = [{
  title: 'Agente Coulson',
  alt: 'imagem do Coulson',
  codeName: 'Phill.',
  image: '/assets/images/coulson.jpg',
  name: 'Phillip J. Coulson.',
  status: 'Morto.'
},
{
  title: 'Agente May',
  alt: 'imagem da Melinda',
  codeName: 'Cavalaria.',
  image: '/assets/images/melinda.jpg',
  name: 'Melinda May.',
  status: 'Viva.'
},
] 

function App() {
  return (
    <main>
      <div className='counteiner'>
        {agents.map((agent: any)=>{
          return(
            <Card 
              title={agent.title}
              alt={agent.alt}
              codeName={agent.codeName}
              image={agent.image}
              name={agent.name}
              status={agent.status}
            />
          )
        })}
      </div>
    </main>
  );
}

export default App;