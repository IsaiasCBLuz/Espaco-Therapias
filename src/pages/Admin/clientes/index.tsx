import { useEffect, useState } from 'react';
import MySpaceNavbar from '../../../components/mySpaceNavbar';

interface Clinte {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  recorrencia: string;
  expanded: boolean;
  editing: boolean;
  proximasConsultas: string[];
}

interface Consulta {
  titulo: string;
  texto: string;
  data: string;
}

export function Clientes() {
    const [clientes, setClientes] = useState<Clinte[]>([]);
    const [ultimasConsultasCliente, setUltimasConsultasCliente] = useState<Consulta[]>([]);
    const [histConsultas, setHistConsultas] = useState<Consulta[]>([]);
    const [consutaDescModal, setConsultaDescModal] = useState(false);
    const [consultaForModal, setConsultaForModal] = useState('');
    const [descricaoForModal, setDescricaoForModal] = useState('');
    const [tipoForModal, setTipoForModal] = useState(false);
    const [editingConsulta, setEditingConsulta] = useState(false);
    const [editingInfos, setEditingInfos] = useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [recorrencia, setRecorrencia] = useState('');
    const [message, setMessage] = useState({message: '', type: ''});

    function handleExpand(id: number) {
        getConsultasCliente(id)
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

    function handleEdit(id: number) {
      console.log(id)
      setClientes(
        clientes.map((cliente) => {
          if (cliente.id === id) {
            if (!cliente.editing) {
              setNome(cliente.nome);
              setEmail(cliente.email);
              setTelefone(cliente.telefone);
              setRecorrencia(cliente.recorrencia);
            }
            return {
              ...cliente,
              editing: !cliente.editing,
            };
          }
          return cliente;
        })
      );
      setEditingInfos(true);
    }

    const getCliente = () => {
      fetch(import.meta.env.VITE_API+"/cliente/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
        .then((response) => {
          if (response.status == 200)
            return response.json()
          else
            setMessage({"message":"Nenhum registro encontrado", "type":"danger"})
        })
        .then((data) => {
          console.log(data)
          setClientes(data.body)
        })
    }

    const getConsultasCliente = (id: number) => {
      console.log(id)
      fetch(import.meta.env.VITE_API+"/cliente/consultas/"+ id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
        .then((response) => {
          if (response.status == 200)
            return response.json()
          else
            setMessage({"message":"Nenhum registro encontrado", "type":"danger"})
        })
        .then((data) => {
          console.log(data)
          setUltimasConsultasCliente(data.body.recentes)
          setHistConsultas(data.body.realizadas)
        })
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

    useEffect(() => {
      getCliente()
    }, []);

    return (
        <>
          <MySpaceNavbar />
      
          <main className={`bg-[#D4B8A3] w-full min-h-screen flex flex-col pt-32 px-4 lg:px-16 pb-8`}>
            <h1 className="text-3xl font-bold font-amsterdam text-tostado text-center mb-10">
              Clientes
            </h1>
            <section className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {clientes.map((cliente) => (
                  <div className={`bg-castanho_rosado p-4 rounded-lg shadow-lg hover:shadow-2xl
                                  ${cliente.expanded ? 'col-span-4' : ''}`}
                        key={cliente.id}
                  >
                    <div className="flex items-center border-b border-creme pb-1 justify-end gap-3">
                      <i className={`fas fa-${cliente.editing ? 'check' : 'pen'} text-creme cursor-pointer`}
                        onClick={() => handleEdit(cliente.id)}></i>
                      <i className={`fas ${window.innerWidth < 720 ? 'fa-arrows-rotate' : cliente.expanded ? 'fa-minimize' : 'fa-maximize'} text-creme cursor-pointer`}
                        onClick={() => handleExpand(cliente.id)}></i>
                    </div>
                    <div className='grid grid-cols-4 gap-4'>
                      <div className={`${cliente.expanded ? 'col-span-full md:col-span-1' : 'col-span-full'}`}>
                          <div className="mt-2">
                            {cliente.editing ?
                              <input type='text' className='text-castanho_rosado bg-castanho_claro p-1 rounded-md border border-creme mb-2'
                                     value={nome} onChange={(e) => setNome(e.target.value)}
                              />
                              :
                              <p className="text-creme text-xl font-bold mb-2">{cliente.nome}</p>
                            }
                          </div>
                          <div className={`flex ${cliente.editing ? 'flex-col' : 'flex-row'} gap-3 md:flex-col md:gap-2`}>
                            <div className="flex items-center gap-1">
                              <i className="fas fa-at text-creme"></i>
                              {cliente.editing ?
                                <input type='text' className='text-castanho_rosado bg-castanho_claro p-1 rounded-md border border-creme'
                                       value={email} onChange={(e) => setEmail(e.target.value)}
                                />
                                :
                                <p className="text-creme text-sm">{cliente.email}</p>
                              }
                            </div>
                            <div className="flex items-center gap-1">
                              <i className="fas fa-phone text-creme"></i>
                              {cliente.editing ?
                                <input type='text' className='text-castanho_rosado bg-castanho_claro p-1 rounded-md border border-creme'
                                       value={telefone} onChange={(e) => setTelefone(e.target.value)}
                                />
                                :
                                <p className="text-creme text-sm">{cliente.telefone}</p>
                              }
                            </div>
                            <div className="flex items-center gap-1">
                              <i className="fas fa-repeat text-creme"></i>
                              {cliente.editing ?
                                <input type='text' className='text-castanho_rosado bg-castanho_claro p-1 rounded-md border border-creme'
                                       value={recorrencia} onChange={(e) => setRecorrencia(e.target.value)}
                                />
                                :
                                <p className="text-creme text-sm">{cliente.recorrencia}</p>
                              }
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
                                  className={`bg-castanho_claro p-2 rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 border border-creme justify-center`}
                                  key={index}
                                >
                                  <p className="text-creme text-center text-sm text-wrap w-full">
                                    {consulta}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                      </div>
                      {cliente.expanded && ultimasConsultasCliente ? 
                      <div className='mt-4 flex flex-col col-span-full md:col-span-3'>
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
                                    onClick={() => handleOpenModal(consulta.titulo, consulta.texto, true)}
                                  >
                                    <p className='text-creme text-sm'>{consulta.data}</p>
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
                                  {histConsultas.slice(0,12).map((consulta: Consulta, index) => (
                                    <div 
                                      className='flex flex-col gap-2 border border-creme px-2 py-2 rounded-lg shadow-xl shadow-[rgba(0,0,0,0.2)]
                                                  cursor-default' 
                                      key={index}
                                    >
                                      <p className='text-creme text-sm'>{consulta.data}</p>
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
          <div className={`${consutaDescModal ? 'flex' : 'hidden'} fixed inset-0 z-10 bg-[rgba(0,0,0,0.7)] justify-center items-center`}>
            <div className='flex flex-col bg-creme w-8/12 h-[80%] mx-auto rounded-xl border-2 border-tostado_claro p-4'>
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
