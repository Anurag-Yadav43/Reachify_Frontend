function ItemList({ items, onDelete }) {
  return (
    <div className="item-grid">
      {items.map(item => (
        <div key={item.id} className="item-card">
          <h3 className="item-name">{item.name}</h3>
          <p className="item-description">{item.description}</p>
          <button 
            onClick={() => onDelete(item.id)}
            className="delete-button"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default ItemList
