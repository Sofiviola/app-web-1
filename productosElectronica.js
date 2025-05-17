const productosElectronica = [
  {
    id: 1,
    titulo: "Smart TV 55\" 4K",
    descripcion: "Televisor inteligente con resolución Ultra HD y acceso a apps.",
    precio: 520000,
    imagen: "https://images.unsplash.com/photo-1587829741301-dc798b83add3"
  },
  {
    id: 2,
    titulo: "Auriculares Inalámbricos",
    descripcion: "Auriculares Bluetooth con cancelación de ruido.",
    precio: 95000,
    imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    titulo: "Laptop Gamer",
    descripcion: "Notebook potente con tarjeta gráfica dedicada y procesador de última generación.",
    precio: 980000,
    imagen: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
  }
];

// Renderiza las cards en el contenedor
function renderizarProductosElectronica() {
  const contenedor = document.querySelector(".row.mt-4"); // es tu contenedor actual

  productosElectronica.forEach(producto => {
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
