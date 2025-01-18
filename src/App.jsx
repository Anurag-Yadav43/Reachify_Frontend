



import { useState, useEffect } from 'react'
import ItemList from './components/ItemList'
import AddItemForm from './components/AddItemForm'
import Login from './components/Login'
import './App.css'

function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))

  const fetchItems = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/api/items/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (!response.ok) throw new Error('Failed to fetch items')
      const data = await response.json()
      setItems(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      fetchItems()
    }
  }, [isLoggedIn])

  const handleAddItem = async (newItem) => {
    try {
      const response = await fetch('http://localhost:8000/api/items/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newItem)
      })
      if (!response.ok) throw new Error('Failed to add item')
      fetchItems()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDeleteItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/items/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (!response.ok) throw new Error('Failed to delete item')
      fetchItems()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setItems([])
  }

  if (!isLoggedIn) {
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />
  }

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <div className="item-container">
          <div className="item-header">
            <h1 className="item-title">Item Manager</h1>
            <button 
              onClick={handleLogout}
              className="delete-button"
            >
              Logout
            </button>
          </div>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <div className="content-container">
            <AddItemForm onAdd={handleAddItem} />
            {loading ? (
              <div className="loading-message">
                Loading...
              </div>
            ) : (
              <ItemList items={items} onDelete={handleDeleteItem} />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App