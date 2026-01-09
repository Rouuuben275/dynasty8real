import { MapPin, DollarSign, Home, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PropertyCardProps {
  property: any;
  onClick: () => void;
}

export function PropertyCard({ property, onClick }: PropertyCardProps) {
  return (
    <div className="group bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-amber-500 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/20">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <ImageWithFallback
          src={property.images?.[0] || 'https://images.unsplash.com/photo-1639663742190-1b3dba2eebcf?w=800'}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-amber-500 text-white">
            {property.saleType === 'vente' ? 'À Vendre' : 'À Louer'}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge className="bg-slate-900/80 text-white backdrop-blur-sm">
            {property.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
          {property.name}
        </h3>
        
        <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
          <MapPin className="w-4 h-4" />
          <span>NewWave Server</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="w-5 h-5 text-amber-500" />
          <span className="text-2xl font-bold text-white">
            ${property.price.toLocaleString()}
          </span>
          {property.saleType === 'location' && (
            <span className="text-slate-400 text-sm">/mois</span>
          )}
        </div>

        {/* Additional Info */}
        {property.additionalInfo && (
          <div className="flex flex-wrap gap-2 mb-4">
            {property.additionalInfo.garage && (
              <Badge variant="outline" className="border-slate-600 text-slate-300">
                {property.additionalInfo.garage} places
              </Badge>
            )}
            {property.additionalInfo.stockage && (
              <Badge variant="outline" className="border-slate-600 text-slate-300">
                Stockage: {property.additionalInfo.stockage}
              </Badge>
            )}
          </div>
        )}

        {/* CTA */}
        <Button
          onClick={onClick}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white group"
        >
          <span>Voir les détails</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
