import React from 'react';
import { User, Phone, Mail, MapPin, Building, Globe, Calendar } from 'lucide-react';

// Contact Card Component
export const ContactCard = ({ contact }) => {
  const {
    name = 'Unknown Contact',
    title = '',
    company = '',
    phone = '',
    email = '',
    address = '',
    website = '',
    avatar = '',
    lastContact = '',
    notes = '',
    tags = []
  } = contact;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 mb-4 border border-gray-100">
      {/* Header Section */}
      <div className="flex items-start space-x-4 mb-6">
        <div className="flex-shrink-0">
          {avatar ? (
            <img 
              src={avatar} 
              alt={name}
              className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-900 truncate">{name}</h3>
          {title && (
            <p className="text-sm text-gray-600 mt-1">{title}</p>
          )}
          {company && (
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <Building className="w-4 h-4 mr-1" />
              <span className="truncate">{company}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Contact Information */}
      <div className="space-y-3">
        {phone && (
          <div className="flex items-center space-x-3 text-sm">
            <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <a href={`tel:${phone}`} className="text-blue-600 hover:text-blue-800 transition-colors">
              {phone}
            </a>
          </div>
        )}
        
        {email && (
          <div className="flex items-center space-x-3 text-sm">
            <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <a href={`mailto:${email}`} className="text-blue-600 hover:text-blue-800 transition-colors truncate">
              {email}
            </a>
          </div>
        )}
        
        {address && (
          <div className="flex items-center space-x-3 text-sm">
            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="text-gray-700">{address}</span>
          </div>
        )}
        
        {website && (
          <div className="flex items-center space-x-3 text-sm">
            <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <a 
              href={website.startsWith('http') ? website : `https://${website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors truncate"
            >
              {website}
            </a>
          </div>
        )}
        
        {lastContact && (
          <div className="flex items-center space-x-3 text-sm">
            <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="text-gray-500">Last contact: {lastContact}</span>
          </div>
        )}
      </div>

      {/* Notes Section */}
      {notes && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 leading-relaxed">{notes}</p>
        </div>
      )}
    </div>
  );
};