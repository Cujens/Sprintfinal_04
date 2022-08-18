// 3. Crear las instancias de las clases utilizando los datos del formulario

document.addEventListener("DOMContentLoaded", () => {
  // Variables
  const baseDeDatos = [
    {
      id: 1,
      nombre: "Altavoz",
      precio: 30,
      imagen: "assets/img/altavoz.jpg",
      favorito: false,
    },
    {
      id: 2,
      nombre: "Celular",
      precio: 300,
      imagen: "assets/img/celular.jpeg",
      favorito: false,
    },
    {
      id: 3,
      nombre: "Computador",
      precio: 500,
      imagen: "assets/img/computador.jpeg",
      favorito: true,
    },
    {
      id: 4,
      nombre: "Teclado",
      precio: 20,
      imagen: "assets/img/teclado.jpg",
      favorito: false,
    },
    {
      id: 5,
      nombre: "Mouse",
      precio: 10,
      imagen: "assets/img/mouse.jpg",
      favorito: false,
    },
    {
      id: 6,
      nombre: "Audífonos",
      precio: 15,
      imagen: "assets/img/audifonos.jpg",
      favorito: false,
    }
  ];
  // 1. Crear el loading, crear una variable que su valor inicial sea ‘false’

  const borrarFiltros = () => {
    DOMitems.innerHTML = "";
    renderizarProductos();
  };
  
  // 2. Usar características de ES6+
  let loader = false;

  let search = document.getElementById("search-input");
  let btnSearch = document.getElementById("search");

  btnSearch.addEventListener("click", buscar);
  let DOMitems = document.querySelector("#items");
  const btn = document.getElementById("btn-borrar");
  let btnFavoritos = document.getElementById("btn-favoritos");
  btnFavoritos.addEventListener("click", mostrarFavoritos);
  btn.addEventListener("click", borrarFiltros);
  let mensaje = document.getElementById("mensaje");

  function mostrarFavoritos() {
    const result = baseDeDatos.filter((item) => {
      return item.favorito;
    });
    console.log(result);
    DOMitems.innerHTML = "";

    renderizarProductos(result);
  }

  function checkForNumbers(value) {
    const r = /^[a-zA-Z ]*$/;
    return r.test(value);
  }

  function buscar() {
    if (search.value.length < 5) {
      mensaje.innerText =
        "la busqueda tiene que tener 5 caracteres cono minimo";
      setTimeout(() => {
        mensaje.innerText = "";
      }, 2000);
      return;
    }

    if (!checkForNumbers(search.value)) {
      mensaje.innerText += "ingrese solo letras";
      setTimeout(() => {
        mensaje.innerText = "";
      }, 2000);
      return;
    }

    const result = baseDeDatos.filter((item) => {
      return (
        item.nombre.toLocaleUpperCase() == search.value.toLocaleUpperCase()
      );
    });
    console.log(result);
    DOMitems.innerHTML = "";
    search.value = "";
    renderizarProductos(result);
  }

  let carrito = [];
  const divisa = "CLP";

  const DOMcarrito = document.querySelector("#carrito");
  const DOMtotal = document.querySelector("#total");
  const DOMbotonVaciar = document.querySelector("#boton-vaciar");

  // Funciones

  /**
   * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
   */
  function renderizarProductos(items = baseDeDatos) {
    items.forEach((info) => {
      // Estructura
      const miNodo = document.createElement("div");
      miNodo.classList.add("card", "col-sm-4");
      // Body
      const miNodoCardBody = document.createElement("div");
      miNodoCardBody.classList.add("card-body");
      // Titulo
      const miNodoTitle = document.createElement("h5");
      miNodoTitle.classList.add("card-title");
      miNodoTitle.textContent = info.nombre;
      // Imagen
      const miNodoImagen = document.createElement("img");
      miNodoImagen.classList.add("img-fluid");
      miNodoImagen.setAttribute("src", info.imagen);
      // Precio
      const miNodoPrecio = document.createElement("p");
      miNodoPrecio.classList.add("card-text");
      miNodoPrecio.textContent = `${info.precio}${divisa}`;
      // Boton
      const miNodoBoton = document.createElement("button");
      miNodoBoton.classList.add("btn", "btn-primary");
      miNodoBoton.textContent = "+";
      miNodoBoton.setAttribute("marcador", info.id);
      miNodoBoton.addEventListener("click", anyadirProductoAlCarrito);
      // Insertamos
      miNodoCardBody.appendChild(miNodoImagen);
      miNodoCardBody.appendChild(miNodoTitle);
      miNodoCardBody.appendChild(miNodoPrecio);
      miNodoCardBody.appendChild(miNodoBoton);
      miNodo.appendChild(miNodoCardBody);
      DOMitems.appendChild(miNodo);
    });
  }

  /**
   * Evento para añadir un producto al carrito de la compra
   */
  function anyadirProductoAlCarrito(evento) {
    // Anyadimos el Nodo a nuestro carrito
    carrito.push(evento.target.getAttribute("marcador"));
    // Actualizamos el carrito
    renderizarCarrito();
  }

  /**
   * Dibuja todos los productos guardados en el carrito
   */
  function renderizarCarrito() {
    // Vaciamos todo el html
    DOMcarrito.textContent = "";
    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
      // Obtenemos el item que necesitamos de la variable base de datos
      const miItem = baseDeDatos.filter((itemBaseDatos) => {
        // ¿Coincide las id? Solo puede existir un caso
        return itemBaseDatos.id === parseInt(item);
      });
      // Cuenta el número de veces que se repite el producto
      const numeroUnidadesItem = carrito.reduce((total, itemId) => {
        // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
        return itemId === item ? (total += 1) : total;
      }, 0);
      // Creamos el nodo del item del carrito
      const miNodo = document.createElement("li");
      miNodo.classList.add("list-group-item", "text-right", "mx-2");
      miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
      // Boton de borrar
      const miBoton = document.createElement("button");
      miBoton.classList.add("btn", "btn-danger", "mx-5");
      miBoton.textContent = "X";
      miBoton.style.marginLeft = "1rem";
      miBoton.dataset.item = item;
      miBoton.addEventListener("click", borrarItemCarrito);
      // Mezclamos nodos
      miNodo.appendChild(miBoton);
      DOMcarrito.appendChild(miNodo);
    });
    // Renderizamos el precio total en el HTML
    DOMtotal.textContent = calcularTotal();
  }

  /**
   * Evento para borrar un elemento del carrito
   */
  function borrarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
      return carritoId !== id;
    });
    // volvemos a renderizar
    renderizarCarrito();
  }

  /**
   * Calcula el precio total teniendo en cuenta los productos repetidos
   */
  function calcularTotal() {
    // Recorremos el array del carrito
    return carrito
      .reduce((total, item) => {
        // De cada elemento obtenemos su precio
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
          return itemBaseDatos.id === parseInt(item);
        });
        // Los sumamos al total
        return total + miItem[0].precio;
      }, 0)
      .toFixed(2);
  }

  /**
   * Varia el carrito y vuelve a dibujarlo
   */
  function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizamos los cambios
    renderizarCarrito();
  }

  // Eventos
  DOMbotonVaciar.addEventListener("click", vaciarCarrito);

  // Inicio
  renderizarProductos();
  renderizarCarrito();
});
