import bgLogin from '../assets/img/bg-login.svg';

export default function AuthBanner() {
  return (
    <div 
      className="hidden md:flex w-1/2 rounded-[2.5rem] relative overflow-hidden items-end p-16"
      style={{ backgroundImage: `url(${bgLogin})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
    >
      <div className="absolute top-12 left-12 w-12 h-12 border-8 border-white/80 rounded-full"></div>

      <div className="relative z-10 w-full">
        <span className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-lg font-semibold tracking-widest border border-white/30 uppercase">
          Tu Espacio
        </span>
        <h1 className="text-7xl font-bold text-white mt-6 mb-4 leading-tight">
          Todo en un solo<br/>lugar.
        </h1>
        <div className="flex justify-between items-end text-blue-100 text-3xl">
          <p className="max-w-lg drop-shadow-md">
            Un espacio sencillo para organizarte, avanzar y hacer más cada día.
          </p>
        </div>
      </div>
    </div>
  );
}