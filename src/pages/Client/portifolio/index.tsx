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
  const [inicionPosicaoY, setInicionPosicaoY] = useState(0);
  const [sobrePosicaoY, setSobrePosicaoY] = useState(0);
  const [servicoesPosicaoY, setServicoesPosicaoY] = useState(0);
  const [agendaPosicaoY, setAgendaPosicaoY] = useState(0);
  const [depoimentosPosicaoY, setDepoimentosPosicaoY] = useState(0);
  const [sessaoAtual, setSessaoAtual] = useState('Inicio');

  useEffect(() => {
    setTiposConsultas(tiposConsultas);
  }, []);

  useEffect(() => {
    const PrimeiraImpressao = document.querySelector('#PrimeiraImpressao');
    if (!PrimeiraImpressao) return;
    const rect = PrimeiraImpressao.getBoundingClientRect();
    setInicionPosicaoY(rect.top + window.scrollY - 90);

    const Sobre = document.querySelector('#Sobre');
    if (!Sobre) return;
    const rectSobre = Sobre.getBoundingClientRect();
    setSobrePosicaoY(rectSobre.top + window.scrollY - 90);

    const Servicos = document.querySelector('#Servicos');
    if (!Servicos) return;
    const rectServicos = Servicos.getBoundingClientRect();
    setServicoesPosicaoY(rectServicos.top + window.scrollY - 90);

    const Agenda = document.querySelector('#Agenda');
    if (!Agenda) return;
    const rectAgenda = Agenda.getBoundingClientRect();
    setAgendaPosicaoY(rectAgenda.top + window.scrollY - 90);

    const Depoimentos = document.querySelector('#Depoimentos');
    if (!Depoimentos) return;
    const rectDepoimentos = Depoimentos.getBoundingClientRect();
    setDepoimentosPosicaoY(rectDepoimentos.top + window.scrollY - 90);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      let novaSessao = '';

      if (scrollY >= inicionPosicaoY && scrollY < sobrePosicaoY) {
        novaSessao = 'Inicio';
      } else if (scrollY >= sobrePosicaoY && scrollY < servicoesPosicaoY) {
        novaSessao = 'Sobre';
      } else if (scrollY >= servicoesPosicaoY && scrollY < agendaPosicaoY) {
        novaSessao = 'Serviços';
      } else if (scrollY >= agendaPosicaoY && scrollY < depoimentosPosicaoY) {
        novaSessao = 'Agenda';
      } else if (scrollY >= depoimentosPosicaoY) {
        return;
      }

      if (novaSessao !== sessaoAtual) {
        if (novaSessao === '') return;
        setSessaoAtual(novaSessao);
        console.log(novaSessao);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [inicionPosicaoY, sobrePosicaoY, servicoesPosicaoY, agendaPosicaoY, depoimentosPosicaoY, sessaoAtual]);

  return (
    <>
      <header className="bg-creme w-full flex flex-col md:flex-row items-center px-8 py-1 fixed shadow-lg rounded-b-2xl">
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
            <a id='PiB' href="#PrimeiraImpressao" className={`${sessaoAtual == 'Inicio' ? 'text-creme bg-castanho_rosado' : 'text-castanho_rosado bg-creme'} text-xl px-2 py-1 border-2 border-castanho_rosado rounded-full flex flex-row items-center gap-2 hover:font-bold`}
              onClick={(e) => {
                e.preventDefault();
                const section = document.querySelector('#PrimeiraImpressao');
                const offset = 80; // Ajuste o deslocamento conforme necessário
                const sectionTop = (section?.getBoundingClientRect()?.top ?? 0) + window.scrollY; 
                window.scrollTo({ top: sectionTop - offset, behavior: 'smooth' }); 
              }}
            >
              <i className="fa-solid fa-home text-sm"></i>
              <p className='text-sm'>Inicio</p>
            </a>
            <a id='SoB' href="#Sobre" className={`${sessaoAtual == 'Sobre' ? 'text-creme bg-castanho_rosado' : 'text-castanho_rosado bg-creme'} text-xl px-2 py-1 border-2 border-castanho_rosado rounded-full flex flex-row items-center gap-2 hover:font-bold`}
              onClick={(e) => {
                e.preventDefault();
                const section = document.querySelector('#Sobre');
                const offset = 80; // Ajuste o deslocamento conforme necessário
                const sectionTop = (section?.getBoundingClientRect()?.top ?? 0) + window.scrollY; 
                window.scrollTo({ top: sectionTop - offset, behavior: 'smooth' }); 
              }}
            >
              <i className="fa-solid fa-user text-sm"></i>
              <p className='text-sm'>Sobre</p>
            </a>
            <a id='SeB' href="#Servicos" className={`${sessaoAtual == 'Serviços' ? 'text-creme bg-castanho_rosado' : 'text-castanho_rosado bg-creme'} text-xl px-2 py-1 border-2 border-castanho_rosado rounded-full flex flex-row items-center gap-2 hover:font-bold`}
              onClick={(e) => {
                e.preventDefault();
                const section = document.querySelector('#Servicos');
                const offset = 80; // Ajuste o deslocamento conforme necessário
                const sectionTop = (section?.getBoundingClientRect()?.top ?? 0) + window.scrollY; 
                window.scrollTo({ top: sectionTop - offset, behavior: 'smooth' }); 
              }}
            >
              <i className="fa-solid fa-hands-praying text-sm"></i>
              <p className='text-sm'>Serviços</p>
            </a>
            <a id='AgB' href="/agendamento" className={`${sessaoAtual == 'Agenda' ? 'text-creme bg-castanho_rosado' : 'text-castanho_rosado bg-creme'} text-xl px-2 py-1 border-2 border-castanho_rosado rounded-full flex flex-row items-center gap-2 hover:font-bold`}>
              <i className="fa-solid fa-calendar-check text-sm"></i>
              <p className='text-sm'>Agendamento</p>
            </a>
            <a id='AvB' href='https://www.instagram.com/stories/highlights/18006084224084045/' className={`${sessaoAtual == 'Depoimentos' ? 'text-creme bg-castanho_rosado' : 'text-castanho_rosado bg-creme'} text-xl px-2 py-1 border-2 border-castanho_rosado rounded-full flex flex-row items-center gap-2 hover:font-bold`}>
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
                    className='flex flex-row items-end border-0 border-black gap-1 px-2 rounded-full hover:scale-105'>
                    <i className={`${tipoConsulta.icone} text-sm`}></i>
                    <p className='text-sm'>{tipoConsulta.nome}</p>
                    <i className="fa-solid fa-caret-right text-base"></i>
                  </a>
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
            <div className='w-[100%] mt-2 md:mt-8 font-spectral md:ms-24'>
              <p className='text-lg md:text-2xl'>Prazer</p>
              <div className='flex flex-col gap-1'>
                <p className='ms-2 md:ms-4 text-sm'>
                  Muitos me chamam de <strong>Dilma</strong>, mas também algumas pessoas preferem me chamar de <strong>Marcela</strong> (meu segundo nome). Principalmente depois de trabalhar com crianças bem pequenas....
                </p>
                <p className='ms-2 md:ms-4 text-sm'>
                  Minha primeira formação, foi em <strong>Psicologia Clínica em 2002</strong>, pela <strong>Universidade São Marcos - SP</strong>, atuei por alguns anos na área de RH e, simultaneamente, clinicamente com <strong>crianças, adolecentes e adultos.</strong>
                </p>
                <p className='ms-2 md:ms-4 text-sm'>
                  Me casei em 2003, e depois de alguns meses engravidei e passei por uma gravidez de risco. Desta forma, fiz minha melhor opção de vida nesta nova etapa (mas que na época foi bem desafiador).
                </p>
                <p className='ms-2 md:ms-4 text-sm'>
                  Dei uma pausa profissional e me dediquei totalmente a minha família, meu filho <strong>Gabriel</strong> e mais tarde, a minha filha <strong>Mariana</strong>.
                </p>
                <p className='ms-2 md:ms-4 text-sm'>
                  Depois de alguns anos, achei que ero o momento de retomar a minha vida profissional, mas precisava me atualizar, e ao mesmo tempo, não queria deixar meus filhos o dia todo na escola. Optei por retornar através da formação em <strong>Pedagogia</strong> me especializando na <strong>Primeirissíma infância (A Especificidade no desenvolvimento de bebês de 0 a 3 anos).</strong>
                </p>
                <p className='ms-2 md:ms-4 text-sm'>
                  Trabalhei em muitos lugares especiais e com pessoas maravilhosas, que me ajudaram muito. Ainda assim, a <strong>Psicologia me "chamava"....</strong>
                </p>
                <p className='ms-2 md:ms-4 text-sm'>
                  Atuando após alguns anos, do cargo de <strong>Professora</strong> até ao de <strong>Coordenadora Pedagógica</strong>, trabalhei diretamente tanto com crianças quanto com orientação às fámilias, pais, mães, avós, tios(as) .... Enfim, todas as pessoas envolvidas na educação e cuidados com bebês e as crianças.
                </p>
                <p className='ms-2 md:ms-4 text-sm'>
                  Assim decidi retomar meu <strong>sonho, propósito, amor profissional e acima de tudo, minha missão de vida,</strong> atráves da psicologia.
                </p>
                <p className='ms-2 md:ms-4 text-sm'>
                  Desde então, muito <strong>estudo</strong>, <strong>dedicação</strong>, <strong>superação</strong>, <strong>desafios</strong>, <strong>evolução pessoal e espiritual</strong> e muitas <strong>descobertas</strong> para <strong>ampliação do olhar</strong> psicológico nos atendimentos, de maneira <strong>holística</strong>.
                </p>
                <p className='ms-2 md:ms-4 text-sm'>
                  Assim nasce o <strong>ESPAÇO THERAPIAS</strong>, um espaço de <strong>Acolhimento</strong>, <strong>Escuta</strong> e <strong>Transformação</strong> para todos.
                </p>
                <p className='ms-2 md:ms-4 text-sm'>
                  O <strong>ESPAÇO THERAPIAS</strong>, é um espaço que acolhe adultos e crianças, que desejam um acompanhamento psicológico contínuo ou também aqueles que desejam um olhar mais holístico para si, associando diversas terapias alternativas e energéticas, como ,<strong>THETAHEALING, CONSTELAÇÃO FAMILIAR, TERAPIA MULTIDIMENSIONAL, TAMEANA, REIKI</strong>, entre outras...
                </p>
              </div>
                
            </div>
            {/* <div className='w-[40%]'>
              <div className='md:w-[75%]'>
                <img src="https://placehold.co/500x600" alt="Dilma" className="object-cover w-full h-full border-4 border-[#C6A850] rounded-lg" />
              </div>
            </div> */}
          </div>
        </section>
        {/* Servicos */}
        <section id='Servicos' className='w-full flex flex-col pt-16 bg-creme pb-16'>
          <div className='flex flex-col gap-16'>
            <div>
              <h2 className='text-castanho_rosado text-5xl font-bold font-dancing text-center'>Tipos de Consultas</h2>
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
        <section id='Agenda' className="pt-16 bg-tostado_claro w-full flex flex-col items-center pb-16">
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
        <section id='Depoimentos' className="bg-creme w-full flex flex-col items-center py-16">
          <div className="mb-8">
            <h2 className="text-castanho_rosado text-4xl font-bold font-dancing text-center leading-tight">
              Depoimentos
            </h2>
          </div>
          <div className="text-center max-w-2xl">
            <a href='https://www.instagram.com/stories/highlights/18006084224084045/' className="text-sm font-spectral text-castanho_claro mb-4 underline">
              Veja o que os clientes têm a dizer sobre o atendimento.
            </a>
            <div className="flex flex-col gap-8">
              
            </div>
          </div>
        </section>
        <footer className="bg-tostado_claro w-full py-2 flex flex-row gap-16 items-center justify-center z-10 text-center">
          <p className="text-gray-700 font-bold text-xs mt-2">© 2024 Espaço Therapias</p>
        </footer>
      </main>
    </>
  );
}
