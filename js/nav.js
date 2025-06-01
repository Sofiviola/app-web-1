const navItems = [
  { titulo: "Inicio", url: "../index.html" },
  { titulo: "Electrónica", url: "/pages/electronica.html" },
  { titulo: "Hogar", url: "/pages/hogar.html" },
  { titulo: "Ropa", url: "/pages/ropa.html" },
];

function cargarNavLinks() {
  const listaNav = document.getElementById("nav-dinamico");

  navItems.forEach((link) => {
    const li = document.createElement("li");
    li.classList.add("nav-item");

    const a = document.createElement("a");
    a.classList.add("nav-link");
    a.href = link.url;
    a.textContent = link.titulo;

    li.appendChild(a);
    listaNav.appendChild(li);
  });
}
