const productosHogar = [
    {
      id: 1,
      titulo: "Sillón Relax",
      descripcion: "Sillón reclinable ideal para descansar después del trabajo.",
      precio: 120000,
      imagen: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7"
    },
    {
      id: 2,
      titulo: "Lámpara de Pie",
      descripcion: "Moderna lámpara para darle estilo a tu sala.",
      precio: 44000,
      imagen: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7"
    },
    {
      id: 3,
      titulo: "Mesa Ratona",
      descripcion: "Mesa baja de madera natural para tu living.",
      precio: 280000,
      imagen: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7"
    }
  ];
  
  // Renderiza las cards en el contenedor
  function renderizarProductosHogar() {
    const contenedor = document.querySelector(".row.mt-4"); // es tu contenedor actual
  
    productosHogar.forEach(producto => {
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
              <span class="text-danger  fw-bold">$${producto.precio.toLocaleString()}</span>
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
  