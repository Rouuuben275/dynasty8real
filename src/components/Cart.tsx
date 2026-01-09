import { X, Trash2, ShoppingBag, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartProps {
  items: any[];
  onClose: () => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: (orderData: any) => void;
  user: any;
}

export function Cart({ items, onClose, onRemoveItem, onCheckout, user }: CartProps) {
  const [orderForm, setOrderForm] = useState({
    customerName: '',
    phoneNumber: '',
    message: '',
  });

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckout({
      ...orderForm,
      items,
      total,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 rounded-2xl max-w-4xl w-full my-8 border border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-amber-500" />
            <h2 className="text-2xl font-bold text-white">Mon Panier</h2>
            {items.length > 0 && (
              <span className="bg-amber-500 text-white text-sm px-2 py-1 rounded-full">
                {items.length}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-xl text-slate-400 mb-2">Votre panier est vide</p>
              <p className="text-sm text-slate-500 mb-6">
                Parcourez notre catalogue et ajoutez des propriétés !
              </p>
              <Button
                onClick={onClose}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
              >
                Voir le catalogue
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left: Cart Items */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Articles ({items.length})</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex gap-4"
                    >
                      <ImageWithFallback
                        src={item.images?.[0] || 'https://images.unsplash.com/photo-1639663742190-1b3dba2eebcf?w=200'}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">{item.name}</h4>
                        <p className="text-sm text-slate-400 mb-2">{item.category}</p>
                        <p className="text-lg font-bold text-amber-500">
                          ${item.price.toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-2 hover:bg-slate-700 rounded-lg transition-colors h-fit"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-white">Total</span>
                    <span className="text-2xl font-bold text-amber-500">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Order Form */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Finaliser la commande</h3>
                
                {!user ? (
                  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
                    <p className="text-slate-300 mb-4">
                      Vous devez être connecté avec Discord pour passer commande
                    </p>
                    <Button
                      onClick={onClose}
                      className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                    >
                      Se connecter
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                      <p className="text-sm text-slate-400 mb-2">Compte Discord</p>
                      <div className="flex items-center gap-3">
                        {user.avatar && (
                          <img
                            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                            alt={user.username}
                            className="w-10 h-10 rounded-full"
                          />
                        )}
                        <span className="text-white font-medium">{user.username}</span>
                      </div>
                    </div>

                    <div>
                      <Label className="text-white">Nom & Prénom RP *</Label>
                      <Input
                        required
                        value={orderForm.customerName}
                        onChange={(e) => setOrderForm({ ...orderForm, customerName: e.target.value })}
                        className="bg-slate-800 border-slate-700 text-white"
                        placeholder="Ex: Jean Dupont"
                      />
                    </div>

                    <div>
                      <Label className="text-white">Numéro de téléphone en jeu *</Label>
                      <Input
                        required
                        value={orderForm.phoneNumber}
                        onChange={(e) => setOrderForm({ ...orderForm, phoneNumber: e.target.value })}
                        className="bg-slate-800 border-slate-700 text-white"
                        placeholder="Ex: 555-0123"
                      />
                    </div>

                    <div>
                      <Label className="text-white">Message / Demandes spéciales</Label>
                      <Textarea
                        value={orderForm.message}
                        onChange={(e) => setOrderForm({ ...orderForm, message: e.target.value })}
                        className="bg-slate-800 border-slate-700 text-white min-h-24"
                        placeholder="Ajoutez des informations supplémentaires..."
                      />
                    </div>

                    <div className="bg-blue-900/20 border border-blue-700 rounded-xl p-4">
                      <p className="text-sm text-blue-300">
                        <strong>Important :</strong> Un salon Discord privé sera créé automatiquement 
                        pour votre commande. Vous pourrez discuter directement avec notre équipe.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      disabled={!orderForm.customerName || !orderForm.phoneNumber}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-6 text-lg disabled:opacity-50"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Passer la commande
                    </Button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
