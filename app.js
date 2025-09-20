const DATA = [
  {
    "id": 1,
    "ciudad": "Barranquilla",
    "nombre": "Macarol",
    "categoria": "Apartamento",
    "precio_actual": 321100000,
    "precio_anterior": 435141509,
    "area": "80m²",
    "habitaciones": 3,
    "baños": 2,
    "parqueaderos": 1,
    "imagen": "https://via.placeholder.com/600x400?text=Casa+Barranquilla",
    "latitud": 10.9639,
    "longitud": -74.7964
  },
  {
    "id": 2,
    "ciudad": "Bogotá",
    "nombre": "Pinar de la Fontana",
    "categoria": "Casa",
    "precio_actual": 255000000,
    "precio_anterior": 315000000,
    "area": "58m²",
    "habitaciones": 2,
    "baños": 2,
    "parqueaderos": 0,
    "imagen": "https://via.placeholder.com/600x400?text=Casa+Bogota",
    "latitud": 4.7110,
    "longitud": -74.0721
  },
  {
    "id": 3,
    "ciudad": "Jamundí",
    "nombre": "Tangara",
    "categoria": "Apartamento",
    "precio_actual": 350000000,
    "precio_anterior": 400000000,
    "area": "100m²",
    "habitaciones": 2,
    "baños": 2,
    "parqueaderos": 1,
    "imagen": "https://via.placeholder.com/600x400?text=Casa+Jamundi",
    "latitud": 3.2630,
    "longitud": -76.5377
  },
  {
    "id": 4,
    "ciudad": "Rionegro",
    "nombre": "Alejandría",
    "categoria": "Lote",
    "precio_actual": 190000000,
    "precio_anterior": 240000000,
    "area": "54m²",
    "habitaciones": 2,
    "baños": 2,
    "parqueaderos": 1,
    "imagen": "https://via.placeholder.com/600x400?text=Casa+Rionegro",
    "latitud": 6.1532,
    "longitud": -75.3740
  }
];

function currency(num) {
  return num.toLocaleString('es-PE', { style: 'currency', currency: 'PEN', maximumFractionDigits: 0 });
}

function percentDiscount(oldp, newp) {
  if (!oldp) return null;
  const p = Math.round((1 - newp / oldp) * 100);
  return p > 0 ? p + '%' : null;
}

function Card({ item }) {
  const discount = percentDiscount(item.precio_anterior, item.precio_actual);
  return (
    <article className="card">
      <img className="card-img" src={item.imagen} alt={item.nombre} loading="lazy" />
      <div className="card-body">
        <div className="row">
          <div>
            <div className="title">{item.nombre}</div>
            <div className="meta">{item.ciudad} · {item.categoria}</div>
          </div>
          <div className="badge">{item.area}</div>
        </div>
        <div className="row">
          <div className="price-current">{currency(item.precio_actual)}</div>
          <div className="meta">
            <span className="price-old">{currency(item.precio_anterior)}</span>
            {discount && <span className="discount">{discount}</span>}
          </div>
        </div>
        <div className="row">
          <div className="small">🛏 {item.habitaciones} · 🚿 {item.baños} · 🚗 {item.parqueaderos}</div>
          <button className="btn" onClick={() => window.open(`#detalle-${item.id}`)}>Ver</button>
        </div>
      </div>
      <div className="card-footer">
        <div className="small">ID: {item.id}</div>
        <div className="small">Lat: {item.latitud.toFixed(2)}, Lon: {item.longitud.toFixed(2)}</div>
      </div>
    </article>
  );
}

function App() {
  const [query, setQuery] = React.useState('');
  const [filter, setFilter] = React.useState('Todos');

  const categories = React.useMemo(() => {
    const set = new Set(DATA.map(d => d.categoria));
    return ['Todos', ...Array.from(set)];
  }, []);

  const filtered = React.useMemo(() => {
    return DATA.filter(d => {
      const matchCat = filter === 'Todos' ? true : d.categoria === filter;
      const q = query.trim().toLowerCase();
      const matchQuery = !q || d.nombre.toLowerCase().includes(q) || d.ciudad.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [query, filter]);

  return (
    <div>
      <div className="app-controls">
        <input
          className="search-input"
          placeholder="Buscar por nombre o ciudad..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <div className="filter-btns">
          {categories.map(cat => (
            <button
              key={cat}
              className={"btn " + (filter === cat ? 'active' : '')}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      {filtered.length === 0 ? (
        <div className="empty">No se encontraron propiedades — prueba otro filtro o búsqueda.</div>
      ) : (
        <section className="catalog-grid">
          {filtered.map(item => <Card item={item} key={item.id} />)}
        </section>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
