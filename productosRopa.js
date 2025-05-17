const productosRopa = [
  {
    id: 1,
    titulo: "Campera de Cuero",
    descripcion: "Campera clásica de cuero negro, ideal para un look urbano y elegante.",
    precio: 150000,
    imagen: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246"
  },
  {
    id: 2,
    titulo: "Vestido Floral",
    descripcion: "Vestido liviano con estampado floral, perfecto para primavera y verano.",
    precio: 88000,
    imagen: "https://images.unsplash.com/photo-1503408024948-0a3e1b2b519c?q=80&w=2543&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    titulo: "Zapatillas Urbanas",
    descripcion: "Zapatillas deportivas con diseño moderno y máxima comodidad.",
    precio: 110000,
    imagen: "https://images.unsplash.com/photo-1716347685367-1eb5de72eb65?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

// Renderiza las cards en el contenedor
function renderizarProductosRopa() {
  const contenedor = document.querySelector(".row.mt-4"); // es tu contenedor actual

  productosRopa.forEach(producto => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";

    col.innerHTML = `
      <div class="card h-100">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.titulo}" />
        <div class="card-body d-flex flex-column justify-content-between">
          <h5 class="card-title">${producto.titulo}</h5>
          <p class="card-text">${producto.descripcion}</p>

          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="text-danger fw-bold">$${producto.precio.toLocaleString()}</span>
            </div>
            <div>
              <button onclick="cambiarCantidad(${producto.id}, -1)" class="btn btn-outline-secondary">-</button>
              <span id="cantidad-${producto.id}" class="mx-2">0</span>
              <button onclick="cambiarCantidad(${producto.id}, 1)" class="btn btn-outline-secondary">+</button>
            </div>
          </div>
          <button class="btn btn-danger mt-2">Agregar al carrito</button>
        </div>
      </div>
    `;

    contenedor.appendChild(col);
  });
}

const cantidades = {};
function cambiarCantidad(id, cambio) {
  if (!cantidades[id]) cantidades[id] = 0;
  cantidades[id] += cambio;
  if (cantidades[id] < 0) cantidades[id] = 0;
  document.getElementById(`cantidad-${id}`).textContent = cantidades[id];
}
