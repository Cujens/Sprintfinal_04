// Continuaremos con el ejercicio, debe haber culminado los ABPro anteriores
// Ahora bien para obtener la información real de los post vamos a consultar a la Api :
// https://jsonplaceholder.typicode.com/posts
// Para obtener la información de cada post, para nuestro modal de detalles tenemos la Api
// https://jsonplaceholder.typicode.com/posts/’${id}’

let container = document.querySelector("#container");
let btn = document.querySelector("#staticBackdrop");
let posts;
let favorites = [];

renderLoader();

async function getData(url = "https://jsonplaceholder.typicode.com/posts") {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("error" + res.status);
  }
  return await res.json();
}

function renderLoader() {
  container.innerHTML = `<div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="sr-only"></span>
  </div>
</div>`;

  (async () => {
    try {
      let result = await getData();
      posts = result;
      transformData(posts);
    } catch (error) {
      console.log(error);
    }
  })();
}

function transformData(data) {
  posts = data
    .map((item, index) => {
      return { ...item, favorite: false };
    })
    .slice(0, 20);
  renderPosts(posts);
}

function renderPosts(posts) {
  container.innerHTML = "";
  let html = "";
  posts.forEach((post) => {
    let template = `<div id="${
      post.id
    }" class="card mb-5" style="width: 18rem;">
  <img src="https://geekflare.com/wp-content/uploads/2022/03/WhydoyouneedmockAPI.jpeg" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${post.title}</h5>
    <p class="card-text">Climate ${post.body}</p>
      <div class="d-flex flex-column">
  <button onclick="showModal(${
    post.id
  })" type="button" class="btn btn-secondary mb-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    Ver Post
  </button>
  <button onclick="toggleFavorite(${post.id})" type=" button" class="btn ${
      !post.favorite ? " btn-outline-secondary" : " btn-danger"
    } ">${!post.favorite ? "Agregar a favoritos" : "Favorito"}</button>
  </div>
  </div>
</div>`;

    html += template;
  });
  container.innerHTML = html;
}

async function showModal(id) {
  let post = await getData(`https://jsonplaceholder.typicode.com/posts/${id}`);
  document.getElementById("modal-title").innerHTML = `${post.title}`;
  document.getElementById("prop_1").innerHTML = post.body;
  document.getElementById("prop_2").innerHTML = post.id;
}

function toggleFavorite(id) {
  let post = posts.find((post) => {
    return post.id === id;
  });
  post.favorite = !post.favorite;
  renderPosts(posts);
}

let search = document.getElementById("search-input");

let btnSearch = document.getElementById("search");
btnSearch.addEventListener("click", buscar);

const btnBorrar = document.getElementById("btn-borrar");
btnBorrar.addEventListener("click", renderLoader);

let btnFavoritos = document.getElementById("btn-favoritos");
btnFavoritos.addEventListener("click", mostrarFavoritos);

let mensaje = document.getElementById("mensaje");

function mostrarFavoritos() {
  const result = posts.filter((item) => {
    return item.favorite;
  });
  if (result.length == 0) {
    return;
  }
  renderPosts(result);
}

function checkForNumbers(value) {
  const r = /^[a-zA-Z ]*$/;
  return r.test(value);
}

function buscar() {
  if (search.value.length < 5) {
    mensaje.innerText = "la busqueda tiene que tener 5 caracteres cono minimo";
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

  const result = posts.filter((item) => {
    return item.name.toLocaleUpperCase() == search.value.toLocaleUpperCase();
  });
  if (result.length == 0) {
    mensaje.innerText += "no hay resultados";
    setTimeout(() => {
      mensaje.innerText = "";
      search.value = "";
    }, 2000);
    return;
  } else {
    container.innerHTML = "";
    search.value = "";

    renderPosts(result);
  }
}
//comment ulises