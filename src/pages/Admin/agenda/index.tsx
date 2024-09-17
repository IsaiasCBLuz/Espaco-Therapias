import { useState } from 'react';
import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import timeGridPlugin from '@fullcalendar/timegrid'; 
import interactionPlugin from '@fullcalendar/interaction'; 
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import MySpaceNavbar from "../../../components/mySpaceNavbar";

export function Agenda() {
  const [events, setEvents] = useState([
    { id: 1, title: 'Rafael de Andrade', date: '2024-09-01 08:00'},
    { id: 2, title: 'Rafael de Andrade', date: '2024-09-01 09:30'},
    { id: 3, title: 'Rafael de Andrade', date: '2024-09-01 11:00'},
    { id: 4, title: 'Horário Livre', date: '2024-09-01 14:00'},
    { id: 5, title: 'Rafael de Andrade', date: '2024-09-01 15:30'},
    { id: 6, title: 'Rafael de Andrade', date: '2024-09-01 17:00'},
    { id: 7, title: 'Rafael de Andrade', date: '2024-09-08 08:00'},
    { id: 8, title: 'Rafael de Andrade', date: '2024-09-08 09:30'},
    { id: 9, title: 'Rafael de Andrade', date: '2024-09-08 11:00'},
    { id: 10, title: 'Horário Livre', date: '2024-09-08 14:00'},
    { id: 11, title: 'Rafael de Andrade', date: '2024-09-08 15:30'},
    { id: 12, title: 'Rafael de Andrade', date: '2024-09-08 17:00'},
  ]);

  const [modalAgendamentoOpen, setModalAgendamentoOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [data, setData] = useState('');
  const [dataFormatada, setDataFormatada] = useState('');
  const [horarioConfirmado, setHorarioConfirmado] = useState('');
  const [novoHorario, setNovoHorario] = useState(''); // Novo horário digitado pelo usuário
  const [transferiu, setTransferiu] = useState(false);

  const selecionaEvento = (eventDate: string, titulo: string) => {
    setData(eventDate);
    const [ano, mes, dia] = eventDate.split(' ')[0].split('-');
    const dataCorreta = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
    setDataFormatada(dataCorreta.toLocaleDateString('pt-BR') + ' às ' + eventDate.split(' ')[1]);
    if (titulo === 'Horário Livre') {
      setTitle('Horário Livre');
    } else {
      setTitle('Agendamento para ' + dataCorreta.toLocaleDateString('pt-BR') + ' às ' + eventDate.split(' ')[1] + ' - ' + titulo);
    }
    modalAgendamentoOpen ? setModalAgendamentoOpen(false) : setModalAgendamentoOpen(true);
  };

  const handleEventClick = (info: { event: { start: string; title: string; }; }) => {
    const eventDate = info.event.start.toISOString().split('T')[0] + ' ' + info.event.start.toTimeString().split(' ')[0];
    selecionaEvento(eventDate, info.event.title);
  };

  const handleEventDrop = (info) => {
    const novaData = info.event.startStr.split('T')[0]; // Pega a nova data
    const dataFormatada = new Date(novaData).toLocaleDateString('pt-BR');
    
    setTitle('Horário Transferido');
    setData(novaData); // Armazena a data transferida
    setHorarioConfirmado(`Consulta transferida para o dia ${dataFormatada}`);
    setTransferiu(true);
    setModalAgendamentoOpen(true);
  };

  const confirmarNovoHorario = () => {
    // Atualiza o evento com o novo horário digitado
    const updatedEvents = events.map(event =>
      event.date.includes(data) // Verifica se a data do evento corresponde à data do evento transferido
      ? { ...event, date: `${data} ${novoHorario}` } // Atualiza o horário com o novo valor
      : event
    );
    setEvents(updatedEvents);
    setModalAgendamentoOpen(false);
    setTransferiu(false); // Reseta o estado de transferência
  };

  return (
    <>
      <MySpaceNavbar />
      <main className={`bg-[#D4B8A3] w-full min-h-screen flex flex-col pt-32 px-4 lg:px-16 pb-8`}>
        <h1 className="text-3xl font-bold font-amsterdam text-tostado text-center mb-10">
          Agenda
        </h1>
        <section>
          <div className='mx-auto'>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              editable={true} // Permite arrastar e soltar eventos
              selectable={true}
              eventDrop={handleEventDrop} // Função chamada quando o evento é arrastado para outra data
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
              }}
              locale={ptBrLocale}
              eventColor='#BD7350'
              eventClick={handleEventClick}
            />
          </div>
        </section>
      </main>
      {/* Modal */}
      <div className={`${modalAgendamentoOpen ? 'flex' : 'hidden'} flex-row w-full h-full absolute z-10 bg-[rgba(0,0,0,0.7)] top-0 overflow-hidden`}>
        <div className='flex flex-col bg-creme w-8/12 max-h-[80%] mx-auto my-auto rounded-xl border-2 border-tostado_claro p-4'>
        {transferiu ? 
          <>
            <div className='flex flex-row'>
              <p className='font-spectral'>Horário Transferido</p>
              <i className="fas fa-times text-tostado ml-auto cursor-pointer text-xl" onClick={() => setModalAgendamentoOpen(false)}></i>
            </div>
            <div className='flex flex-col mt-2'>
              <p className='text-sm font-spectral'>{horarioConfirmado}</p>
            </div>
            <div className='flex flex-col mt-2'>
              <label className='font-spectral'>Digite o novo horário (HH:MM):</label>
              <input
                type="time"
                className='mt-2 p-2 border rounded-md'
                value={novoHorario}
                onChange={(e) => setNovoHorario(e.target.value)} // Atualiza o horário digitado
              />
            </div>
            <div className='flex flex-row mt-4'>
              <button
                className='bg-castanho_rosado text-sm text-creme font-spectral px-4 py-2 rounded-xl mx-auto'
                onClick={confirmarNovoHorario}
              >
                Confirmar Horário
              </button>
            </div>
          </>
          :
          <>
            <div className='flex flex-row'>
              <p className='font-spectral'>{title}</p>
              <i className="fas fa-times text-tostado ml-auto cursor-pointer text-xl" onClick={() => setModalAgendamentoOpen(false)}></i>
            </div>
            <div className='flex flex-col mt-2'>
              <p className='text-sm font-spectral'>Telefone: (11) 99999-9999</p>
            </div>
            <div className='flex flex-col mt-2'>
              <p className='text-sm font-spectral'>Última consulta:</p>
              <pre className='text-xs font-spectral overflow-y-auto h-full text-wrap max-h-60'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </pre>
            </div>
            {title === 'Horário Livre'
              ?
              <div className='flex flex-row mt-8 w-[100%] mx-auto'>
                <button className='bg-castanho_rosado text-sm text-creme font-spectral px-2 py-1 rounded-xl mx-auto'>Agendar Consulta</button>
                <button className='bg-castanho_rosado text-sm text-creme font-spectral px-2 py-1 rounded-xl mx-auto'>Disponibilizar para primeira conversa</button>
              </div>
              : <></>
            }
          </>
        }
        </div>
      </div>
    </>
  );
}
