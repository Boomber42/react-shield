import React, { useEffect, useState } from 'react';
import './App.css';
import CardAgents from './components/cardAgents';
import CardItens from './components/cardItens';
import Menu from './components/menu';
import Header from './components/header';
import Footer from './components/footer';
import Loading from './components/loading';

interface Subject{
  type: string,
  title: string,
  alt: string,
  codeName?: string,
  image: string,
  name?: string,
  status?: string
}

const infoDb: Subject[] = [{
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
  let [itens, setItens] = useState<Subject[]>([]);
  let [loading, setLoading] = useState(false)
 
  function request(type: string = 'Agente'){
    setLoading(true); //Inicia a tela de carregamento no front enquanto filtra os dados.
    setItens([]) //Limpando o valor da variavel itens.
    setTimeout(() => {
      var filteredItems: Subject[] = infoDb.filter((element: Subject) => element.type === type);
      setItens(filteredItems); //Preenchendo a lista itens com os itens filtrados.
      setLoading(false); //Finaliza a tela de carregamento após trazer os dados.
    }, 5000)
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
          {itens.map((item: Subject)=>{
            var card;
            if(item.type === 'Agente'){
              card = <CardAgents 
                title={item.title}
                imageAlt={item.alt}
                codeName={item.codeName || ''} 
                image={item.image}
                name={item.name || ''}
                status={item.status || ''}
              />
            }
            if(item.type === 'Vingador'){
              card = <CardAgents 
                title={item.title}
                imageAlt={item.alt}
                codeName={item.codeName || ''}
                image={item.image}
                name={item.name || ''}
                status={item.status || ''}
              />
            }
            if(item.type === 'Objeto'){
              card = <CardItens
                title={item.title}
                imageAlt={item.alt}
                image={item.image} 
              />
            }
            if(item.type === 'Veiculo'){
              card = <CardItens
                title={item.title}
                imageAlt={item.alt}
                image={item.image} 
              />
            }
            return(
              card
            )
          })}
          {loading ? <Loading/> : ''}
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default App;