import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import timeGridPlugin from '@fullcalendar/timegrid'; 
import interactionPlugin from '@fullcalendar/interaction'; 
import ptBrLocale from '@fullcalendar/core/locales/pt-br';

import logo from '../../../assets/logo-removebg-preview.png';

interface Event {
  title: string;
  date: string;
}

export function Agendamento() {
  const [events, setEvents] = useState<Event[]>([
    { title: 'Evento 1', date: '2024-09-05 13:00'},
    { title: 'Evento 2', date: '2024-09-15 14:00'},
    { title: 'Evento 3', date: '2024-09-15 15:00'}
  ]);

  const [sendDisabled, setSendDisabled] = useState(true);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [data, setData] = useState('');
  const [formatedData, setFormatedData] = useState('');
  const [openDay, setOpenDay] = useState(false);
  const [eventsInDay, setEventsInDay] = useState<Event[]>([]);
  const [nomeErro, setNomeErro] = useState('');
  const [emailErro, setEmailErro] = useState('');
  const [telefoneErro, setTelefoneErro] = useState('');

  const selecionaData = (arg: { dateStr: string; }) => {
    const eventosNaData = events.filter(event => event.date.split(' ')[0] === arg.dateStr);
    const numeroDeEventos = eventosNaData.length;
  
    if (numeroDeEventos === 1) {
      setData(eventosNaData[0].date);
      const [ano, mes, dia] = arg.dateStr.split('-');
      const dataCorreta = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
      setFormatedData(dataCorreta.toLocaleDateString('pt-BR') + ' ' + eventosNaData[0].date.split(' ')[1]);
      setOpenDay(false);
    } else if (numeroDeEventos > 1) {
      setEventsInDay(eventosNaData);
      setOpenDay(true);
    } else {
      alert('Nenhum evento cadastrado para esta data.');
    }
  };

  const selecionaEvento = (eventDate: string) => {
    setData(eventDate);
    const [ano, mes, dia] = eventDate.split(' ')[0].split('-');
    const dataCorreta = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
    setFormatedData(dataCorreta.toLocaleDateString('pt-BR') + ' ' + eventDate.split(' ')[1]);
    setOpenDay(false);
  };

  const handleEventClick = (info: { event: { start: string; title: string; }; }) => {
    const eventDate = info.event.start.toISOString().split('T')[0] + ' ' + info.event.start.toTimeString().split(' ')[0]; // Formato: YYYY-MM-DD HH:MM:SS
    selecionaEvento(eventDate);
  };

  const verificarCamposPreenchidos = () => {
    return nome.trim() !== '' && email.trim() !== '' && telefone.trim() !== '' && data !== '';
  };

  const verificarIntegridadeCampos = () => {
    const nomeRegex = /^[A-Za-zÀ-ÿ\s]+$/;
    if (nome.length < 3 || !nomeRegex.test(nome)) {
      setNomeErro('Por favor, preencha o campo Nome corretamente (somente letras).');
      return false;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailErro('Por favor, preencha o campo Email corretamente (deve conter "@" e ".").');
      return false;
    }
  
    const telefoneRegex = /^[0-9]+$/;
    if (!telefoneRegex.test(telefone.trim())) {
      setTelefoneErro('Por favor, preencha o campo Telefone corretamente (somente números).');
      return false;
    }
  
    return true;
  };

  const handleAgendar = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificarIntegridadeCampos()) {
      alert('Agendamento realizado com sucesso!');
    }
  };

  useEffect(() => {
    setSendDisabled(!verificarCamposPreenchidos());
  }, [nome, email, telefone, data]);

  useEffect(() => {
    setNomeErro('');
  }, [nome]);

  useEffect(() => {
    setEmailErro('');
  }, [email]);

  useEffect(() => {
    setTelefoneErro('');
  }, [telefone]);

  useEffect(() => {
    setEvents(events)
  }, [events]);

  return (
    <>
      <header className="bg-tostado_claro w-full flex items-center px-8 py-4 shadow-lg">
        <div className="w-36 h-36 mr-4">
          <img src={logo} alt="logo" className="object-contain w-full h-full" />
        </div>
        <h1 className="text-4xl font-bold font-amsterdam text-creme">
          Espaço Therapias
        </h1>
        <div className='ms-auto'>
          <nav className="flex gap-4">
            <a href="/" className="text-creme text-xl border-b-2 border-creme flex flex-row items-center gap-2 hover:text-castanho_rosado hover:font-bold hover:border-castanho_rosado">
              <i className="fa-solid fa-home"></i>
              <p>Home</p>
            </a>
          </nav>
        </div>
      </header>

      <main className='w-full h-screen bg-creme'>
        <div className='py-24'>
          <h1 className="text-4xl font-bold font-amsterdam text-castanho_rosado text-center">Agende sua primeira conversa!</h1>
        </div>
        <div className='w-full bg-castanho_rosado flex flex-row ps-12 py-8'>
          <div className='w-[40%] pe-12 pt-24'>
            <p className="text-3xl font-bold text-creme font-dancing mb-12">Suas Infos</p>
            <form className='flex flex-col'>
              <div className='w-full mb-2'>
                <input 
                  type='text' 
                  placeholder='Nome' 
                  className='bg-creme w-full rounded-3xl p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tostado_claro'
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                {nomeErro && 
                  <div className='ms-4 flex flex-row gap-1 items-center mt-1'>
                    <i className="fa-solid fa-exclamation-circle text-creme"></i>
                    <p className='text-sm text-creme'>{nomeErro}</p>
                  </div>
                }
              </div>
              <div className='w-full mb-2'>
                <input 
                  type='email' 
                  placeholder='Email' 
                  className='bg-creme w-full rounded-3xl p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tostado_claro'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailErro && 
                  <div className='ms-4 flex flex-row gap-1 items-center mt-1'>
                    <i className="fa-solid fa-exclamation-circle text-creme"></i>
                    <p className='text-sm text-creme'>{emailErro}</p>
                  </div>
                }
              </div>
              <div className='w-full mb-2'>
                <input 
                  type='text' 
                  placeholder='Telefone' 
                  className='bg-creme w-full rounded-3xl p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tostado_claro'
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />
                {telefoneErro && 
                  <div className='ms-4 flex flex-row gap-1 items-center mt-1'>
                    <i className="fa-solid fa-exclamation-circle text-creme"></i>
                    <p className='text-sm text-creme'>{telefoneErro}</p>
                  </div>
                }
              </div>
              <div className='relative mb-2'>
                <div className="flex items-center">
                  <input 
                    type='text' 
                    placeholder='Data' 
                    className='bg-creme rounded-3xl p-3 border border-gray-300 pl-10 cursor-not-allowed w-full' 
                    disabled 
                    value={formatedData}
                  />
                  <i className="fa-solid fa-calendar-days absolute left-3 text-gray-500"></i>
                </div>
              </div>
              <button 
                className={`rounded-3xl p-3 text-creme font-bold transition duration-200 ${sendDisabled ? 'bg-tostado_claro' : 'bg-[#A85A3D] hover:border-2 border-tostado_claro'}`} 
                disabled={sendDisabled}
                onClick={handleAgendar}
              >
                Agendar
              </button>
            </form>
          </div>
          <div className='w-[60%] h-[95vh] bg-creme rounded-s-3xl p-3'>
            {openDay ? 
              <div className='flex flex-col'>
                <i className="fa-solid fa-xmark text-red-500 text-3xl hover:text-4xl hover:cursor-pointer" onClick={() => setOpenDay(false)}></i>
                <div className='my-4'>
                  <p className='text-3xl font-bold text-castanho_rosado font-dancing'>Por favor escolha um dos horários disponíveis.</p>
                </div>
                <div>
                  {eventsInDay.map((event, index) => (
                    <div
                      key={index}
                      className='flex flex-row justify-between items-center p-3 border-b border-gray-300 hover:bg-[#FFE3D3] hover:cursor-pointer'
                      onClick={() => selecionaEvento(event.date)}
                    >
                      <p className='text-2xl font-bold text-castanho_rosado font-dancing'>{event.title}</p>
                      <p className='text-2xl font-bold text-castanho_rosado font-dancing'>{event.date.split(' ')[1]}</p>
                    </div>
                  ))}
                </div>
              </div>
              :
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                dateClick={selecionaData}
                editable={false}
                selectable={true}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                locale={ptBrLocale}
                eventColor='#BD7350'
                eventClick={handleEventClick} // Adicione esta linha
              />
            }
          </div>
        </div>
      </main>
    </>
  );
}
