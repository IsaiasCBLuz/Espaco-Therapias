import { useEffect, useState } from 'react';

import Dilma from '../../../assets/Dilma.jpg';
import logo from '../../../assets/logo-removebg-preview.png';
import TerapiaMultidimensional from '../../../assets/TerapiaMultidimensional.jpg';
import ThetaHealing from '../../../assets/ThetaHealing.jpg';
import ConstelacaoFamiliar from '../../../assets/ConstelacaoFamiliar.jpg';
import Psicoterapia from '../../../assets/Psicoterapia.jpg';
import Psicogenealogia from '../../../assets/Psicogenealogia.jpg';

export function Portifolio() {
  const [tiposConsultas, setTiposConsultas] = useState([
    {
      id: 1,
      nome: 'Terapia Multidimensional',
      descricao: `
        A Terapia Multidimensional é uma abordagem holística que integra o cuidado com o corpo, mente e espírito. 
        Ao acessar diferentes dimensões da consciência, essa técnica permite a liberação de bloqueios emocionais, 
        traumas e padrões limitantes, proporcionando uma sensação profunda de paz e equilíbrio. Ideal para quem 
        busca uma transformação integral, ela trabalha com a energia do coração e ajuda a resolver questões de 
        vida de maneira suave e amorosa.`,
      imagem: TerapiaMultidimensional,
      icone: "fa-solid fa-brain",
    },
    {
      id: 2,
      nome: 'Thetahealing',
      descricao: `
        ThetaHealing é uma poderosa técnica de cura energética que atua nas camadas mais profundas da mente subconsciente. 
        Utilizando a frequência cerebral Theta, esta prática permite identificar e transformar crenças limitantes, traumas 
        e padrões negativos que podem estar afetando a sua vida. Imagine poder reescrever os programas internos que governam 
        suas emoções e comportamentos. ThetaHealing é uma porta para o autoconhecimento e a cura, proporcionando clareza mental 
        e emocional.`,
      imagem: ThetaHealing,
      icone: "fa-solid fa-hand-holding-medical",
    },
    {
      id: 3,
      nome: 'Constelação Familiar',
      descricao: `
        A Constelação Familiar é uma abordagem terapêutica que revela as dinâmicas ocultas dentro dos sistemas familiares. 
        Por meio dessa técnica, é possível trazer à luz padrões repetitivos e traumas herdados, oferecendo uma nova perspectiva 
        para a cura e reconciliação com o passado. Ao observar essas dinâmicas, muitas vezes inconscientes, você pode libertar-se 
        de pesos emocionais que não pertencem a você, promovendo uma sensação de alívio e renovação nas relações familiares.`,
      imagem: ConstelacaoFamiliar,
      icone: "fa-solid fa-hands-holding-child",
    },
    {
      id: 4,
      nome: 'Psicoterapia',
      descricao: `
        A Psicoterapia é uma prática centrada no diálogo e na exploração das emoções, pensamentos e comportamentos. 
        Com a ajuda de um psicólogo, você pode enfrentar traumas, ansiedades e dificuldades emocionais de forma segura 
        e estruturada. Através desse processo, você desenvolve uma compreensão mais profunda de si mesmo, aprende a 
        lidar melhor com os desafios da vida e constrói um caminho para um bem-estar mental duradouro. A psicoterapia 
        é um espaço de acolhimento onde cada sessão é uma oportunidade para crescer e se transformar.`,
      imagem: Psicoterapia,
      icone: "fa-solid fa-clipboard-user",
    },
    {
      id: 5,
      nome: 'Psicogenealogia',
      descricao: `
        A Psicogenealogia explora as raízes familiares e como elas influenciam quem você é hoje. Este método analisa a 
        história de vida de seus antepassados para identificar padrões emocionais e comportamentais que podem estar 
        presentes em sua vida. Ao compreender esses legados familiares, você tem a oportunidade de quebrar ciclos 
        negativos e ressignificar sua história pessoal. Essa técnica oferece uma visão profunda das conexões familiares, 
        permitindo que você encontre liberdade e autenticidade ao se libertar de vínculos invisíveis com o passado.`,
      imagem: Psicogenealogia,
      icone: "fa-solid fa-people-group",
    },
  ]);
  const [menuExpanded, setMenuExpanded] = useState(false);

  useEffect(() => {
    setTiposConsultas(tiposConsultas);
  }, []);

  return (
    <>
      <header className="bg-tostado_claro w-full flex flex-col md:flex-row items-center px-8 py-1 fixed shadow-lg rounded-b-2xl">
        <div className='flex flex-row items-center w-full md:w-1/2'>
          <a className="w-20 h-20 mr-4" href='/login'>
            <img src={logo} alt="logo" className="object-contain w-full h-full" />
          </a>
          <h1 className="text-2xl font-bold font-amsterdam text-castanho_rosado">
            Espaço Therapias
          </h1>
          <div className='ms-auto'>
            <button className="md:hidden text-2xl text-castanho_rosado" onClick={() => setMenuExpanded(!menuExpanded)}>
              <i className={`fa-solid fa-${menuExpanded ? 'xmark' : 'bars'}`}></i>
            </button>
          </div>
        </div>
        <div className={`md:ms-auto overflow-hidden transition-all duration-500 ${menuExpanded ? 'max-h-96 my-4' : 'max-h-0 md:max-h-96'}`}>
          <nav className={`flex flex-col md:flex-row md:gap-4 gap-2`}>
            <a href="#PrimeiraImpressao" className="text-castanho_rosado text-xl border-b-2 border-castanho_rosado flex flex-row items-center gap-2 hover:text-castanho_rosado hover:border-castanho_rosado hover:font-bold">
              <i className="fa-solid fa-home text-sm"></i>
              <p className='text-sm'>Inicio</p>
            </a>
            <a href="#Sobre" className="text-castanho_rosado text-xl border-b-2 border-castanho_rosado flex flex-row items-center gap-2 hover:text-castanho_rosado hover:border-castanho_rosado hover:font-bold">
              <i className="fa-solid fa-user text-sm"></i>
              <p className='text-sm'>Sobre</p>
            </a>
            <a href="#Servicos" className="text-castanho_rosado text-xl border-b-2 border-castanho_rosado flex flex-row items-center gap-2 hover:text-castanho_rosado hover:border-castanho_rosado hover:font-bold">
              <i className="fa-solid fa-hands-praying text-sm"></i>
              <p className='text-sm'>Serviços</p>
            </a>
            <a href="/agendamento" className="text-castanho_rosado text-xl border-b-2 border-castanho_rosado flex flex-row items-center gap-2 hover:text-castanho_rosado hover:border-castanho_rosado hover:font-bold">
              <i className="fa-solid fa-calendar-check text-sm"></i>
              <p className='text-sm'>Agendamento</p>
            </a>
            <a href="#Avaliacoes" className="text-castanho_rosado text-xl border-b-2 border-castanho_rosado flex flex-row items-center gap-2 hover:text-castanho_rosado hover:border-castanho_rosado hover:font-bold">
              <i className="fa-solid fa-star text-sm"></i>
              <p className='text-sm'>Avaliações</p>
            </a>
          </nav>
        </div>
      </header>

      <main className="bg-creme w-full h-screen flex flex-col items-center">
        {/* Primeira Impressao */}
        <section id='PrimeiraImpressao' className="bg-tostado_claro w-11/12 md:w-10/12 max-w-6xl p-4 md:p-8 my-8 flex flex-col lg:flex-row gap-8 rounded-lg shadow-lg mt-36">
          <div className="border-4 border-[#C6A850] w-full lg:w-1/3 h-[40vh] lg:h-auto overflow-hidden rounded-lg">
            <img
              src={Dilma}
              alt="Dilma"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left font-spectral">
            <p className="text-castanho_rosado font-dancing font-bold text-4xl mb-6">
              Te auxilio a olhar para si e se reconectar com sua essência.
            </p>
            <p className="text-sm leading-relaxed text-castanho_claro mb-4">
              Seja bem-vinda(a). Me chamo Dilma Merola, sou
              psicóloga e terapeuta. Aqui você encontrará um espaço seguro e
              acolhedor para se reconectar com sua essência e se reencontrar.
              Contamos com consultas como:
            </p>
            <div className='grid grid-cols-6 gap-4 mb-4'>
              {tiposConsultas.map((tipoConsulta) => (
                <div className={`col-span-3 flex flex-row items-end gap-1 hover:cursor-pointer`}>
                  <a href={'#Servico' + tipoConsulta.id.toString()} 
                    onClick={(e) => {
                      e.preventDefault();
                      const section = document.querySelector('#Servico' + tipoConsulta.id.toString());
                      const offset = 200; // Deslocamento desejado
                      const sectionTop = section?.getBoundingClientRect()?.top ?? 0 + window.scrollY; // Posição da seção em relação ao topo
                      window.scrollTo({ top: sectionTop - offset, behavior: 'smooth' }); // Rolagem suave com deslocamento
                    }}
                    className='flex flex-row items-end border-b-2 border-black gap-1'>
                    <i className={`${tipoConsulta.icone} text-sm`}></i>
                    <p className='text-sm'>{tipoConsulta.nome}</p>
                  </a>
                  <i className="fa-solid fa-caret-right text-base"></i>
                </div>
              ))}
            </div>
            <p className="text-sm font-dancing font-semibold text-castanho_claro">
              Atendimentos Online
            </p>
          </div>
        </section>
        {/* Sobre */}
        <section id='Sobre' className="w-full px-4 py-8 md:p-12 bg-[url('/src/assets/about-me-section.png')] ">
          <div className='flex flex-col'>
            <div>
              <h2 className='text-castanho_rosado text-4xl md:text-5xl font-bold font-dancing'>Que tal me conhecer?</h2>
            </div>
          </div>
          <div className='flex flex-row mt-4 md:mt-0'>
            <div className='w-[60%] mt-2 md:mt-8 font-spectral md:ms-24'>
              <p className='text-lg md:text-2xl'>Prazer</p>
              <p className='ms-2 md:ms-4 mt-2 text-sm'>Sou Dilma Marcela da Silva Merola, sou ...</p>
            </div>
            <div className='w-[40%]'>
              <div className='md:w-[75%]'>
                <img src="https://placehold.co/500x600" alt="Dilma" className="object-cover w-full h-full border-4 border-[#C6A850] rounded-lg" />
              </div>
            </div>
          </div>
        </section>
        {/* Servicos */}
        <section id='Servicos' className='w-full flex flex-col pt-16 bg-creme pb-16'>
          <div className='flex flex-col gap-16'>
            <div>
              <h2 className='text-tostado_claro text-5xl font-bold font-dancing text-center'>Tipos de Consultas</h2>
            </div>
            {tiposConsultas.map((tipoConsulta, index) => (
              <div id={'Servico'+ tipoConsulta.id.toString()} className={`w-[90%] md:w-[75%] bg-azul p-8 flex flex-col md:flex-row gap-8 ${index % 2 == 0 ? 'me-auto rounded-e-3xl' : 'ms-auto rounded-s-3xl'}`}>
                <div className='w-full md:w-[40%] md:h-[50vh]'>
                  <img src={tipoConsulta.imagem} alt="colsulta" className="object-cover w-full h-full border-4 border-[#C6A850] rounded-2xl" />
                </div>
                <div className='w-full md:w-[60%] md:h-[80%] my-auto'>
                  <h3 className='text-3xl font-bold font-dancing'>{tipoConsulta.nome}</h3>
                  <div className='mt-8'>
                    <p className='text-black font-spectral'>{tipoConsulta.descricao}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Agenda */}
        <section className="pt-16 bg-tostado_claro w-full flex flex-col items-center pb-16">
          <div className="mb-8">
            <h2 className="text-castanho_rosado text-4xl font-bold font-dancing text-center leading-tight">
              Agende a sua primeira conversa
            </h2>
          </div>
          <div className="text-center max-w-2xl">
            <p className="text-base font-spectral text-castanho_claro mb-4">
              Interessado(a) em um atendimento personalizado?
            </p>
            <p className="text-base font-spectral text-castanho_claro mb-8">
              Agende a sua consulta agora mesmo e dê o primeiro passo para seu bem-estar emocional.
            </p>
            <a href='/agendamento' className="bg-castanho_rosado w-1/3 text-creme font-bold py-3 px-8 rounded-full hover:bg-castanho_claro transition duration-300 flex flex-row items-center mx-auto">
              <i className="fa-solid fa-calendar-check"></i>
              <p className='ms-2 text-sm'>Agendar Consulta</p>
            </a>
          </div>
        </section>
        {/* Avaliacoes */}
        <section className="bg-creme w-full flex flex-col items-center py-16">
          <div className="mb-8">
            <h2 className="text-castanho_rosado text-4xl font-bold font-dancing text-center leading-tight">
              Depoimentos
            </h2>
          </div>
          <div className="text-center max-w-2xl">
            <p className="text-sm font-spectral text-castanho_claro mb-4">
              Veja o que os clientes têm a dizer sobre o atendimento.
            </p>
            <div className="flex flex-col gap-8">
              
            </div>
          </div>
        </section>
        <footer className="bg-tostado_claro w-full py-2 flex flex-row gap-16 items-center justify-center z-10 text-center">
          <p className="text-gray-700 font-bold text-xs mt-2">© 2024 Espaço Therapias Multidimensional</p>
        </footer>
      </main>
    </>
  );
}
