import React, { useEffect, useState } from 'react';
import './App.css';
import CardAgents from './components/cardAgents';
import CardItens from './components/cardItens';
import Menu from './components/menu';
import Header from './components/header';
import Footer from './components/footer';


const infoDb: any[] = [{
  type: 'Agente',
  title: 'Agente Coulson',
  alt: 'imagem do Coulson',
  codeName: 'Phill.',
  image: '/assets/images/coulson.jpg',
  name: 'Phillip J. Coulson.',
  status: 'Morto.'
},
{
  type: 'Agente',
  title: 'Agente May',
  alt: 'imagem da Melinda',
  codeName: 'Cavalaria.',
  image: '/assets/images/melinda.jpg',
  name: 'Melinda May.',
  status: 'Viva.'
},
{
  type: 'Vingador',
  title: 'Capitão America',
  alt: 'imagem do Capitão America',
  codeName: 'Capitão America.',
  image: '/assets/images/cap.jpg',
  name: 'Steven Grant Rogers.',
  status: 'Desaparecido.'
},
{
  type: 'Vingador',
  title: 'Homem de Ferro',
  alt: 'imagem do Homem de Ferro',
  codeName: 'Homem de Ferro.',
  image: '/assets/images/iron man.jpg',
  name: 'Antony Edward Stark.',
  status: 'Morto.'
},
{
  type: 'Objeto',
  title: 'Tesseract',
  alt: 'imagem do Tesseract',
  image: '/assets/images/tesseract.jpg',
},
{
  type: 'Objeto',
  title: 'Monolito',
  alt: 'imagem do Monolito',
  image: '/assets/images/Monolito.png',
},
{
  type: 'Veiculo',
  title: 'Lola',
  alt: 'imagem do Lola',
  image: '/assets/images/lola.jpg',
},
{
  type: 'Veiculo',
  title: 'Quinjet',
  alt: 'imagem do Quinjet',
  image: '/assets/images/quinjet.jpg',
}
] 

function App() {
  let [itens, setItens] = useState<any[]>([]);
 
  function request(type?: string){
    if(!type){
      type = 'Agente'
    }
    setItens(infoDb.filter((element: any) => element.type === type));
  }

  useEffect(() => {
    request();
  }, [])

  return (
    <div>
      <main>
        <Header/>
        <Menu
          request = {request} 
        />
        <div className='counteiner'>
          {itens.map((iten: any)=>{
            var card;
            if(iten.type === 'Agente'){
              card = <CardAgents 
                title={iten.title}
                imageAlt={iten.alt}
                codeName={iten.codeName}
                image={iten.image}
                name={iten.name}
                status={iten.status}
              />
            }
            if(iten.type === 'Vingador'){
              card = <CardAgents 
                title={iten.title}
                imageAlt={iten.alt}
                codeName={iten.codeName}
                image={iten.image}
                name={iten.name}
                status={iten.status}
              />
            }
            if(iten.type === 'Objeto'){
              card = <CardItens
                title={iten.title}
                imageAlt={iten.alt}
                image={iten.image} 
              />
            }
            if(iten.type === 'Veiculo'){
              card = <CardItens
                title={iten.title}
                imageAlt={iten.alt}
                image={iten.image} 
              />
            }
            return(
              card
            )
          })}
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default App;