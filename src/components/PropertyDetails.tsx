import { X, MapPin, DollarSign, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PropertyDetailsProps {
  property: any;
  onClose: () => void;
  onAddToCart: (property: any) => void;
  isInCart: boolean;
}

export function PropertyDetails({ property, onClose, onAddToCart, isInCart }: PropertyDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = property.images || ['https://images.unsplash.com/photo-1639663742190-1b3dba2eebcf?w=1200'];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 rounded-2xl max-w-5xl w-full my-8 border border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">{property.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image Gallery */}
          <div className="relative mb-6 rounded-xl overflow-hidden">
            <ImageWithFallback
              src={images[currentImageIndex]}
              alt={property.name}
              className="w-full h-96 object-cover"
            />
            
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'bg-amber-500 w-8'
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="flex gap-2">
                <Badge className="bg-amber-500 text-white">
                  {property.saleType === 'vente' ? 'À Vendre' : 'À Louer'}
                </Badge>
                <Badge className="bg-slate-800 text-white">
                  {property.category}
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-5 h-5" />
                <span>NewWave Server</span>
              </div>

              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-6 h-6 text-amber-500" />
                  <span className="text-3xl font-bold text-white">
                    ${property.price.toLocaleString()}
                  </span>
                  {property.saleType === 'location' && (
                    <span className="text-slate-400">/mois</span>
                  )}
                </div>
              </div>

              {property.description && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                  <p className="text-slate-300 leading-relaxed">{property.description}</p>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Additional Info */}
              {property.additionalInfo && Object.keys(property.additionalInfo).length > 0 && (
                <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-3">Informations</h3>
                  <div className="space-y-2">
                    {property.additionalInfo.garage && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Places de garage:</span>
                        <span className="text-white font-medium">{property.additionalInfo.garage}</span>
                      </div>
                    )}
                    {property.additionalInfo.stockage && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Capacité de stockage:</span>
                        <span className="text-white font-medium">{property.additionalInfo.stockage}</span>
                      </div>
                    )}
                    {property.additionalInfo.chambres && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Chambres:</span>
                        <span className="text-white font-medium">{property.additionalInfo.chambres}</span>
                      </div>
                    )}
                    {property.additionalInfo.sallesDeBain && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Salles de bain:</span>
                        <span className="text-white font-medium">{property.additionalInfo.sallesDeBain}</span>
                      </div>
                    )}
                    {property.additionalInfo.superficie && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Superficie:</span>
                        <span className="text-white font-medium">{property.additionalInfo.superficie} m²</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Intéressé ?</h3>
                <Button
                  onClick={() => onAddToCart(property)}
                  disabled={isInCart}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold text-lg py-6 disabled:opacity-50"
                >
                  {isInCart ? (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Déjà dans le panier
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Ajouter au panier
                    </>
                  )}
                </Button>
                <p className="text-sm text-slate-400 mt-3 text-center">
                  Ajoutez au panier et passez votre commande
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
