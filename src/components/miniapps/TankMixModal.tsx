import React, { useState } from 'react';
import { X, FlaskRound as Flask, Plus, Trash2, Save, Share, AlertTriangle } from 'lucide-react';

interface TankMixModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Product {
  id: string;
  name: string;
  rate: number;
  unit: string;
}

export function TankMixModal({ isOpen, onClose }: TankMixModalProps) {
  const [field, setField] = useState('NW14 - Spring Wheat (160 acres)');
  const [tankSize, setTankSize] = useState(1200);
  const [waterVolume, setWaterVolume] = useState(10);
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Roundup WeatherMax', rate: 0.67, unit: 'L/acre' },
    { id: '2', name: 'Heat LQ', rate: 35, unit: 'mL/acre' }
  ]);

  const addProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: '',
      rate: 0,
      unit: 'L/acre'
    };
    setProducts([...products, newProduct]);
  };

  const removeProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const updateProduct = (id: string, field: keyof Product, value: string | number) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  // Calculations
  const acres = 160; // Extract from field selection
  const totalWater = acres * waterVolume;
  const fillsNeeded = totalWater / tankSize;
  
  const calculateProductAmount = (rate: number, unit: string) => {
    const ratePerAcre = unit.includes('mL') ? rate / 1000 : rate; // Convert mL to L
    return (ratePerAcre * acres / fillsNeeded).toFixed(1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-sm">
              <Flask className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Tank Mix Calculator</h2>
              <p className="text-sm text-gray-500">Quick and accurate mixing calculations</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Field Selection */}
          <div className="bg-gray-50 rounded-xl p-4">
            <label className="text-sm font-semibold text-gray-700 mb-3 block">Field</label>
            <select 
              value={field}
              onChange={(e) => setField(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            >
              <option>NW14 - Spring Wheat (160 acres)</option>
              <option>SW22 - Canola (240 acres)</option>
              <option>Custom acres...</option>
            </select>
          </div>

          {/* Tank Size */}
          <div className="bg-gray-50 rounded-xl p-4">
            <label className="text-sm font-semibold text-gray-700 mb-3 block">Tank Size</label>
            <div className="flex gap-3">
              <input 
                type="number" 
                value={tankSize}
                onChange={(e) => setTankSize(Number(e.target.value))}
                className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />
              <select className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all">
                <option>US Gallons</option>
                <option>Liters</option>
              </select>
            </div>
          </div>

          {/* Water Volume */}
          <div className="bg-gray-50 rounded-xl p-4">
            <label className="text-sm font-semibold text-gray-700 mb-3 block">Water Volume</label>
            <div className="flex gap-3 items-center">
              <input 
                type="number" 
                value={waterVolume}
                onChange={(e) => setWaterVolume(Number(e.target.value))}
                className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />
              <span className="text-gray-600 font-medium">gal/acre</span>
            </div>
          </div>

          {/* Products */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-semibold text-gray-700">Products</label>
              <button 
                onClick={addProduct}
                className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>

            <div className="space-y-3">
              {products.map((product) => (
                <div key={product.id} className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <input 
                      type="text" 
                      placeholder="Product name"
                      value={product.name}
                      onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                      className="font-medium text-sm flex-1 mr-3 p-2 border border-gray-200 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    />
                    <button 
                      onClick={() => removeProduct(product.id)}
                      className="text-red-500 hover:text-red-700 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex gap-3">
                    <input 
                      type="number" 
                      value={product.rate}
                      onChange={(e) => updateProduct(product.id, 'rate', Number(e.target.value))}
                      className="flex-1 p-2 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    />
                    <select 
                      value={product.unit}
                      onChange={(e) => updateProduct(product.id, 'unit', e.target.value)}
                      className="p-2 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    >
                      <option>L/acre</option>
                      <option>mL/acre</option>
                      <option>oz/acre</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compatibility Warning */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-amber-900 mb-1">Compatibility Note</div>
                <div className="text-sm text-amber-700">Always add Heat LQ to water first, then add glyphosate</div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-xl p-6 shadow-lg">
            <div className="text-emerald-100 text-sm mb-4">For {acres} acres with {tankSize} gal tank:</div>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <div className="text-emerald-200 text-xs mb-1">Fills Needed</div>
                <div className="text-3xl font-bold">{fillsNeeded.toFixed(2)} tanks</div>
              </div>
              <div>
                <div className="text-emerald-200 text-xs mb-1">Total Water</div>
                <div className="text-3xl font-bold">{totalWater.toLocaleString()} gal</div>
              </div>
            </div>
            <div className="border-t border-emerald-500 pt-4">
              <div className="text-white font-semibold mb-3">Per Tank:</div>
              <div className="space-y-2">
                {products.map((product) => (
                  <div key={product.id} className="flex justify-between items-center">
                    <span className="text-emerald-100">{product.name}:</span>
                    <span className="font-mono font-bold text-lg">
                      {calculateProductAmount(product.rate, product.unit)} L
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-2 border-t border-emerald-500">
                  <span className="text-emerald-100">Water:</span>
                  <span className="font-mono font-bold text-lg">
                    {(tankSize - products.reduce((sum, p) => sum + Number(calculateProductAmount(p.rate, p.unit)), 0)).toFixed(1)} L
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
              <Save className="w-4 h-4" />
              Save to Notes
            </button>
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2">
              <Share className="w-4 h-4" />
              Share
            </button>
          </div>

          {/* Recent Mixes */}
          <div className="pt-6 border-t border-gray-100">
            <div className="text-sm font-semibold text-gray-700 mb-4">Recent Mixes</div>
            <div className="space-y-2">
              {[
                { name: 'Pre-burn Canola', products: 'Glyphosate + Heat + Merge' },
                { name: 'In-crop Wheat', products: 'Infinity + Paradigm' }
              ].map((mix, index) => (
                <button 
                  key={index}
                  className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{mix.name}</div>
                      <div className="text-xs text-gray-500">{mix.products}</div>
                    </div>
                    <div className="text-gray-400 group-hover:text-gray-600 transition-colors">→</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}