"use client";
import React, { useState, useEffect } from 'react';

const AdvancedWinePage = () => {
  const [currentPage, setCurrentPage] = useState('cover'); // 'cover' | 'letter' | 'flower'
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [butterflies, setButterflies] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Detectar si es dispositivo móvil
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Función para crear mariposas
    const createButterfly = (x, y) => {
      const id = Math.random().toString(36);
      const butterfly = {
        id,
        x: x || Math.random() * window.innerWidth,
        y: y || Math.random() * window.innerHeight,
        emoji: ['🦋', '🦋', '🦋', '🦋'][Math.floor(Math.random() * 4)],
        duration: 2000 + Math.random() * 1000,
        delay: Math.random() * 500
      };
      
      setButterflies(prev => [...prev, butterfly]);
      
      setTimeout(() => {
        setButterflies(prev => prev.filter(b => b.id !== id));
      }, butterfly.duration + butterfly.delay);
    };
    
    if (isMobile) {
      // En móvil: mariposas aparecen titilando automáticamente
      const mobileInterval = setInterval(() => {
        createButterfly();
      }, 1500 + Math.random() * 1000);
      
      return () => {
        clearInterval(mobileInterval);
        window.removeEventListener('resize', checkMobile);
      };
    } else {
      // En desktop: mariposas aparecen con el movimiento del mouse
      const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        
        // Crear mariposa ocasionalmente al mover el mouse
        if (Math.random() < 0.05) { // 5% de probabilidad
          createButterfly(e.clientX + (Math.random() - 0.5) * 100, e.clientY + (Math.random() - 0.5) * 100);
        }
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, [isMobile]);

  const CoverPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-purple-900 flex items-center justify-center p-4">
      {/* Fondo de carta básico */}
      <div className="relative max-w-lg w-full">
        <div className="bg-gradient-to-br from-amber-50 to-yellow-100 p-16 rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-500 relative">
          {/* Textura de papel */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-100/30 to-yellow-200/20 rounded-lg"></div>
          
          {/* Manchas decorativas */}
          <div className="absolute top-6 right-10 w-8 h-8 bg-amber-200/40 rounded-full"></div>
          <div className="absolute bottom-8 left-8 w-5 h-5 bg-yellow-300/30 rounded-full"></div>
          
          <div className="relative z-10 text-center space-y-12">
            <div className="space-y-6">
              <div className="text-6xl mb-4">💌</div>
              <h1 className="text-3xl font-serif text-amber-900 font-bold">Para mi Querida Danna</h1>
              <p className="text-lg text-amber-800 font-serif leading-relaxed">
                Una sorpresa te espera al abrir esta carta...
              </p>
            </div>
            
            {/* Botón saltando con relieve */}
            <div className="flex justify-center">
              <button
                onClick={() => setCurrentPage('flower')}
                className="group relative px-12 py-6 bg-gradient-to-b from-red-500 to-red-700 text-white font-bold text-xl rounded-full shadow-2xl animate-bounce hover:animate-none transform hover:scale-110 transition-all duration-300"
                style={{
                  filter: 'drop-shadow(0 15px 25px rgba(185, 28, 28, 0.4))',
                  boxShadow: 'inset 0 -6px 0 0 rgba(0,0,0,0.2), 0 12px 30px rgba(185, 28, 28, 0.5)'
                }}
              >
                <span className="relative z-10">¡ÁBREME!</span>
                <div className="absolute inset-0 bg-gradient-to-b from-red-400 to-red-600 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
          
          {/* Sello decorativo */}
          <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xs transform rotate-12 shadow-xl">
            ESPECIAL
          </div>
        </div>
        
        {/* Sombra de la carta */}
        <div className="absolute inset-0 bg-amber-900/20 rounded-lg transform rotate-1 -z-10 blur-sm"></div>
      </div>
    </div>
  );

  const LetterPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-purple-900 flex items-center justify-center p-4">
      {/* Fondo de papel vintage */}
      <div className="relative max-w-2xl w-full">
        {/* Carta con efecto papel */}
        <div className="bg-gradient-to-br from-amber-50 to-yellow-100 p-12 rounded-lg shadow-2xl transform rotate-1 hover:rotate-0 transition-all duration-500 relative">
          {/* Textura de papel */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-100/30 to-yellow-200/20 rounded-lg"></div>
          
          {/* Manchas de café decorativas */}
          <div className="absolute top-4 right-8 w-6 h-6 bg-amber-200/40 rounded-full"></div>
          <div className="absolute bottom-12 left-6 w-4 h-4 bg-yellow-300/30 rounded-full"></div>
          
          <div className="relative z-10 space-y-6 text-center">
            <h2 className="text-4xl font-serif text-amber-900 mb-8">Querida Danna</h2>
            
            <p className="text-lg text-amber-800 leading-relaxed font-serif">
              Has encontrado algo especial. Esta carta contiene la llave hacia un jardín secreto 
              donde las flores cobran vida y los sueños se hacen realidad.
            </p>
            
            <p className="text-base text-amber-700 font-serif italic">
              ¿Estás listo para descubrir lo que te espera?
            </p>
            
            {/* Botón saltando */}
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setCurrentPage('flower')}
                className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-full shadow-xl animate-bounce hover:animate-none transform hover:scale-110 transition-all duration-300"
                style={{
                  filter: 'drop-shadow(0 10px 20px rgba(185, 28, 28, 0.3))',
                  boxShadow: 'inset 0 -4px 0 0 rgba(0,0,0,0.2), 0 8px 25px rgba(185, 28, 28, 0.4)'
                }}
              >
                <span className="relative z-10 text-xl">¡ÁBREME!</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
          
          {/* Sello decorativo */}
          <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xs transform rotate-12 shadow-lg">
            MÁGICO
          </div>
        </div>
        
        {/* Sombra de la carta */}
        <div className="absolute inset-0 bg-amber-900/20 rounded-lg transform rotate-2 -z-10 blur-sm"></div>
      </div>
    </div>
  );

  const FlowerPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50/80 via-yellow-50/70 to-pink-50/80 relative overflow-hidden">
      {/* Fondo de campo borroso con colores pastel */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/60 via-lime-100/50 to-green-100/60"></div>
      
      {/* Elementos de campo borrosos */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Colinas suaves */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-green-200/40 to-transparent rounded-t-full blur-sm"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-32 bg-gradient-to-t from-emerald-200/30 to-transparent rounded-t-full blur-md"></div>
        
        {/* Hierba borrosa */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-green-300/20 blur-sm"
            style={{
              width: `${4 + Math.random() * 6}px`,
              height: `${20 + Math.random() * 30}px`,
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 40}%`,
              borderRadius: '50px 50px 0 0',
              transform: `rotate(${-10 + Math.random() * 20}deg)`
            }}
          />
        ))}
        
        {/* Flores pequeñas borrosas en el fondo */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full blur-sm animate-pulse"
            style={{
              backgroundColor: ['#fecaca', '#fed7d7', '#fde68a', '#d8b4fe'][Math.floor(Math.random() * 4)],
              left: `${Math.random() * 100}%`,
              bottom: `${10 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      {/* Cielo con nubes más suaves */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-sky-100/50 to-transparent">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`absolute bg-white/40 rounded-full animate-pulse blur-sm`}
            style={{
              width: `${60 + Math.random() * 40}px`,
              height: `${30 + Math.random() * 20}px`,
              left: `${20 + Math.random() * 60}%`,
              top: `${10 + Math.random() * 30}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-5xl">
          {/* Flor amarilla animada */}
          <div className="relative">
            {/* Tallo */}
            <div className="absolute bottom-0 left-1/2 w-3 h-32 bg-green-500 transform -translate-x-1/2 rounded-b-full shadow-lg"></div>
            
            {/* Hojas */}
            <div className="absolute bottom-16 left-1/4 w-8 h-12 bg-green-400 rounded-full transform -rotate-45 animate-pulse shadow-md"></div>
            <div className="absolute bottom-20 right-1/4 w-6 h-10 bg-green-400 rounded-full transform rotate-45 animate-pulse shadow-md"></div>
            
            {/* Flor */}
            <div className="relative w-64 h-64 animate-spin-slow">
              {/* Pétalos */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-16 h-32 bg-gradient-to-t from-yellow-300 to-yellow-100 rounded-full shadow-xl"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: '50% 100%',
                    transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
              
              {/* Centro de la flor */}
              <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-inner">
                <div className="w-full h-full bg-gradient-to-br from-yellow-300/50 to-transparent rounded-full"></div>
              </div>
            </div>
            
            {/* Efectos de brillo */}
            <div className="absolute top-8 left-8 w-4 h-4 bg-white/60 rounded-full animate-ping"></div>
            <div className="absolute top-16 right-12 w-2 h-2 bg-yellow-200 rounded-full animate-pulse"></div>
          </div>
          
          {/* Carta mini flotante - ajustada al contenido */}
          <div className="relative animate-float">
            <div className="w-64 h-48 bg-gradient-to-br from-red-50 to-pink-100 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300 p-6">
              <div className="space-y-4 h-full flex flex-col justify-center">
                <div className="text-center">
                  <div className="text-3xl mb-3">💌</div>
                  <h3 className="text-lg font-serif text-red-800 font-semibold">Mensaje Secreto</h3>
                </div>
                <p className="text-sm text-red-600 font-serif leading-relaxed text-center">
                  Esta flor es para una niña demasiado especial a la cual quiero demasiado y siempre tendrá un lugar especial en mi corazón
                </p>
              </div>
              
              {/* Brillo mágico */}
              <div className="absolute -top-1 -left-1 w-full h-full bg-gradient-to-r from-pink-200/30 to-yellow-200/30 rounded-lg blur-sm -z-10 animate-pulse"></div>
            </div>
            
            {/* Partículas mágicas alrededor de la carta */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-pink-400 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Botón de regreso */}
        <button
          onClick={() => setCurrentPage('cover')}
          className="absolute top-8 left-8 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 z-20"
        >
          ← Volver al Inicio
        </button>
        
        {/* Mariposas decorativas */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute text-xl animate-bounce opacity-60"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            🦋
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative">
      {currentPage === 'cover' && <CoverPage />}
      {currentPage === 'letter' && <LetterPage />}
      {currentPage === 'flower' && <FlowerPage />}
      
      {/* Mariposas dinámicas */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {butterflies.map((butterfly) => (
          <div
            key={butterfly.id}
            className="absolute text-2xl animate-butterfly opacity-0"
            style={{
              left: butterfly.x - 12,
              top: butterfly.y - 12,
              animationDuration: `${butterfly.duration}ms`,
              animationDelay: `${butterfly.delay}ms`,
              animationFillMode: 'forwards'
            }}
          >
            {butterfly.emoji}
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes butterfly {
          0% {
            opacity: 0;
            transform: translateY(0px) scale(0.5);
          }
          10% {
            opacity: 1;
            transform: translateY(-10px) scale(1) rotate(5deg);
          }
          25% {
            transform: translateY(-25px) translateX(15px) scale(1.1) rotate(-5deg);
          }
          50% {
            transform: translateY(-40px) translateX(-10px) scale(1) rotate(8deg);
          }
          75% {
            transform: translateY(-55px) translateX(20px) scale(0.9) rotate(-3deg);
          }
          90% {
            opacity: 1;
            transform: translateY(-70px) translateX(-5px) scale(0.7) rotate(2deg);
          }
          100% {
            opacity: 0;
            transform: translateY(-90px) translateX(10px) scale(0.3) rotate(-5deg);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-butterfly {
          animation: butterfly 2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AdvancedWinePage;