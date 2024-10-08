import logo from '../../assets/logo-removebg-preview.png';

export default function MySpaceNavbar() {
    return (
        <header className="bg-tostado_claro w-full flex items-center px-6 py-0 fixed shadow-lg z-10">
            <div className="w-20 h-20 mr-3">
              <img src={logo} alt="logo" className="object-contain w-full h-full" />
            </div>
            <h1 className="text-xl font-bold font-amsterdam text-castanho_rosado stroke-creme">
              Espaço Therapias
            </h1>
            <div className='ms-auto'>
              <nav className="flex gap-4">
                  <a href='/my-space/clientes' className="text-castanho_rosado stroke-creme text-xl border-b-2 border-castanho_rosado flex flex-row items-center gap-2 hover:text-castanho_rosado hover:border-castanho_rosado hover:font-bold">
                      <i className="fa-solid fa-people-group text-lg"></i>
                      <p className='text-sm'>Meus Cliente</p>
                  </a>
                  <a href='/my-space/agenda' className="text-castanho_rosado stroke-creme text-xl border-b-2 border-castanho_rosado flex flex-row items-center gap-2 hover:text-castanho_rosado hover:border-castanho_rosado hover:font-bold">
                      <i className="fa-solid fa-calendar-days text-lg"></i>
                      <p className='text-sm'>Agenda</p>
                  </a>
                  {/* <a className="text-castanho_rosado stroke-creme text-xl border-b-2 border-castanho_rosado flex flex-row items-center gap-2 hover:text-castanho_rosado hover:border-castanho_rosado hover:font-bold">
                      <div className='flex w-6 h-6 bg-creme rounded-full'></div>
                  </a> */}
                  <a className="text-castanho_rosado stroke-creme text-xl border-b-2 border-castanho_rosado flex flex-row items-center gap-2 hover:text-castanho_rosado hover:border-castanho_rosado hover:font-bold">
                      <i className="fa-solid fa-door-open text-lg"></i>
                      <p className='text-sm'>Logout</p>
                  </a>
              </nav>
            </div>
        </header>
    );
}