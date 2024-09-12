import { useEffect, useState } from 'react';
import MySpaceNavbar from '../../../components/mySpaceNavbar';

export function Clientes() {
    const [clientes, setClientes] = useState([
        {
            id: 1,
            expanded: false,
            data: "2022-01-01",
            dataF: "01/01/2022",
            hora: "09:00",
            nome: "John Doe",
            email: "johndoe@example.com",
            telefone: "123456789",
            recorrencia: "Semanal",
            proximasConsultas: [
                { data: "2022-01-08", dataF: "08/01/22", hora: "09:00" },
                { data: "2022-01-15", dataF: "15/01/22", hora: "09:00" },
                { data: "2022-01-22", dataF: "22/01/22", hora: "09:00" },
            ],
        },
        {
            id: 2,
            expanded: false,
            data: "2022-01-02",
            dataF: "02/01/2022",
            hora: "10:00",
            nome: "Jane Doe",
            email: "Jane@gmail.com",
            telefone: "987654321",
            recorrencia: "Mensal",
            proximasConsultas: [
                { data: "2022-02-02", dataF: "02/02/22", hora: "10:00" },
                { data: "2022-03-02", dataF: "02/03/22", hora: "10:00" },
                { data: "2022-04-02", dataF: "02/04/22", hora: "10:00" },
            ],
        },
    ]);
    const [ultimasConsultasCliente, setUltimasConsultasCliente] = useState([
        {
            data: "2022-01-01",
            dataF: "01/01/2022 às 09:00",
            descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. ",
        },
        {
            data: "2022-01-08",
            dataF: "08/01/2022 às 09:00",
            descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies.",
        },
        {
            data: "2022-01-15",
            dataF: "15/01/2022 às 09:00",
            descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies.",
        }
    ]);
    const [histConsultas, setHistConsultas] = useState([
      {
          data: "2022-01-01",
          dataF: "01/01/2022",
          descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies.",
      },
      {
          data: "2022-01-08",
          dataF: "08/01/2022",
          descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies.",
      },
      {
          data: "2022-01-15",
          dataF: "15/01/2022",
          descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies.",
      },
      {
          data: "2022-01-22",
          dataF: "22/01/2022",
          descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies.",
      },
      {
          data: "2022-01-29",
          dataF: "29/01/2022",
          descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies",
      },
      {
          data: "2022-02-05",
          dataF: "05/02/2022",
          descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies",
      },
      {
          data: "2022-02-12",
          dataF: "12/02/2022",
          descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies",
      },
      {
          data: "2022-02-19",
          dataF: "19/02/2022",
          descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies",
      },
      {
          data: "2022-02-26",
          dataF: "26/02/2022",
          descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies",
      },
      {
          data: "2022-03-05",
          dataF: "05/03/2022",
          descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies",
      },
      {
          data: "2022-03-12",
          dataF: "12/03/2022",
          descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies",
      },
      {
          data: "2022-03-19",
          dataF: "19/03/2022",
          descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies",
      },
      {
          data: "2022-03-26",
          dataF: "26/03/2022",
          descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies",
      },
      {
          data: "2022-04-02",
          dataF: "02/04/2022",
          descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies",
      },
      {
          data: "2022-04-09",
          dataF: "09/04/2022",
          descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies",
      },
      {
          data: "2022-04-16",
          dataF: "16/04/2022",
          descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies",
      },
      {
          data: "2022-04-23",
          dataF: "23/04/2022",
          descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies",
      },
      {
          data: "2022-04-30",
          dataF: "30/04/2022",
          descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies",
      },
    ]);
    const [consutaDescModal, setConsultaDescModal] = useState(false);
    const [consultaForModal, setConsultaForModal] = useState('');
    const [descricaoForModal, setDescricaoForModal] = useState('');
    const [tipoForModal, setTipoForModal] = useState(false);
    const [editingConsulta, setEditingConsulta] = useState(false);

    function handleExpand(id: number) {
        // setConsultasCliente();
        setClientes(
          clientes.map((cliente) => {
            if (cliente.id === id) {
              return {
                ...cliente,
                expanded: !cliente.expanded,
              };
            }
            return cliente;
          })
        );
      }

    function handleOpenModal(consulta: string, descricao: string, tipo: boolean) {
      setConsultaForModal(consulta);
      setDescricaoForModal(descricao);
      setTipoForModal(tipo);
      setConsultaDescModal(true);
    }

    useEffect(() => {
      if (consutaDescModal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
      return () => {
        document.body.style.overflow = 'auto'; // Reseta quando o componente desmontar
      };
    }, [consutaDescModal]);

    return (
        <>
          <MySpaceNavbar />
      
          <main className={`bg-[#D4B8A3] w-full min-h-screen flex flex-col pt-32 px-4 lg:px-16 pb-8`}>
            <h1 className="text-3xl font-bold font-amsterdam text-tostado text-center mb-10">
              Clientes
            </h1>
            <section className="w-full">
              <div className="flex flex-row flex-wrap gap-4">
                {clientes.map((cliente) => (
                  <div className={`bg-castanho_rosado p-4 rounded-lg shadow-lg hover:shadow-2xl
                                  ${cliente.expanded ? 'animation-expand w-full flex flex-col' : 'animation-reduce'}`}
                        key={cliente.id}
                  >
                    <div className="flex items-center border-b border-creme pb-1 justify-end gap-3">
                      <i className="fas fa-pen text-creme cursor-pointer"></i>
                      <i className={`fas fa-${cliente.expanded ? 'minimize' : 'maximize'} text-creme cursor-pointer`}
                        onClick={() => handleExpand(cliente.id)}></i>
                    </div>
                    <div className='grid grid-cols-4 gap-4'>
                      <div className={`${cliente.expanded ? 'col-span-1' : 'col-span-full'}`}>
                          <div className="mt-2">
                            <p className="text-creme text-lg font-bold mb-1">
                              {cliente.nome}
                            </p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-1">
                              <i className="fas fa-at text-creme"></i>
                              <p className="text-creme text-sm">{cliente.email}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <i className="fas fa-phone text-creme"></i>
                              <p className="text-creme text-sm">{cliente.telefone}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <i className="fas fa-repeat text-creme"></i>
                              <p className="text-creme text-sm">{cliente.recorrencia}</p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-creme text-center font-bold mb-1">
                              Próximas consultas:
                            </p>
                            <div
                              className={`grid ${
                                cliente.proximasConsultas.length === 1
                                  ? 'grid-cols-3'
                                  : cliente.proximasConsultas.length === 2
                                  ? 'grid-cols-4'
                                  : 'grid-cols-3'
                              } gap-2`}
                            >
                              {cliente.proximasConsultas.map((consulta, index) => (
                                <div
                                  className={`bg-castanho_claro p-2 rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 border border-creme ${
                                    cliente.proximasConsultas.length === 1
                                      ? 'col-span-3'
                                      : cliente.proximasConsultas.length === 2
                                      ? 'col-span-2'
                                      : ''
                                  }`}
                                  key={index}
                                >
                                  <p className="text-creme text-center text-sm">
                                    {consulta.dataF}
                                  </p>
                                  <p className="text-creme text-center text-sm">
                                    {consulta.hora}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                      </div>
                      {cliente.expanded && ultimasConsultasCliente ? 
                      <div className='mt-4 flex flex-col col-span-3'>
                          <p className='text-creme text-center font-bold mb-1'>Prontuário</p>
                          <div className='grid grid-cols-3 gap-2'>
                            <div className='flex flex-col col-span-1 items-center border border-creme rounded-lg pb-2'>
                              <p className='text-creme mb-2'>Mais recentes</p>
                              <div className='grid grid-cols-1 gap-3'>
                                {ultimasConsultasCliente.map((consulta, index) => (
                                  <div
                                    className='flex flex-col gap-1 border cursor-pointer border-creme px-2 py-4 rounded-lg 
                                               shadow-xl shadow-[rgba(0,0,0,0.2)] hover:scale-105 hover:shadow-2xl hover:px-3 hover:py-5 
                                               transition-transform duration-300 ease-in-out'
                                    key={index}
                                    onClick={() => handleOpenModal(consulta.dataF, consulta.descricao, true)}
                                  >
                                    <p className='text-creme text-sm'>{consulta.dataF}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className='flex flex-col col-span-2 items-center border border-creme rounded-lg pb-2'>
                              <p className='text-creme mb-2'>Histórico</p>
                              <div className='flex flex-row gap-4 items-center my-auto'>
                                <div>
                                  <i className='fas fa-caret-left text-creme cursor-pointer text-4xl'></i>
                                </div>
                                <div className='grid grid-cols-4 gap-4'>
                                  {histConsultas.slice(0,12).map((consulta, index) => (
                                    <div 
                                      className='flex flex-col gap-2 border border-creme px-2 py-2 rounded-lg shadow-xl shadow-[rgba(0,0,0,0.2)]
                                                  cursor-pointer' 
                                      key={index}
                                      onClick={() => handleOpenModal(consulta.dataF, consulta.descricao, false)}
                                    >
                                      <p className='text-creme text-sm'>{consulta.dataF}</p>
                                    </div>
                                  ))}
                                </div>
                                <div>
                                  <i className='fas fa-caret-right text-creme cursor-pointer text-4xl'></i>
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>
                      : 
                      <> </>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
          {/* Modal da descrição da consulta */}
          <div className={`${consutaDescModal ? 'flex' : 'hidden'} flex-row w-full h-full absolute z-10 bg-[rgba(0,0,0,0.7)] top-0 overflow-hidden`}>
            <div className='flex flex-col bg-creme w-8/12 h-[80%] mx-auto my-auto rounded-xl border-2 border-tostado_claro p-4'>
              <div className='flex flex-row'>
                <p id='ModalConsultaTitle' className='text-xl font-spectral'>{consultaForModal}</p>
                <i className='fas fa-times text-castanho_rosado text-xl ml-auto cursor-pointer'
                  onClick={() => setConsultaDescModal(false)}
                ></i>
              </div>
              <div className='mt-4 flex-1 overflow-hidden'>
                {editingConsulta ? 
                  <textarea id='ModalConsultaDesc' 
                            className='text-base font-spectral w-full h-full p-2 border-2 border-creme rounded-lg resize-none'
                            value={descricaoForModal}
                            onChange={(e) => setDescricaoForModal(e.target.value)}
                  ></textarea> 
                  : 
                  <pre id='ModalConsultaDesc' className='text-base font-spectral overflow-y-auto h-full text-wrap'>{descricaoForModal}</pre>
                }
              </div>
              {tipoForModal && (
                <div className='w-full flex'>
                  <button className='bg-castanho_rosado text-creme px-4 py-2 rounded-lg mt-4 hover:scale-105 mx-auto'
                          onClick={() => setEditingConsulta(!editingConsulta)}>
                    {editingConsulta ? 'Salvar' : 'Editar'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      );
}
