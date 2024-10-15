import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import logo from '../../../assets/logo-removebg-preview.png';

export function Login() {
    const [inputSelected, setInputSelected] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const verifyLogin = () => {
        if (user === '' || password === '') {
            toast.error('Preencha todos os campos', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            doLogin()
        }
    }

    const doLogin = () => {
        fetch(import.meta.env.VITE_API+"/login", {
          method: "POST",
          body:JSON.stringify({
            "email": user,
            "password": password
          }),
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include"
        })
          .then(async (response) => {
            if (response.status == 200){
              await localStorage.setItem('token', 'logado')
              location.href="/my-space/clientes"
            } else
              return response.json()
          })
          .then((data) => {
            console.log(data)
            toast.error('Mensagem personalizada', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
          })
      }

    return (
        <>
            {/* Posicionamento do ToastContainer ajustado para não sobrepor elementos importantes */}
            <ToastContainer 
                className="text-sm"
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastClassName="bg-castanho_rosado text-white font-semibold text-lg shadow-lg rounded-lg p-3"
                bodyClassName="text-base font-amsterdam"
                progressClassName="bg-[#F5E9E2]"
            />
            
            <header className="bg-tostado_claro w-full flex items-center px-8 py-1 shadow-lg absolute">
                <div className="w-20 h-20 mr-4">
                    <img src={logo} alt="logo" className="object-contain w-full h-full" />
                </div>
                <h1 className="text-2xl font-bold font-amsterdam text-castanho_rosado">
                    Espaço Therapias
                </h1>
                <div className='ms-auto'>
                    <nav className="flex gap-4">
                        <a href="/" className="text-castanho_rosado text-xl border-b-2 border-castanho_rosado flex flex-row items-center gap-1 md:gap-2 hover:text-castanho_rosado hover:font-bold hover:border-castanho_rosado">
                            <i className="fa-solid fa-chevron-left text-sm"></i>
                            <p className='text-sm'>Voltar</p>
                        </a>
                    </nav>
                </div>
            </header>
            
            <main className="bg-[#D4B8A3] w-full h-screen flex flex-col justify-center" onClick={() => setInputSelected('')}>
                <div className="">
                    <h1 className="font-dancing text-castanho_rosado text-7xl text-center w-full">Login</h1>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Usuário"
                        value={user}
                        className={`w-4/5 md:w-2/5 h-8 bg-[#F5E9E2] m-auto block mt-10 rounded-full px-2 outline-none border-2 ${inputSelected === 'u' ? 'scale-105' : ''} border-castanho_rosado`}
                        onChange={(e) => setUser(e.target.value)}
                        onClick={(e) => {
                            e.stopPropagation();
                            setInputSelected('u');
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        className={`w-4/5 md:w-2/5 h-8 bg-[#F5E9E2] m-auto block mt-5 rounded-full px-2 outline-none border-2 ${inputSelected === 'p' ? 'scale-105' : ''} border-castanho_rosado`}
                        onChange={(e) => setPassword(e.target.value)}
                        onClick={(e) => {
                            e.stopPropagation();
                            setInputSelected('p');
                        }}
                    />
                </div>
                <div>
                    <button className="bg-castanho_rosado text-white w-2/5 h-8 m-auto block mt-5 rounded-full" onClick={() => verifyLogin()}>Entrar</button>
                </div>
            </main>
        </>
    );
}
