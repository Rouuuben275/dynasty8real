import { X, Plus, Trash2, Edit, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AdminPanelProps {
  onClose: () => void;
  onAddProperty: () => void;
  properties: any[];
  orders: any[];
  onDeleteProperty: (id: string) => void;
  onUpdateOrderStatus: (orderId: string, status: string) => void;
}

export function AdminPanel({
  onClose,
  onAddProperty,
  properties,
  orders,
  onDeleteProperty,
  onUpdateOrderStatus,
}: AdminPanelProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'processing':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'processing':
        return 'En cours';
      case 'completed':
        return 'Terminée';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 rounded-2xl max-w-6xl w-full my-8 border border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2 rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Panel Admin</h2>
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
          <Tabs defaultValue="properties" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-800">
              <TabsTrigger value="properties" className="data-[state=active]:bg-amber-500">
                Propriétés ({properties.length})
              </TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:bg-amber-500">
                Commandes ({orders.length})
              </TabsTrigger>
            </TabsList>

            {/* Properties Tab */}
            <TabsContent value="properties" className="mt-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-white">Gérer les propriétés</h3>
                <Button
                  onClick={onAddProperty}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter une propriété
                </Button>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {properties.length === 0 ? (
                  <div className="text-center py-12 bg-slate-800 rounded-xl border border-slate-700">
                    <p className="text-slate-400">Aucune propriété pour le moment</p>
                  </div>
                ) : (
                  properties.map((property) => (
                    <div
                      key={property.id}
                      className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex gap-4"
                    >
                      <ImageWithFallback
                        src={property.images?.[0] || 'https://images.unsplash.com/photo-1639663742190-1b3dba2eebcf?w=200'}
                        alt={property.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-white mb-1">{property.name}</h4>
                            <div className="flex gap-2 mb-2">
                              <Badge className="bg-slate-700 text-white text-xs">
                                {property.category}
                              </Badge>
                              <Badge className="bg-amber-500 text-white text-xs">
                                {property.saleType === 'vente' ? 'Vente' : 'Location'}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => onDeleteProperty(property.id)}
                              variant="outline"
                              size="sm"
                              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-lg font-bold text-amber-500">
                          ${property.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="mt-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white">Gérer les commandes</h3>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {orders.length === 0 ? (
                  <div className="text-center py-12 bg-slate-800 rounded-xl border border-slate-700">
                    <p className="text-slate-400">Aucune commande pour le moment</p>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-slate-800 rounded-xl p-5 border border-slate-700"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-white">
                              Commande #{order.id.substring(0, 8)}
                            </h4>
                            <Badge className={`${getStatusColor(order.status)} text-white`}>
                              {getStatusLabel(order.status)}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-400">
                            Client: {order.customerName} ({order.username})
                          </p>
                          <p className="text-sm text-slate-400">
                            Téléphone: {order.phoneNumber}
                          </p>
                          {order.discordChannelId && (
                            <p className="text-sm text-blue-400 mt-1">
                              🔗 Salon Discord créé
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-amber-500">
                            ${order.total.toLocaleString()}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="bg-slate-900 rounded-lg p-3 mb-3">
                        <p className="text-sm font-semibold text-white mb-2">Propriétés:</p>
                        <div className="space-y-1">
                          {order.items.map((item: any, idx: number) => (
                            <div key={idx} className="text-sm text-slate-300 flex justify-between">
                              <span>• {item.name}</span>
                              <span className="text-amber-400">${item.price.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Message */}
                      {order.message && (
                        <div className="bg-slate-900 rounded-lg p-3 mb-3">
                          <p className="text-sm font-semibold text-white mb-1">Message:</p>
                          <p className="text-sm text-slate-300">{order.message}</p>
                        </div>
                      )}

                      {/* Status Actions */}
                      <div className="flex gap-2 flex-wrap">
                        <Button
                          onClick={() => onUpdateOrderStatus(order.id, 'processing')}
                          disabled={order.status === 'processing'}
                          size="sm"
                          className="bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
                        >
                          En cours
                        </Button>
                        <Button
                          onClick={() => onUpdateOrderStatus(order.id, 'completed')}
                          disabled={order.status === 'completed'}
                          size="sm"
                          className="bg-green-500 hover:bg-green-600 text-white disabled:opacity-50"
                        >
                          Terminée
                        </Button>
                        <Button
                          onClick={() => onUpdateOrderStatus(order.id, 'cancelled')}
                          disabled={order.status === 'cancelled'}
                          size="sm"
                          variant="outline"
                          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white disabled:opacity-50"
                        >
                          Annuler
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
