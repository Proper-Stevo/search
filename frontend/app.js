import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { ContactCard } from './ContactCard';
import { ContactSearchService } from './ContactSearchService';

// Search Bar Component (live search)
const SearchBar = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        onSearch(query.trim());
      }
    }, 500); // adjust debounce delay as needed

    return () => clearTimeout(delayDebounce);
  }, [query, onSearch]);

  return (
    <div className="mb-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search contacts by name, company, email, or any other details..."
          className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm placeholder-gray-500"
          disabled={loading}
        />
      </div>
    </div>
  );
};

// Loading Component
const LoadingCard = () => (
  <div className="bg-white rounded-xl shadow-lg p-6 mb-4 border border-gray-100 animate-pulse">
    <div className="flex items-start space-x-4 mb-6">
      <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
      <div className="flex-1 space-y-2">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-4/5"></div>
    </div>
  </div>
);

// Empty State Component
const EmptyState = ({ hasSearched, searchQuery }) => (
  <div className="text-center py-12">
    <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
      <Search className="w-12 h-12 text-gray-400" />
    </div>
    {hasSearched ? (
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
        <p className="text-gray-500">
          No contacts match "{searchQuery}". Try a different search term.
        </p>
      </div>
    ) : (
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Search for contacts</h3>
        <p className="text-gray-500">
          Use the search bar above to find contacts using vector similarity search.
        </p>
      </div>
    )}
  </div>
);

// Main App Component
const App = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  const searchService = new ContactSearchService();

  const handleSearch = async (query) => {
    setLoading(true);
    setError('');
    setSearchQuery(query);
    setHasSearched(true);

    const result = await searchService.searchContacts(query);

    if (result.ok) {
      setContacts(result.data.contacts || []);
    } else {
      setError(result.error || 'Search failed');
      setContacts([]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Contact Search
          </h1>
          <p className="text-gray-600">
            Find contacts using intelligent vector search
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} loading={loading} />

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Search Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        <div className="space-y-4">
          {loading ? (
            <>
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </>
          ) : contacts.length > 0 ? (
            <>
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Found {contacts.length} contact{contacts.length !== 1 ? 's' : ''} for "{searchQuery}"
                </p>
              </div>
              {contacts.map((contact, index) => (
                <ContactCard key={contact.id || index} contact={contact} />
              ))}
            </>
          ) : (
            <EmptyState hasSearched={hasSearched} searchQuery={searchQuery} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
