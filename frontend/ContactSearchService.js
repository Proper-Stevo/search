// ContactSearchService.js

export class ContactSearchService {
  async searchContacts(query) {
    try {
      const response = await fetch(`http://localhost:5001/contacts?search=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || 'Server error');
      }

      const data = await response.json();
      return { ok: true, data };
    } catch (error) {
      console.error('Error during contact search:', error.message);
      return { ok: false, error: error.message };
    }
  }
}
