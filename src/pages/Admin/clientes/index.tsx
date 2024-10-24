import { useEffect, useState } from 'react';
import MySpaceNavbar from '../../../components/mySpaceNavbar';
import useSpeechToText from 'react-hook-speech-to-text';
import { toast, ToastContainer } from 'react-toastify';

interface Clinte {
  consultaHoje: string;
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
  id: number;
}

export function Clientes() {
    const [clientes, setClientes] = useState<Clinte[]>([]);
    const [ultimasConsultasCliente, setUltimasConsultasCliente] = useState<Consulta[]>([]);
    const [histConsultas, setHistConsultas] = useState<Consulta[]>([]);
    const [consultaIdModal, setConsultaIdModal] = useState(0);
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
    const [adicaoModal, setAdicaoModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [clienteIdToDelete, setClienteIdToDelete] = useState(0);
    const [clienteNameToDelete, setClienteNameToDelete] = useState('');

    const [nomeNovoCliente, setNomeNovoCliente] = useState('');
    const [emailNovoCliente, setEmailNovoCliente] = useState('');
    const [telefoneNovoCliente, setTelefoneNovoCliente] = useState('');
    const [recorrenciaNovoCliente, setRecorrenciaNovoCliente] = useState('');
    const [nascimentoNovoCliente, setNascimentoNovoCliente] = useState('');

    const [idCliente, setIdCliente] = useState(0);

    const [textoInicial, setTextoInicial] = useState('');
    const {
      error,
      interimResult,
      isRecording,
      results,
      startSpeechToText,
      stopSpeechToText,
    } = useSpeechToText({
      continuous: true, // Permite continuar gravando até parar manualmente
      timeout: 2000,    // Tempo de inatividade antes de parar
      useLegacyResults: false,
    });

    function handleExpand(id: number, openClose: boolean) {
        if (openClose) {
          setIdCliente(id)
          getConsultasCliente(id)
        }
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

    function handleOpenModal(consulta: string, descricao: string, id:number, tipo: boolean) {
      setConsultaForModal(consulta);
      setDescricaoForModal(descricao);
      setTipoForModal(tipo);
      setConsultaDescModal(true);
      setConsultaIdModal(id);
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
      if (editingInfos) {
        atualizarCliente(id)
      }
    }

    function openDeleteModal(id: number, nome: string) {
      setClienteIdToDelete(id);
      setClienteNameToDelete(nome);
      setDeleteModal(true);
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

    const cadastraCliente = () => {
      if (!nomeNovoCliente || !recorrenciaNovoCliente) {
        setMessage({"message":"Preencha todos os campos", "type":"danger"})
        return
      }
      fetch(import.meta.env.VITE_API+"/cliente/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          nome: nomeNovoCliente,
          email: emailNovoCliente,
          celular: telefoneNovoCliente,
          id_frequencia: recorrenciaNovoCliente == 'semanal || Semanal' ? 1 : recorrenciaNovoCliente == 'quinzenal || Quinzenal' ? 2 : recorrenciaNovoCliente == 'mensal || Mensal' ? 3 : 4,
          dtNascimento: nascimentoNovoCliente
        })
      })
        .then((response) => {
          if (response.status == 200)
            return response.json()
          else
            setMessage({"message":"Nenhum registro encontrado", "type":"danger"})
        })
        .then((data) => {
          console.log(data)
          setAdicaoModal(false)
          getCliente()
        })
    }

    const atualizarConsulta = () => {
      fetch(import.meta.env.VITE_API+"/prontuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          titulo: consultaForModal,
          texto: descricaoForModal,
          id_consulta: consultaIdModal
        })
      })
        .then((response) => {
          if (response.status == 200){
            getConsultasCliente(idCliente);
            return response.json()
          }
          else
            setMessage({"message":"Nenhum registro encontrado", "type":"danger"})
        })
        .then((data) => {
          console.log(data)
          setConsultaDescModal(false)
        })
    }

    const atualizarCliente = (id: number) => {
      fetch(import.meta.env.VITE_API+"/cliente/atualizar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          id: id,
          nome: nome,
          email: email,
          celular: telefone,
          id_frequencia: recorrencia == 'semanal || Semanal' ? 1 : recorrencia == 'quinzenal || Quinzenal' ? 2 : recorrencia == 'mensal || Mensal' ? 3 : 4,
        })
      })
        .then((response) => {
          if (response.status == 200)
            return response.json()
          else
            setMessage({"message":"Nenhum registro encontrado", "type":"danger"})
        })
        .then((data) => {
          console.log(data)
          setEditingInfos(false)
        })
    }

    const deletarCliente = () => {
      fetch(import.meta.env.VITE_API+"/cliente/cadastro/"+ clienteIdToDelete, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
      })
        .then((response) => {
          if (response.status == 200)
            return response.json()
          else
            setMessage({"message":"Nenhum registro encontrado", "type":"danger"})
        })
        .then((data) => {
          console.log(data)
          setDeleteModal(false)
          getCliente()
        }).catch((error) => {
          console.log(error)
        })
    }

    function comecarGravacao() {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
          console.log("Permissão concedida!");
          startSpeechToText();
        })
        .catch(function(err) {
          console.error("Permissão negada ou erro:", err);
          toast.error("Permissão negada ou erro:", err);
        });
    }

    function validate() {
      localStorage.getItem('token') ? '' : location.href = '/'
    }

    useEffect(() => {
      if (consutaDescModal || adicaoModal || deleteModal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
      return () => {
        document.body.style.overflow = 'auto'; // Reseta quando o componente desmontar
      };
    }, [consutaDescModal, adicaoModal, deleteModal]);

    useEffect(() => {
      getCliente()
    }, []);

    useEffect(() => {
      validate()
    }, []);

    useEffect(() =>{
      // console.log(results)
      // console.log(results.length)
      // let textoCompleto = results.map(function(result) {
      //   return result.transcript
      // })
      if (results.length > 0){
        if (textoInicial == '' || textoInicial == null) {
          setTextoInicial(results[results.length-1].transcript)
        } else {
          console.log(textoInicial)
          setDescricaoForModal(textoInicial + " " + results[results.length-1].transcript)
        }
      }
    },[results])
  
    useEffect(() =>{
      setTextoInicial(descricaoForModal)
    },[descricaoForModal])

    useEffect(() => {
      console.log('isRecording:', isRecording);
    }, [isRecording]);

    if (error) {
      console.error("Error with speech recognition:", error);
    }

    return (
        <>
          <MySpaceNavbar />
          <ToastContainer />
          <p className='hidden'>{message.message}</p>
          <main className={`bg-[#D4B8A3] w-full min-h-screen flex flex-col pt-32 px-4 lg:px-16 pb-8`}>
            <div className='grid grid-cols-3'>
              <div>
                <button className='bg-castanho_rosado text-creme px-2 py-1 rounded-lg hover:scale-105 flex flex-row items-center'
                        onClick={() => setAdicaoModal(true)}>
                  <p className='text-sm'>Adicionar novo cliente</p>
                </button>
              </div>
              <h1 className="text-3xl font-bold font-amsterdam text-tostado text-center mb-10">
                Clientes
              </h1>
              <div></div>
            </div>
            <section className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {clientes.map((cliente) => (
                  <div className={`bg-castanho_rosado p-4 rounded-lg shadow-lg hover:shadow-2xl
                                  ${cliente.expanded ? 'col-span-4' : ''}`}
                        key={cliente.id}
                  >
                    <div className="flex items-center border-b border-creme pb-1 justify-end gap-3">
                      <i className="fas fa-trash text-creme cursor-pointer"
                        onClick={() => openDeleteModal(cliente.id, cliente.nome)}></i>
                      <i className={`fas fa-${cliente.editing ? 'check' : 'pen'} text-creme cursor-pointer`}
                        onClick={() => handleEdit(cliente.id)}></i>
                      <i className={`fas ${window.innerWidth < 720 ? 'fa-arrows-rotate' : cliente.expanded ? 'fa-minimize' : 'fa-maximize'} text-creme cursor-pointer`}
                        onClick={() => handleExpand(cliente.id, !cliente.expanded)}></i>
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
                                  className={`p-2 rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 border 'border-creme' ${consulta === cliente.consultaHoje ? 'bg-creme' : 'bg-castanho_rosado '} justify-center`}
                                  key={index}
                                >
                                  <p className={`${consulta === cliente.consultaHoje ? 'text-castanho_rosado' : 'text-creme'} text-center text-sm text-wrap w-full`}>
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
                                    onClick={() => handleOpenModal(consulta.titulo, consulta.texto, consulta.id ,true)}
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
            <div className='flex flex-col bg-creme w-8/12 h-[80%] mx-auto rounded-xl border-4 border-castanho_rosado p-4'>
              <div className='flex flex-row'>
                {editingConsulta ?
                  <input type='text' className='text-base font-spectral w-11/12 p-2 border-2 border-castanho_rosado rounded-lg resize-none'
                         value={consultaForModal} onChange={(e) => setConsultaForModal(e.target.value)}
                  ></input>
                :
                  <p id='ModalConsultaTitle' className='text-xl font-spectral'>{consultaForModal ? consultaForModal : 'Sem Título'}</p>
                }
                <i className='fas fa-times text-castanho_rosado text-xl ml-auto cursor-pointer'
                  onClick={() => {
                    setConsultaDescModal(false)
                    setEditingConsulta(false)
                  }}
                ></i>
              </div>
              {editingConsulta && (
                <div className='mt-4'>
                  {(isRecording) ? (
                    <i
                      className="fas fa-microphone text-castanho_rosado text-2xl cursor-pointer"
                      onClick={() => {
                        console.log('Stopping recording');
                        stopSpeechToText();
                      }}
                    ></i>
                  ) : (
                    <i
                      className="fas fa-microphone-slash text-castanho_rosado text-2xl cursor-pointer"
                      onClick={() => {
                        console.log('Starting recording');
                        comecarGravacao();
                      }}
                    ></i>
                  )}
                </div>
              )}
              <div className={`mt-${editingConsulta ? '0' : '4'} flex-1 overflow-hidden`}>
                {editingConsulta ? 
                  <textarea id='ModalConsultaDesc' 
                            className='text-base font-spectral w-full h-full p-2 border-2 border-castanho_rosado rounded-lg resize-none'
                            value={descricaoForModal}
                            onChange={(e) => setDescricaoForModal(e.target.value)}
                  ></textarea> 
                  : 
                  <pre id='ModalConsultaDesc' className='text-base font-spectral overflow-y-auto h-full text-wrap'>{descricaoForModal ? descricaoForModal : 'Nada foi anotado na ultima consulta'}</pre>
                }
              </div>
              {tipoForModal && (
                <div className='w-full flex'>
                  <button className='bg-castanho_rosado text-creme px-4 py-2 rounded-lg mt-4 hover:scale-105 mx-auto'
                          onClick={() => {
                              if (editingConsulta) {
                                atualizarConsulta()
                              }
                              setEditingConsulta(!editingConsulta)}
                            }>
                    {editingConsulta ? 'Salvar' : 'Editar'}
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* Modal de adição de cliente */}
          <div className={`fixed inset-0 z-10 bg-[rgba(0,0,0,0.7)] ${adicaoModal ? 'flex' : 'hidden'} justify-center items-center`}>
            <div className='flex flex-col bg-creme w-4/12 h-[70%] mx-auto rounded-xl border-4 border-castanho_rosado p-4'>
              <div className='flex flex-row'>
                <p id='ModalConsultaTitle' className='text-xl font-spectral'>Adicionar novo cliente</p>
                <i className='fas fa-times text-castanho_rosado text-xl ml-auto cursor-pointer'
                  onClick={() => setAdicaoModal(false)}
                ></i>
              </div>
              <div className='mt-4 flex-1 overflow-hidden'>
                <input type='text' className='text-base font-spectral placeholder-black w-full p-2 border-2 border-castanho_rosado rounded-lg resize-none'
                       placeholder='Nome' onChange={(e) => setNomeNovoCliente(e.target.value)}
                ></input>
                <input type='text' className='text-base font-spectral placeholder-black w-full p-2 border-2 border-castanho_rosado rounded-lg resize-none mt-2'
                       placeholder='Email' onChange={(e) => setEmailNovoCliente(e.target.value)}
                ></input>
                <input type='text' className='text-base font-spectral placeholder-black w-full p-2 border-2 border-castanho_rosado rounded-lg resize-none mt-2'
                       placeholder='Telefone' onChange={(e) => setTelefoneNovoCliente(e.target.value)}
                ></input>
                <input type='date' className='text-base font-spectral placeholder-black w-full p-2 border-2 border-castanho_rosado rounded-lg resize-none mt-2'
                       placeholder='Data de Nascimento' onChange={(e) => setNascimentoNovoCliente(e.target.value)}
                ></input>
                <div className="relative">
                  <select
                    className="text-base font-spectral placeholder-black w-full p-2 border-2 border-castanho_rosado rounded-lg resize-none mt-2 appearance-none"
                    onChange={(e) => setRecorrenciaNovoCliente(e.target.value)}
                  >
                    <option value="">Recorrência</option>
                    <option value="semanal">Semanal</option>
                    <option value="quinzenal">Quinzenal</option>
                    <option value="mensal">Mensal</option>
                    <option value="avulso">Avulso</option>
                  </select>
                  <i className="fas fa-caret-down absolute right-3 mt-4 text-xl pointer-events-none"></i>
                </div>
              </div>
              <div className='w-full flex'>
                <button className='bg-castanho_rosado text-creme px-4 py-2 rounded-lg mt-4 hover:scale-105 mx-auto' onClick={() => cadastraCliente()}>
                  Adicionar
                </button>
              </div>
            </div>
          </div>
          {/* Modal de exclusão de cliente */}
          <div className={`fixed inset-0 z-10 bg-[rgba(0,0,0,0.7)] ${deleteModal ? 'flex' : 'hidden'} justify-center items-center`}>
            <div className='flex flex-col bg-creme w-4/12 h-2/6 mx-auto rounded-xl border-4 border-castanho_rosado p-4'>
              <div className='flex flex-row'>
                <p id='ModalConsultaTitle' className='text-lg font-spectral'>Tem certeza que deseja arquivar <b>{clienteNameToDelete}</b> de sua lista de clientes?</p>
                <i className='fas fa-times text-castanho_rosado text-xl ml-auto cursor-pointer'></i>
              </div>
              <div className='w-full flex mt-auto'>
                <button onClick={() => deletarCliente()} className='bg-castanho_rosado text-creme px-4 py-2 rounded-lg mt-4 hover:scale-105 mx-auto'>
                  Arquivar cliente
                </button>
              </div>
            </div>
          </div>
        </>
      );
}
