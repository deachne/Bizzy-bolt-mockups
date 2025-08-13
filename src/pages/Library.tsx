import React, { useState } from 'react';
import { Book, Search, FileText, Image, Video, Download, Eye, Calendar } from 'lucide-react';
import { SmartCard } from '../components/ui/SmartCard';

interface LibraryItem {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'video' | 'document';
  size: string;
  uploadDate: string;
  category: string;
  description?: string;
  thumbnail?: string;
}

export function Library() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const libraryItems: LibraryItem[] = [
    {
      id: '1',
      name: 'JD_9650_Service_Manual.pdf',
      type: 'pdf',
      size: '12.5 MB',
      uploadDate: '2024-01-10',
      category: 'Equipment',
      description: 'Complete service manual for John Deere 9650 combine harvester'
    },
    {
      id: '2',
      name: '2025_Crop_Plan.xlsx',
      type: 'document',
      size: '2.1 MB',
      uploadDate: '2024-01-08',
      category: 'Planning',
      description: 'Detailed crop rotation and planting plan for 2025 season'
    },
    {
      id: '3',
      name: 'Herbicide_Label_Roundup.png',
      type: 'image',
      size: '1.8 MB',
      uploadDate: '2024-01-05',
      category: 'Chemicals',
      description: 'Product label and application instructions for Roundup WeatherMax'
    },
    {
      id: '4',
      name: 'Soil_Test_Results_2024.pdf',
      type: 'pdf',
      size: '3.2 MB',
      uploadDate: '2024-01-03',
      category: 'Soil Health',
      description: 'Complete soil analysis results from A&L Labs for all fields'
    },
    {
      id: '5',
      name: 'Spray_Application_Training.mp4',
      type: 'video',
      size: '45.7 MB',
      uploadDate: '2023-12-28',
      category: 'Training',
      description: 'Best practices for herbicide application and drift management'
    },
    {
      id: '6',
      name: 'Field_Photos_NW14_Aphids.jpg',
      type: 'image',
      size: '4.3 MB',
      uploadDate: '2024-01-15',
      category: 'Scouting',
      description: 'Aphid infestation documentation from NW14 field inspection'
    }
  ];

  const categories = ['all', 'Equipment', 'Planning', 'Chemicals', 'Soil Health', 'Training', 'Scouting'];

  const filteredItems = libraryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
      case 'image': return <Image className="w-5 h-5 text-blue-500" />;
      case 'video': return <Video className="w-5 h-5 text-purple-500" />;
      case 'document': return <FileText className="w-5 h-5 text-emerald-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'bg-red-100 text-red-800';
      case 'image': return 'bg-blue-100 text-blue-800';
      case 'video': return 'bg-purple-100 text-purple-800';
      case 'document': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Book className="w-6 h-6 text-emerald-600" />
          <h1 className="text-2xl font-bold text-gray-900">Library</h1>
        </div>
        <p className="text-gray-600">Organize and access all your farm documents and resources</p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search library..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <SmartCard key={item.id}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {getFileIcon(item.type)}
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${getFileTypeColor(item.type)}`}>
                  {item.type.toUpperCase()}
                </span>
              </div>
              <span className="text-xs text-gray-500">{item.size}</span>
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-2 truncate" title={item.name}>
              {item.name}
            </h3>
            
            {item.description && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
            )}
            
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(item.uploadDate).toLocaleDateString()}
              </div>
              <span className="px-2 py-1 bg-gray-100 rounded-md">{item.category}</span>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm">
                <Eye className="w-4 h-4" />
                View
              </button>
              <button className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </SmartCard>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Book className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
          <p className="text-gray-500 mb-4">
            {searchQuery ? 'Try adjusting your search terms' : 'Upload your first document to get started'}
          </p>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            Upload Document
          </button>
        </div>
      )}
    </div>
  );
}