import { Building2, ArrowDown } from 'lucide-react';
import { Button } from './ui/button';

interface HeroProps {
  onExplore: () => void;
}

export function Hero({ onExplore }: HeroProps) {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1639663742190-1b3dba2eebcf?w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-4 rounded-2xl inline-block mb-6 shadow-xl shadow-amber-500/30">
          <Building2 className="w-16 h-16 text-white" />
        </div>

        <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Dynasty 8
        </h1>
        
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent mb-6">
          <p className="text-2xl md:text-3xl font-bold">
            L'agence immobilière de référence
          </p>
        </div>

        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Découvrez les meilleures propriétés du serveur NewWave.<br />
          Maisons, appartements, bureaux et bien plus encore.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={onExplore}
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold px-8 py-6 text-lg shadow-xl shadow-amber-500/30"
          >
            Explorer le catalogue
            <ArrowDown className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <p className="text-4xl font-bold text-amber-500 mb-2">100+</p>
            <p className="text-slate-300">Propriétés</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <p className="text-4xl font-bold text-amber-500 mb-2">24/7</p>
            <p className="text-slate-300">Support</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <p className="text-4xl font-bold text-amber-500 mb-2">5★</p>
            <p className="text-slate-300">Satisfaction</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-8 h-8 text-amber-500" />
      </div>
    </div>
  );
}
