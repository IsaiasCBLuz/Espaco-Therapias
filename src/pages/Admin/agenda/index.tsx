import { useState } from 'react';
import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import timeGridPlugin from '@fullcalendar/timegrid'; 
import interactionPlugin from '@fullcalendar/interaction'; 
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import MySpaceNavbar from "../../../components/mySpaceNavbar";

export function Agenda() {
  const [events, setEvents] = useState([]);

  const [modalAgendamentoOpen, setModalAgendamentoOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [data, setData] = useState('');
  const [dataFormatada, setDataFormatada] = useState('');
  const [horarioConfirmado, setHorarioConfirmado] = useState('');
  const [novoHorario, setNovoHorario] = useState(''); // Novo horário digitado pelo usuário
  const [transferiu, setTransferiu] = useState(false);
  const [telefone, setTelefone] = useState('');
  const [tituloSumario, setTituloSumario] = useState('');
  const [sumario, setSumario] = useState('');

  const handleEventClick = async (info: { event: { id: number; start: string; title: string; }; }) => {
      await sumarioConsulta(info.event.id);
  };

  const handleEventDrop = (info: any) => {
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

  const infosAgenda = (mes: number, ano: number) => {
    const dataStart = ano + '-' + mes + '-01';
    const dataEnd = ano + '-' + mes + '-31';
    fetch(import.meta.env.VITE_API+`/prontuario/eventos/${dataStart}/${dataEnd}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    }).then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          console.log(data.body);
          setEvents(data.body);
        });
      } else {
        return response.json();
      }
    }).catch((error) => {
      console.error('Erro:', error);
    });
  }

  const sumarioConsulta = (id: number) => {
    console.log(id);
    fetch(import.meta.env.VITE_API+`/prontuario/sumario/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    }).then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          console.log(data.body);
          setTitle(data.body.nome);
          setTelefone(data.body.telefone);
          setDataFormatada(data.body.data);
          setTituloSumario(data.body.titulo);
          setSumario(data.body.texto);
          setModalAgendamentoOpen(true);
        });
      } else {
        return response.json();
      }
    }).catch((error) => {
      console.error('Erro:', error);
    });
  }

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
              datesSet={(info) => infosAgenda(info.start.getMonth() + 2, info.start.getFullYear())}
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
              <p className='font-spectral'>{title} - {dataFormatada}</p>
              <i className="fas fa-times text-tostado ml-auto cursor-pointer text-xl" onClick={() => setModalAgendamentoOpen(false)}></i>
            </div>
            <div className='flex flex-col mt-2'>
              <p className='text-sm font-spectral'>Telefone: {telefone}</p>
            </div>
            <div className='flex flex-col mt-2'>
              <p className='text-sm font-spectral'>Última consulta ({tituloSumario}):</p>
              <pre className='text-xs font-spectral overflow-y-auto h-full text-wrap max-h-60'>
                {sumario}
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
