import { useState } from 'react'

 function AddItemForm({ onAdd }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd({ name, description })
    setName('')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <input
          type="text"
          placeholder="Item "
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input"
          required
        />
      </div>
      <button 
        type="submit"
        className="submit-button"
      >
        Add Item
      </button>
    </form>
  )
}


export default AddItemForm