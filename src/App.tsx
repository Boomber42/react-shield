import React, { useEffect, useState } from 'react';
import './App.css';
import CardAgents from './components/cardAgents';
import CardItens from './components/cardItens';
import Menu from './components/menu';
import Header from './components/header';
import Footer from './components/footer';
import Loading from './components/loading';
import Api, { Subject } from './helpers/api';
import Button from './components/button';
import CustomModal from './components/customModal';

function App() {
  let [itens, setItens] = useState<Subject[]>([]);
  let [loading, setLoading] = useState(false);
  let [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  let [currentType, setCurrentType] = useState<string>('Agente');
 
  async function request(type: string = 'Agente'){
    setCurrentType(type);
    setLoading(true); //Inicia a tela de carregamento no front enquanto filtra os dados.
    setItens([]) //Limpando o valor da variavel itens.
    const api = new Api();
    var filteredItens: Subject[] = await api.getSubjectsByType(type);
    setItens(filteredItens); //Preenchendo a lista itens com os itens filtrados.
    setLoading(false); //Finaliza a tela de carregamento após trazer os dados.
  }

  useEffect(() => {
    request();
  }, [])

  function closeModal(reload?: boolean){
    if(reload){
      request(currentType);
    }
    setIsModalOpen(false);
  }

  function openModal(){
    setIsModalOpen(true);
  }

  return (
    <div>
      <main>
        <Header/>
        <Menu
          request = {request}
        />
        <div className='counteiner'>
          <div className='buttonStyle'>
            <Button name='Adicionar novo' onClick={openModal} />
          </div>
          <CustomModal isModalOpen={isModalOpen} closeModal={closeModal} typeModal={currentType} />
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