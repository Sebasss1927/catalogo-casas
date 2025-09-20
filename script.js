
// Datos de las propiedades
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
        "parqueaderos": 1
    },
    {
        "id": 2,
        "ciudad": "Lima",
        "nombre": "Las Palmeras",
        "categoria": "Casa",
        "precio_actual": 520000000,
        "precio_anterior": 600000000,
        "area": "150m²",
        "habitaciones": 4,
        "baños": 3,
        "parqueaderos": 2
    },
    {
        "id": 3,
        "ciudad": "Bogotá",
        "nombre": "Torre Central",
        "categoria": "Apartamento",
        "precio_actual": 450000000,
        "precio_anterior": 480000000,
        "area": "95m²",
        "habitaciones": 3,
        "baños": 2,
        "parqueaderos": 1
    }
];

// Elementos del DOM
const container = document.getElementById('propertyContainer');
const modal = document.getElementById('propertyModal');
const closeModal = document.querySelector('.close-modal');

// Elementos dentro del modal
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalArea = document.getElementById('modalArea');
const modalRooms = document.getElementById('modalRooms');
const modalPrice = document.getElementById('modalPrice');

// Crear tarjetas de propiedad
DATA.forEach(prop => {
    const card = document.createElement('div');
    card.className = 'property-card';
    card.innerHTML = `
        <h2>${prop.nombre} - ${prop.ciudad}</h2>
        <p class="categoria">Categoría: ${prop.categoria}</p>
        <p>Área: ${prop.area}</p>
        <p>Habitaciones: ${prop.habitaciones} | Baños: ${prop.baños} | Parqueaderos: ${prop.parqueaderos}</p>
        <p class="price">S/ ${prop.precio_actual.toLocaleString()} 
            <span class="price-old">S/ ${prop.precio_anterior.toLocaleString()}</span>
        </p>
    `;

    // Abrir modal al hacer clic
    card.addEventListener('click', () => {
        modalTitle.textContent = `${prop.nombre} - ${prop.ciudad}`;
        modalCategory.textContent = `Categoría: ${prop.categoria}`;
        modalArea.textContent = `Área: ${prop.area}`;
        modalRooms.textContent = `Habitaciones: ${prop.habitaciones} | Baños: ${prop.baños} | Parqueaderos: ${prop.parqueaderos}`;
        modalPrice.textContent = `Precio actual: S/ ${prop.precio_actual.toLocaleString()} | Anterior: S/ ${prop.precio_anterior.toLocaleString()}`;
        modal.classList.add('show');
    });

    container.appendChild(card);
});

// Cerrar modal al hacer clic en la X
closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
});

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});
