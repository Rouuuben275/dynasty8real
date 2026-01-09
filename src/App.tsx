import { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { PropertyDetails } from './components/PropertyDetails';
import { AddPropertyForm } from './components/AddPropertyForm';
import { Cart } from './components/Cart';
import { AdminPanel } from './components/AdminPanel';
import { Toaster, toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from './utils/supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-51abf09d`;

const DISCORD_CLIENT_ID = '1459197358347911262';
const DISCORD_GUILD_ID = '1459195760150319290';

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [properties, setProperties] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const catalogRef = useRef<HTMLDivElement>(null);

  // Load session from localStorage
  useEffect(() => {
    const storedSessionId = localStorage.getItem('dynasty8_session');
    if (storedSessionId) {
      loadSession(storedSessionId);
    } else {
      setLoading(false);
    }

    // Check for Discord OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      handleDiscordCallback(code);
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Load properties and categories
  useEffect(() => {
    loadProperties();
    loadCategories();
  }, []);

  // Load orders if admin
  useEffect(() => {
    if (user?.hasAdminRole) {
      loadOrders();
    }
  }, [user]);

  const loadSession = async (sessionId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/session/${sessionId}`, {
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setSessionId(sessionId);
      } else {
        localStorage.removeItem('dynasty8_session');
      }
    } catch (error) {
      console.error('Load session error:', error);
      localStorage.removeItem('dynasty8_session');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    const redirectUri = window.location.origin + window.location.pathname;
    const scope = 'identify guilds guilds.members.read';
    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=${encodeURIComponent(scope)}`;
    window.location.href = authUrl;
  };

  const handleDiscordCallback = async (code: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/discord/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Auth callback error:', error);
        toast.error('Erreur lors de la connexion Discord');
        return;
      }

      const data = await response.json();
      setUser(data.user);
      setSessionId(data.sessionId);
      localStorage.setItem('dynasty8_session', data.sessionId);
      toast.success(`Bienvenue, ${data.user.username} !`);
    } catch (error) {
      console.error('Discord callback error:', error);
      toast.error('Erreur lors de la connexion');
    }
  };

  const handleLogout = async () => {
    try {
      if (sessionId) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ sessionId }),
        });
      }

      setUser(null);
      setSessionId(null);
      localStorage.removeItem('dynasty8_session');
      toast.success('Déconnecté avec succès');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const loadProperties = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/properties`, {
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });

      if (response.ok) {
        const data = await response.json();
        setProperties(data);
      }
    } catch (error) {
      console.error('Load properties error:', error);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`, {
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });

      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Load categories error:', error);
    }
  };

  const loadOrders = async () => {
    try {
      if (!sessionId) return;

      const response = await fetch(`${API_BASE_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
          'X-Session-Id': sessionId,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Load orders error:', error);
    }
  };

  const handleAddProperty = async (propertyData: any) => {
    try {
      if (!sessionId) {
        toast.error('Vous devez être connecté');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`,
          'X-Session-Id': sessionId,
        },
        body: JSON.stringify(propertyData),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Add property error:', error);
        toast.error('Erreur lors de l\'ajout de la propriété');
        return;
      }

      const newProperty = await response.json();
      setProperties([...properties, newProperty]);
      setShowAddProperty(false);
      toast.success('Propriété ajoutée avec succès !');
    } catch (error) {
      console.error('Add property error:', error);
      toast.error('Erreur lors de l\'ajout');
    }
  };

  const handleDeleteProperty = async (propertyId: string) => {
    try {
      if (!sessionId) return;

      const response = await fetch(`${API_BASE_URL}/properties/${propertyId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
          'X-Session-Id': sessionId,
        },
      });

      if (response.ok) {
        setProperties(properties.filter((p) => p.id !== propertyId));
        toast.success('Propriété supprimée');
      }
    } catch (error) {
      console.error('Delete property error:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleAddCategory = async (category: string) => {
    try {
      if (!sessionId) return;

      const response = await fetch(`${API_BASE_URL}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`,
          'X-Session-Id': sessionId,
        },
        body: JSON.stringify({ category }),
      });

      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories);
        toast.success('Catégorie ajoutée !');
      }
    } catch (error) {
      console.error('Add category error:', error);
    }
  };

  const handleAddToCart = (property: any) => {
    if (cart.find((item) => item.id === property.id)) {
      toast.info('Cette propriété est déjà dans le panier');
      return;
    }

    setCart([...cart, property]);
    toast.success('Ajouté au panier !');
  };

  const handleRemoveFromCart = (propertyId: string) => {
    setCart(cart.filter((item) => item.id !== propertyId));
    toast.success('Retiré du panier');
  };

  const handleCheckout = async (orderData: any) => {
    try {
      if (!sessionId) {
        toast.error('Vous devez être connecté');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`,
          'X-Session-Id': sessionId,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Checkout error:', error);
        toast.error('Erreur lors de la commande');
        return;
      }

      const order = await response.json();
      setCart([]);
      setShowCart(false);
      
      toast.success('Commande passée avec succès !', {
        description: order.discordChannelId 
          ? 'Un salon Discord privé a été créé pour votre commande.'
          : 'Notre équipe vous contactera bientôt.',
      });
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Erreur lors de la commande');
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      if (!sessionId) return;

      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`,
          'X-Session-Id': sessionId,
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrders(orders.map((o) => (o.id === orderId ? updatedOrder : o)));
        toast.success('Statut mis à jour');
      }
    } catch (error) {
      console.error('Update order status error:', error);
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Toaster position="top-right" richColors />

      <Navbar
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        cartCount={cart.length}
        onCartClick={() => setShowCart(true)}
        onHomeClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onAdminClick={() => setShowAdminPanel(true)}
      />

      <Hero onExplore={scrollToCatalog} />

      <div ref={catalogRef} className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">Catalogue</h2>
          <p className="text-slate-400">Découvrez toutes nos propriétés disponibles</p>
        </div>

        <Catalog
          properties={properties}
          categories={categories}
          onPropertyClick={setSelectedProperty}
        />
      </div>

      {/* Property Details Modal */}
      {selectedProperty && (
        <PropertyDetails
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onAddToCart={handleAddToCart}
          isInCart={cart.some((item) => item.id === selectedProperty.id)}
        />
      )}

      {/* Cart Modal */}
      {showCart && (
        <Cart
          items={cart}
          onClose={() => setShowCart(false)}
          onRemoveItem={handleRemoveFromCart}
          onCheckout={handleCheckout}
          user={user}
        />
      )}

      {/* Add Property Modal */}
      {showAddProperty && (
        <AddPropertyForm
          onClose={() => setShowAddProperty(false)}
          onSubmit={handleAddProperty}
          categories={categories}
          onAddCategory={handleAddCategory}
        />
      )}

      {/* Admin Panel */}
      {showAdminPanel && (
        <AdminPanel
          onClose={() => setShowAdminPanel(false)}
          onAddProperty={() => {
            setShowAdminPanel(false);
            setShowAddProperty(true);
          }}
          properties={properties}
          orders={orders}
          onDeleteProperty={handleDeleteProperty}
          onUpdateOrderStatus={handleUpdateOrderStatus}
        />
      )}

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400">
            © 2026 Dynasty 8 - NewWave Server. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
