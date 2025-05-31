// productos.js

async function obtenerProductos() {
  try {
    const response = await fetch("./productos.json");
    if (!response.ok) throw new Error("Error al cargar los productos");
    const productos = await response.json();
    return productos;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function renderizarProductosPorCategoria(
  productos,
  categoria,
  containerSelector
) {
  const contenedor = document.querySelector(containerSelector);

  // Aquí accedes directamente a productos.hogar, productos.electronica, etc.
  const productosCategoria = productos[categoria];

  if (!productosCategoria) {
    contenedor.innerHTML =
      "<p>No hay productos disponibles en esta categoría.</p>";
    return;
  }

  productosCategoria.forEach((producto) => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";
    col.innerHTML = `
        <div class="card h-100">
          <img src="${producto.imagen}" class="card-img-top" style="height: 300px; object-fit: cover" alt="${
      producto.titulo
    }" />
          <div class="card-body d-flex flex-column justify-content-between">
            <h5 class="card-title">${producto.titulo}</h5>
            <p class="card-text">${producto.descripcion}</p>

            <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="text-danger  fw-bold">$${producto.precio.toLocaleString()}</span>
            </div>
            <div>
            <button onclick="cambiarCantidad(${
              producto.id
            }, -1)" class="btn btn-outline-secondary">-</button>
            <span id="cantidad-${producto.id}" class="mx-2">0</span>
            <button onclick="cambiarCantidad(${
              producto.id
            }, 1)" class="btn btn-outline-secondary">+</button>
            </div>
            </div>
            <button class="btn btn-danger mt-2">Agregar al carrito</button>
          </div>
        </div>
        `;
    contenedor.appendChild(col);
  });
}

function renderizarAll(productos, containerSelector) {
    const contenedor = document.querySelector(containerSelector);
    contenedor.innerHTML = ""; // Limpia el contenedor antes de renderizar
  
    for (const categoria in productos) {
      if (productos.hasOwnProperty(categoria)) {
        // Tomamos solo los primeros 2 productos de cada categoría
        const productosCategoria = productos[categoria].slice(0, 2);
  
        productosCategoria.forEach((producto) => {
          const col = document.createElement("div");
          col.className = "col-md-4 mb-4";
  
          col.innerHTML = `
            <div class="card h-100">
              <img src="${producto.imagen}" style="height: 300px; object-fit: cover" class="card-img-top " alt="${producto.titulo}" />
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
    }
  }
  