async function agregarAlCarrito(id) {
  const productos = await obtenerProductos();
  const cantidadSpan = document.getElementById(`cantidad-${id}`);
  const cantidad = parseInt(cantidadSpan.textContent);

  if (cantidad <= 0) {
    alert("Selecciona al menos una unidad para agregar al carrito.");
    return;
  }

  // Buscar el producto original por id (puede estar en cualquier categoría)
  let productoEncontrado = null;
  for (const categoria in productos) {
    if (productos[categoria]) {
      const producto = productos[categoria].find((p) => p.id === id);
      if (producto) {
        productoEncontrado = producto;
        break;
      }
    }
  }

  if (!productoEncontrado) return alert("Producto no encontrado.");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const index = carrito.findIndex((item) => item.id === id);

  if (index !== -1) {
    carrito[index].cantidad += cantidad;
  } else {
    carrito.push({ ...productoEncontrado, cantidad });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  cantidadSpan.textContent = 0; // Reinicia la cantidad visual
  actualizarCantidadCarrito();

  alert(
    `Se agregaron ${cantidad} unidad(es) de "${productoEncontrado.titulo}" al carrito.`
  );
}

async function obtenerProductos() {
  try {
    const response = await fetch("./productos.json");
    if (!response.ok) throw new Error("Error al cargar los productos");
    const productos = await response.json();
    actualizarCantidadCarrito();
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
          <img src="${
            producto.imagen
          }" class="card-img-top" style="height: 300px; object-fit: cover" alt="${
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
<button class="btn btn-danger mt-2" onclick="agregarAlCarrito(${
      producto.id
    })">Agregar al carrito</button>

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
              <img src="${
                producto.imagen
              }" style="height: 300px; object-fit: cover" class="card-img-top " alt="${
          producto.titulo
        }" />
              <div class="card-body d-flex flex-column justify-content-between">
                <h5 class="card-title">${producto.titulo}</h5>
                <p class="card-text">${producto.descripcion}</p>
  
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="text-danger fw-bold">$${producto.precio.toLocaleString()}</span>
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
                
<button class="btn btn-danger mt-2" onclick="agregarAlCarrito(${
          producto.id
        })">Agregar al carrito</button>

              </div>
            </div>
          `;

        contenedor.appendChild(col);
      });
    }
  }
}

function cambiarCantidad(id, cambio) {
  const cantidadSpan = document.getElementById(`cantidad-${id}`);
  let cantidadActual = parseInt(cantidadSpan.textContent);

  cantidadActual += cambio;
  if (cantidadActual < 0) cantidadActual = 0;

  cantidadSpan.textContent = cantidadActual;
}

function actualizarCantidadCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const cantidadTotal = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  const badge = document.getElementById("carrito-cantidad");
  if (badge) {
    badge.textContent = cantidadTotal;
  }
}
