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
    "imagen": "https://www.kayak.com.co/rimg/himg/4e/18/14/leonardo-641376-156130337-447716.jpg?width=836&height=607&crop=true",
    "latitud": 10.9639,
    "longitud": -74.7964,
    "descripcion": "Apartamento moderno en Barranquilla con excelente ubicación."
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
    "imagen": "https://img.freepik.com/fotos-premium/casa-esta-listada-15-millones_1023984-32412.jpg",
    "latitud": 4.7110,
    "longitud": -74.0721,
    "descripcion": "Casa acogedora en Bogotá, cerca de zonas comerciales."
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
    "imagen": "https://pic.le-cdn.com/thumbs/520x390/152/1/properties/Property-84100842d807095fdcd2036ca6a1eb19-131095878.jpg",
    "latitud": 3.2630,
    "longitud": -76.5377,
    "descripcion": "Apartamento amplio en Jamundí con parqueadero privado."
  },
  {
    "id": 4,
    "ciudad": "Rionegro",
    "nombre": "Alejandría",
    "categoria": "Casa",
    "precio_actual": 190000000,
    "precio_anterior": 240000000,
    "area": "54m²",
    "habitaciones": 2,
    "baños": 2,
    "parqueaderos": 1,
    "imagen": "https://s3.amazonaws.com/cdn.contex.com.co/wp-content/uploads/2023/10/Vayu%CC%81h_Casas_Rionegro_Fachada_2.jpg",
    "latitud": 6.1532,
    "longitud": -75.3740,
    "descripcion": "Casa en Rionegro con diseño moderno y buenos acabados."
  },
  {
    "id": 5,
    "ciudad": "Medellín",
    "nombre": "Terreno Campestre",
    "categoria": "Lote",
    "precio_actual": 150000000,
    "precio_anterior": 180000000,
    "area": "120m²",
    "habitaciones": 0,
    "baños": 0,
    "parqueaderos": 0,
    "imagen": "https://img.resemmedia.com/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1iYWNrZW5kLWIyYi1pbWFnZXMiLCJrZXkiOiJpbmdlc3Rlci8wMTk3NjczYS1hNmQ2LTc3NmYtOGJhOS04ZWI1ZjE5ZDAyNzAvYzBmMTMyOGYyODY2MTcxMzQwNGRhMWZlNjg0MWRmMWYzMWY4MzczZTdjMjk4MWU1OTMzMjNkYzgxNTJkNmQyNy5qcGVnIiwiYnJhbmQiOiJyZXNlbSIsImVkaXRzIjp7InJvdGF0ZSI6bnVsbCwicmVzaXplIjp7IndpZHRoIjozNTQsImhlaWdodCI6MjQwLCJmaXQiOiJjb3ZlciJ9fX0=",
    "descripcion": "Terreno amplio en Medellín con vista a las montañas."
  },
  {
    "id": 6,
    "ciudad": "Cali",
    "nombre": "Lote Las Palmas",
    "categoria": "Lote",
    "precio_actual": 210000000,
    "precio_anterior": 260000000,
    "area": "200m²",
    "habitaciones": 0,
    "baños": 0,
    "parqueaderos": 0,
    "imagen": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    "descripcion": "Lote urbano en Cali ubicado en una zona residencial tranquila."
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

function Card({ item, onSelect }) {
  const discount = percentDiscount(item.precio_anterior, item.precio_actual);
  return (
    <article className="card" onClick={() => onSelect(item)}>
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
        <div className="row small">
          🛏 {item.habitaciones} · 🚿 {item.baños} · 🚗 {item.parqueaderos}
        </div>
      </div>
      <div className="card-footer">
        <div className="small">ID: {item.id}</div>
        {item.latitud && item.longitud && (
          <div className="small">Lat: {item.latitud.toFixed(2)}, Lon: {item.longitud.toFixed(2)}</div>
        )}
      </div>
    </article>
  );
}

function App() {
  const [query, setQuery] = React.useState('');
  const [filter, setFilter] = React.useState('Todos');
  const [selected, setSelected] = React.useState(null);

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
          {filtered.map(item => <Card item={item} key={item.id} onSelect={setSelected} />)}
        </section>
      )}

      {/* Modal */}
      {selected && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelected(null)}>&times;</span>
            <h2>{selected.nombre} - {selected.ciudad}</h2>
            <img src={selected.imagen} alt={selected.nombre} />
            <p><strong>Categoría:</strong> {selected.categoria}</p>
            <p><strong>Área:</strong> {selected.area}</p>
            <p><strong>Habitaciones:</strong> {selected.habitaciones}</p>
            <p><strong>Baños:</strong> {selected.baños}</p>
            <p><strong>Parqueaderos:</strong> {selected.parqueaderos}</p>
            <p><strong>Precio actual:</strong> {currency(selected.precio_actual)}</p>
            <p><strong>Descripción:</strong> {selected.descripcion || "Sin descripción"}</p>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
