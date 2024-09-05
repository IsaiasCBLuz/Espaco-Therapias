import logo from '../../../assets/logo-removebg-preview.png';

export function Agendamento() {
  return (
    <>
        <header className="bg-tostado_claro w-full flex items-center px-8 py-4 fixed shadow-lg">
            <div className="w-36 h-36 mr-4">
              <img src={logo} alt="logo" className="object-contain w-full h-full" />
            </div>
            <h1 className="text-4xl font-bold font-amsterdam text-creme">
              Espaço Therapias Multidimensional
            </h1>
            <div className='ms-auto'>
              <nav className="flex gap-4">
                <a href="#PrimeiraImpressao" className="text-creme text-xl underline hover:text-castanho_rosado hover:font-bold">Início</a>
                <a href="#Sobre" className="text-creme text-xl underline hover:text-castanho_rosado hover:font-bold">Sobre</a>
                <a href="#Servicos" className="text-creme text-xl underline hover:text-castanho_rosado hover:font-bold">Serviços</a>
                <a href="#Agenda" className="text-creme text-xl underline hover:text-castanho_rosado hover:font-bold">Agenda</a>
                <a href="#Avaliacoes" className="text-creme text-xl underline hover:text-castanho_rosado hover:font-bold">Avaliações</a>
              </nav>
            </div>
        </header>

        <main className='w-full bg-creme'>

        </main>
    </>
  );
}