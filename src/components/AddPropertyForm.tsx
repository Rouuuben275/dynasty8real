import { useState } from 'react';
import { X, Plus, Trash2, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface AddPropertyFormProps {
  onClose: () => void;
  onSubmit: (property: any) => void;
  categories: string[];
  onAddCategory: (category: string) => void;
}

export function AddPropertyForm({ onClose, onSubmit, categories, onAddCategory }: AddPropertyFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    saleType: 'vente',
    category: '',
    description: '',
    images: [''],
  });

  const [additionalInfo, setAdditionalInfo] = useState<any>({});
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ''],
    }));
  };

  const updateImage = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim());
      updateFormData('category', newCategory.trim());
      setNewCategory('');
      setShowAddCategory(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const property = {
      name: formData.name,
      price: parseFloat(formData.price),
      saleType: formData.saleType,
      category: formData.category,
      description: formData.description,
      images: formData.images.filter((img) => img.trim() !== ''),
      additionalInfo,
    };

    onSubmit(property);
  };

  // Dynamic fields based on category
  const renderAdditionalFields = () => {
    switch (formData.category) {
      case 'Garages':
        return (
          <div>
            <Label className="text-white">Nombre de places</Label>
            <Input
              type="number"
              value={additionalInfo.garage || ''}
              onChange={(e) => setAdditionalInfo({ ...additionalInfo, garage: e.target.value })}
              className="bg-slate-900 border-slate-700 text-white"
              placeholder="Ex: 2"
            />
          </div>
        );

      case 'Entrepôts':
        return (
          <div>
            <Label className="text-white">Capacité de stockage</Label>
            <Input
              value={additionalInfo.stockage || ''}
              onChange={(e) => setAdditionalInfo({ ...additionalInfo, stockage: e.target.value })}
              className="bg-slate-900 border-slate-700 text-white"
              placeholder="Ex: 1000 unités"
            />
          </div>
        );

      case 'Appartements':
      case 'Appartements luxueux':
      case 'Maisons modernes':
        return (
          <>
            <div>
              <Label className="text-white">Nombre de chambres</Label>
              <Input
                type="number"
                value={additionalInfo.chambres || ''}
                onChange={(e) => setAdditionalInfo({ ...additionalInfo, chambres: e.target.value })}
                className="bg-slate-900 border-slate-700 text-white"
                placeholder="Ex: 3"
              />
            </div>
            <div>
              <Label className="text-white">Nombre de salles de bain</Label>
              <Input
                type="number"
                value={additionalInfo.sallesDeBain || ''}
                onChange={(e) => setAdditionalInfo({ ...additionalInfo, sallesDeBain: e.target.value })}
                className="bg-slate-900 border-slate-700 text-white"
                placeholder="Ex: 2"
              />
            </div>
            <div>
              <Label className="text-white">Superficie (m²)</Label>
              <Input
                type="number"
                value={additionalInfo.superficie || ''}
                onChange={(e) => setAdditionalInfo({ ...additionalInfo, superficie: e.target.value })}
                className="bg-slate-900 border-slate-700 text-white"
                placeholder="Ex: 120"
              />
            </div>
          </>
        );

      case 'Bureaux':
        return (
          <>
            <div>
              <Label className="text-white">Superficie (m²)</Label>
              <Input
                type="number"
                value={additionalInfo.superficie || ''}
                onChange={(e) => setAdditionalInfo({ ...additionalInfo, superficie: e.target.value })}
                className="bg-slate-900 border-slate-700 text-white"
                placeholder="Ex: 250"
              />
            </div>
            <div>
              <Label className="text-white">Nombre de bureaux</Label>
              <Input
                type="number"
                value={additionalInfo.bureaux || ''}
                onChange={(e) => setAdditionalInfo({ ...additionalInfo, bureaux: e.target.value })}
                className="bg-slate-900 border-slate-700 text-white"
                placeholder="Ex: 5"
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 rounded-2xl max-w-3xl w-full my-8 border border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">Ajouter une propriété</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name */}
          <div>
            <Label className="text-white">Nom de la propriété *</Label>
            <Input
              required
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
              className="bg-slate-900 border-slate-700 text-white"
              placeholder="Ex: Villa moderne avec vue sur la mer"
            />
          </div>

          {/* Price & Sale Type */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white">Prix ($) *</Label>
              <Input
                required
                type="number"
                value={formData.price}
                onChange={(e) => updateFormData('price', e.target.value)}
                className="bg-slate-900 border-slate-700 text-white"
                placeholder="Ex: 250000"
              />
            </div>
            <div>
              <Label className="text-white">Type de vente *</Label>
              <Select value={formData.saleType} onValueChange={(value) => updateFormData('saleType', value)}>
                <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vente">Vente</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category */}
          <div>
            <Label className="text-white">Catégorie *</Label>
            {!showAddCategory ? (
              <div className="flex gap-2">
                <Select value={formData.category} onValueChange={(value) => updateFormData('category', value)}>
                  <SelectTrigger className="bg-slate-900 border-slate-700 text-white flex-1">
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  onClick={() => setShowAddCategory(true)}
                  variant="outline"
                  className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="bg-slate-900 border-slate-700 text-white flex-1"
                  placeholder="Nouvelle catégorie"
                />
                <Button
                  type="button"
                  onClick={handleAddCategory}
                  className="bg-amber-500 hover:bg-amber-600"
                >
                  Ajouter
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowAddCategory(false)}
                  variant="outline"
                >
                  Annuler
                </Button>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <Label className="text-white">Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => updateFormData('description', e.target.value)}
              className="bg-slate-900 border-slate-700 text-white min-h-24"
              placeholder="Décrivez la propriété..."
            />
          </div>

          {/* Additional Info based on category */}
          {formData.category && (
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 space-y-4">
              <h3 className="text-lg font-semibold text-white">Informations spécifiques</h3>
              {renderAdditionalFields()}
            </div>
          )}

          {/* Images */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-white">Photos (URLs)</Label>
              <Button
                type="button"
                onClick={addImageField}
                size="sm"
                variant="outline"
                className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une photo
              </Button>
            </div>
            <div className="space-y-2">
              {formData.images.map((image, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={image}
                    onChange={(e) => updateImage(index, e.target.value)}
                    className="bg-slate-900 border-slate-700 text-white flex-1"
                    placeholder="https://exemple.com/image.jpg"
                  />
                  {formData.images.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeImage(index)}
                      variant="outline"
                      size="icon"
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-400 mt-2">
              Vous pouvez utiliser des URLs d'images hébergées (Imgur, Unsplash, etc.)
            </p>
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-6"
            >
              <Upload className="w-5 h-5 mr-2" />
              Ajouter la propriété
            </Button>
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="px-8"
            >
              Annuler
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
