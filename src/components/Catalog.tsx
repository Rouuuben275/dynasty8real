import { useState, useMemo } from 'react';
import { PropertyCard } from './PropertyCard';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';

interface CatalogProps {
  properties: any[];
  categories: string[];
  onPropertyClick: (property: any) => void;
}

export function Catalog({ properties, categories, onPropertyClick }: CatalogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSaleType, setSelectedSaleType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Search filter
      const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === 'all' || property.category === selectedCategory;

      // Sale type filter
      const matchesSaleType = selectedSaleType === 'all' || property.saleType === selectedSaleType;

      // Price range filter
      let matchesPrice = true;
      if (priceRange !== 'all') {
        const price = property.price;
        switch (priceRange) {
          case '0-50000':
            matchesPrice = price < 50000;
            break;
          case '50000-100000':
            matchesPrice = price >= 50000 && price < 100000;
            break;
          case '100000-250000':
            matchesPrice = price >= 100000 && price < 250000;
            break;
          case '250000-500000':
            matchesPrice = price >= 250000 && price < 500000;
            break;
          case '500000+':
            matchesPrice = price >= 500000;
            break;
        }
      }

      return matchesSearch && matchesCategory && matchesSaleType && matchesPrice;
    });
  }, [properties, searchTerm, selectedCategory, selectedSaleType, priceRange]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedSaleType('all');
    setPriceRange('all');
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <SlidersHorizontal className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl font-bold text-white">Filtres</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher une propriété..."
              className="pl-10 bg-slate-900 border-slate-700 text-white"
            />
          </div>

          {/* Category */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sale Type */}
          <Select value={selectedSaleType} onValueChange={setSelectedSaleType}>
            <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="vente">Vente</SelectItem>
              <SelectItem value="location">Location</SelectItem>
            </SelectContent>
          </Select>

          {/* Price Range */}
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
              <SelectValue placeholder="Prix" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les prix</SelectItem>
              <SelectItem value="0-50000">Moins de $50,000</SelectItem>
              <SelectItem value="50000-100000">$50,000 - $100,000</SelectItem>
              <SelectItem value="100000-250000">$100,000 - $250,000</SelectItem>
              <SelectItem value="250000-500000">$250,000 - $500,000</SelectItem>
              <SelectItem value="500000+">Plus de $500,000</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(searchTerm || selectedCategory !== 'all' || selectedSaleType !== 'all' || priceRange !== 'all') && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-slate-400">
              {filteredProperties.length} propriété{filteredProperties.length > 1 ? 's' : ''} trouvée{filteredProperties.length > 1 ? 's' : ''}
            </p>
            <Button
              onClick={resetFilters}
              variant="ghost"
              size="sm"
              className="text-amber-500 hover:text-amber-400"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>

      {/* Properties Grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={() => onPropertyClick(property)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="bg-slate-800 rounded-xl p-12 border border-slate-700">
            <p className="text-xl text-slate-400 mb-2">Aucune propriété trouvée</p>
            <p className="text-sm text-slate-500">Essayez de modifier vos filtres</p>
          </div>
        </div>
      )}
    </div>
  );
}
