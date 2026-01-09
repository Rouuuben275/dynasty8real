import { Building2, ShoppingCart, LogOut, User, LayoutDashboard } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface NavbarProps {
  user: any;
  onLogin: () => void;
  onLogout: () => void;
  cartCount: number;
  onCartClick: () => void;
  onHomeClick: () => void;
  onAdminClick: () => void;
}

export function Navbar({ user, onLogin, onLogout, cartCount, onCartClick, onHomeClick, onAdminClick }: NavbarProps) {
  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={onHomeClick}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2 rounded-lg">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-white tracking-tight">Dynasty 8</h1>
              <p className="text-xs text-amber-400">NewWave Server</p>
            </div>
          </button>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {user.hasAdminRole && (
                  <Button
                    onClick={onAdminClick}
                    variant="outline"
                    className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                )}
                
                <button
                  onClick={onCartClick}
                  className="relative p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <ShoppingCart className="w-6 h-6 text-white" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-amber-500 text-white">
                      {cartCount}
                    </Badge>
                  )}
                </button>

                <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-lg">
                  {user.avatar ? (
                    <img
                      src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                      alt={user.username}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <User className="w-8 h-8 text-white" />
                  )}
                  <div className="text-left">
                    <p className="text-sm font-medium text-white">{user.username}</p>
                    {user.hasAdminRole && (
                      <p className="text-xs text-amber-400">Admin</p>
                    )}
                  </div>
                </div>

                <Button
                  onClick={onLogout}
                  variant="ghost"
                  className="text-white hover:bg-slate-700"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </Button>
              </>
            ) : (
              <Button
                onClick={onLogin}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold px-6"
              >
                <User className="w-4 h-4 mr-2" />
                Connexion Discord
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
