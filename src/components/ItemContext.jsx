// ItemContext.jsx
import { createContext, useState, useContext } from 'react';

const ItemContext = createContext();

export function ItemProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://reachifybackend.azurewebsites.net/api/items/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch items');
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (newItem) => {
    try {
      const response = await fetch('http://reachifybackend.azurewebsites.net/api/items/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newItem)
      });
      if (!response.ok) throw new Error('Failed to add item');
      fetchItems();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const response = await fetch(`http://reachifybackend.azurewebsites.net/api/items/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to delete item');
      fetchItems();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setItems([]);
  };

  return (
    <ItemContext.Provider value={{
      items,
      loading,
      error,
      isLoggedIn,
      setIsLoggedIn,
      handleAddItem,
      handleDeleteItem,
      handleLogout,
      fetchItems
    }}>
      {children}
    </ItemContext.Provider>
  );
}

// Custom hook to use the ItemContext
export function useItems() {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemProvider');
  }
  return context;
}

export default ItemContext;