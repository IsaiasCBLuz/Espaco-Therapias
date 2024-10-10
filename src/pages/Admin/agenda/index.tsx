import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import timeGridPlugin from '@fullcalendar/timegrid'; 
import interactionPlugin from '@fullcalendar/interaction'; 
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import MySpaceNavbar from "../../../components/mySpaceNavbar";
import { toast, ToastContainer } from 'react-toastify';

export function Agenda() {
  interface Cliente {
    id: number;
    nome: string;
  }

  interface Event {
    date: string;
    [key: string]: any;
  }

  const [events, setEvents] = useState<Event[]>([]);
  const [modalAgendamentoOpen, setModalAgendamentoOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [dataFormatada, setDataFormatada] = useState('');
  const [horarioConfirmado, setHorarioConfirmado] = useState('');
  const [transferiu, setTransferiu] = useState(false);
  const [telefone, setTelefone] = useState('');
  const [tituloSumario, setTituloSumario] = useState('');
  const [sumario, setSumario] = useState('');
  const [agendarModalOpen, setAgendarModalOpen] = useState(false);
  const [dataAgendamento, setDataAgendamento] = useState('');
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [idCliente, setIdCliente] = useState(0);
  const [horarioAgendamento, setHorarioAgendamento] = useState('');
  const [idConsulta, setIdConsulta] = useState(0);
  // const [antigoHorario, setAntigoHorario] = useState('');

  const handleEventClick = async (info: { event: { id: string; start: Date | null; title: string; }; }) => {
    // console.log('chegou aqui');
    // console.log(info.event.id);  
    sumarioConsulta(parseInt(info.event.id));
    setIdConsulta(parseInt(info.event.id));
  };

  const handleEventDrop = (info: any) => {
    const novaData = info.event.startStr.split('T')[0]; // Pega a nova data
    const dataFormatada = new Date(novaData).toLocaleDateString('pt-BR');
    
    setIdConsulta(info.event.id); // Armazena o ID do cliente
    // setAntigoHorario(info.oldEvent.startStr.split('T')[0]); // Pega o horário antigo
    setTitle('Horário Transferido');
    setDataAgendamento(novaData); // Armazena a data transferida
    setHorarioConfirmado(`Consulta sendo transferida para o dia ${dataFormatada}`);
    setHorarioAgendamento(info.event.startStr.split('T')[1].slice(0, 5)); // Pega o horário transferido
    setTransferiu(true);
    setModalAgendamentoOpen(true);
  };

  const confirmarNovoHorario = () => {
    fetch(import.meta.env.VITE_API+'/prontuario/horario/' + idConsulta, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        data: dataAgendamento,
        hora: horarioAgendamento,
      })
    }).then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          console.log(data.message);
          setModalAgendamentoOpen(false);
          setTransferiu(false);
          window.location.reload();
        });
      } else {
        response.json().then((data) => {
          // console.log(data.error);
          toast.error(data.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
        return response.json();
      }
    }).catch((error) => {
      console.error('Erro:', error);
    });
  };

  const cancelaNovoHorario = () => {
    // // Atualiza o evento com o horário antigo
    // const updatedEvents = events.map(event =>
    //   event.date.includes(dataAgendamento) // Verifica se a data do evento corresponde à data do evento transferido
    //   ? { ...event, date: dataAgendamento + ' ' + antigoHorario } // Atualiza o horário com o valor antigo
    //   : event
    // );
    // console.log(updatedEvents);
    // setEvents(updatedEvents);
    // setModalAgendamentoOpen(false);
    // setTransferiu(false); // Reseta o estado de transferência
    window.location.reload();
  }

  const infosAgenda = (mes: number, ano: number) => {
    const dataStart = ano + '-' + mes + '-01';
    const dataEnd = ano + '-' + mes + '-31';
    console.log(dataStart, dataEnd);
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
  
  const agendarConsulta = () => {
    if (!dataAgendamento || !horarioAgendamento) {
      console.log(dataAgendamento, horarioAgendamento, idCliente);
      alert('Preencha todos os campos!');
      return;
    }
    fetch(import.meta.env.VITE_API+'/prontuario/horario', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        data: dataAgendamento,
        hora: horarioAgendamento,
        id_cliente: idCliente,
      })
    }).then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          console.log(data.message);
          setAgendarModalOpen(false);
          window.location.reload();
        });
      } else {
        // console.error('Erro:', response);
        response.json().then((data) => {
          // console.log(data.error);
          toast.error(data.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
        return response.json();
      }
    }).catch((error) => {
      // console.error('Erro:', error);
      return error;
    });
  }

  const dataParaConsulta = (data: string) => {
    setDataAgendamento(data);
    setAgendarModalOpen(true);
  }

  const clientesAgenda = () => {
    fetch(import.meta.env.VITE_API+'/cliente/agenda', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    }).then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          console.log(data.body);
          setClientes(data.body);
        });
      } else {
        return response.json();
      }
    }).catch((error) => {
      console.error('Erro:', error);
  })};

  const deletarConsulta = () => {
    fetch(import.meta.env.VITE_API+'/prontuario/horario/' + idConsulta, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    }).then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          console.log(data.message);
          window.location.reload();
        });
      } else {
        response.json().then((data) => {
          // console.log(data.message);
          toast.error(data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
        return response.json();
      }
    }).catch((error) => {
      console.error('Erro:', error);
    });
  }

  useEffect(() => {
    clientesAgenda();
  }, []);

  useEffect(() => {
    if (modalAgendamentoOpen || agendarModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto'; // Reseta quando o componente desmontar
    };
  }, [modalAgendamentoOpen, agendarModalOpen]);

  return (
    <>
      <MySpaceNavbar />
      <ToastContainer />
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
              eventClick={(info) => handleEventClick(info)}
              datesSet={(info) => infosAgenda(info.start.getMonth() + 2, info.start.getFullYear())}
              dateClick={(info) => dataParaConsulta(info.dateStr)}
            />
          </div>
        </section>
      </main>
      {/* Modal */}
      <div className={`${modalAgendamentoOpen ? 'flex' : 'hidden'} fixed inset-0 z-10 bg-[rgba(0,0,0,0.7)] justify-center items-center`}>
        <div className='flex flex-col bg-creme w-8/12 max-h-[80%] mx-auto my-auto rounded-xl border-2 border-tostado_claro p-4'>
        {transferiu ? 
          <>
            <div className='flex flex-row'>
              <p className='font-spectral'>Transferindo Consulta</p>
              <i className="fas fa-times text-tostado ml-auto cursor-pointer text-xl" onClick={() => cancelaNovoHorario()}></i>
            </div>
            <div className='flex flex-col mt-2'>
              <p className='text-sm font-spectral'>{horarioConfirmado}</p>
            </div>
            <div className='flex flex-col mt-2'>
              <label className='font-spectral'>Digite o novo horário (HH:MM):</label>
              <input
                type="time"
                className='mt-2 p-2 border rounded-md'
                value={horarioAgendamento}
                onChange={(e) => setHorarioAgendamento(e.target.value)} // Atualiza o horário digitado
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
              <p className='font-spectral text-xl'>{title} - {dataFormatada}</p>
              <i className="fas fa-times text-tostado ml-auto cursor-pointer text-xl" onClick={() => setModalAgendamentoOpen(false)}></i>
            </div>
            <div className='flex flex-col mt-2'>
              <p className='text-sm font-spectral'>Telefone: {telefone}</p>
            </div>
            <div className='flex flex-col mt-2'>
              <p className='text-lg font-spectral'>Última consulta ({tituloSumario}):</p>
              <pre className='text-base font-spectral overflow-y-auto h-full text-wrap max-h-72 mt-2'>
                {sumario}
              </pre>
            </div>
            <button className='bg-castanho_rosado text-sm text-creme font-spectral px-2 py-1 rounded-xl w-4/12 mx-auto mt-4' onClick={() => deletarConsulta()}>Cancelar Consulta</button>
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
      {/* Modal de Agendamento */}
      <div className={`${agendarModalOpen ? 'flex' : 'hidden'} fixed inset-0 z-10 bg-[rgba(0,0,0,0.7)] justify-center items-center`}>
        <div className='flex flex-col bg-creme w-4/12 max-h-[80%] mx-auto my-auto rounded-xl border-4 border-castanho_rosado p-4'>
          <div className='flex flex-row'>
            <p className='font-spectral text-lg'>Agendar Consulta</p>
            <i className="fas fa-times text-tostado ml-auto cursor-pointer text-xl" onClick={() => setAgendarModalOpen(false)}></i>
          </div>
          <div className='flex flex-col mt-2'>
            <label className='font-spectral text-base'>Cliente:</label>
            <div className="relative">
              <select id='selectCliente' className="p-2 border-2 border-castanho_rosado rounded-md text-sm font-spectral appearance-none w-full"
                onChange={(e) => setIdCliente(parseInt(e.target.value))}>
                <option value={0} className="text-sm text-castanho font-spectral">Horário Livre</option>
                {clientes.map((cliente) => (
                  <option
                    key={cliente.id}
                    value={cliente.id}
                    className="text-sm text-castanho font-spectral"
                  >
                    {cliente.nome}
                  </option>
                ))}
              </select>
              <i className="fas fa-chevron-down absolute right-2 top-2 text-castanho"></i>
            </div>
          </div>
          <div className='flex flex-col mt-2'>
            <label className='font-spectral text-base'>Data:</label>
            <input
              type="date"
              className=' p-2 border-2 rounded-md border-castanho_rosado'
              value={dataAgendamento}
              onChange={(e) => setDataAgendamento(e.target.value)} // Atualiza a data digitada
            />
          </div>
          <div className='flex flex-col mt-2'>
            <label className='font-spectral text-base'>Horário (HH:MM):</label>
            <input type="time" className=' p-2 border-2 rounded-md border-castanho_rosado' onChange={(e) => setHorarioAgendamento(e.target.value)}/>
          </div>
          <div className='flex flex-row mt-4'>
            <button
              className='bg-castanho_rosado text-sm text-creme font-spectral px-4 py-2 rounded-xl mx-auto'
              onClick={() => agendarConsulta()}
            >
              Agendar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
