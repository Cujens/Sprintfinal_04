function loading() {
    let l = document.querySelector(".loader");
    let c = document.querySelector(".container");
    l.innerHTML = ` <div class="text-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <p>Se esta cargando</p>`;
    setTimeout(() => {
      c.innerHTML = `<main>
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="assets/img/banner3.JPG" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="assets/img/banner1.JPG" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="assets/img/banner2.JPG" class="d-block w-100" alt="...">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <div class="cliente1">
          <h2>Cliente</h2>
          <div class="contacto d-flex flex-row container justify-content-around ">
            <form onsubmit="show(event)">
              <div class="mb-3 ">
                <label for="exampleFormControlInput1" class="form-label">Nombre</label>
                <input id="nombre" type="text" class="form-control" id="exampleFormControlInput1" placeholder="nombre">
              </div>
              <div class="mb-3 ">
                <label for="exampleFormControlInput2" class="form-label">Apellido</label>
                <input id="apellido" type="text" class="form-control" id="exampleFormControlInput2"
                  placeholder="apellido">
              </div>
              <button id="submit" class="btn btn-primary" type="submit">Enviar</button>
            </form>
            <div>
              <span id="user"></span>
            </div>
          </div>
  
        </div>
  
  
        <div class="container">
          <h2> ¿Quienes somos? </h2>
  
          <p>Somos un emprendimientode la V región especializado en venta de accesorios electrónicos, como celulares,
            computadores, equipos de sonido y de grabación, entre otros.</p>
          <h3>Valores de la empresa </h3>
          <p>
            Deseamos que los productos electrónicos de buena calidad sean asequibles para toda persona, por lo que
            mantenemos precios bajos para todo público.
          </p>
          <Fancybox options={{ infinite: false }}>
            <p>
              <button class="button" data-fancybox="map"
                href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d426000.9652313809!2d-70.91002915315906!3d-33.47189987652666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5410425af2f%3A0x8475d53c400f0931!2sSantiago%2C%20Santiago%20Metropolitan%20Region!5e0!3m2!1sen!2scl!4v1657212914854!5m2!1sen!2scl"
                data-fancybox data-type="iframe" data-preload="false" data-width="800" data-height="500"
                className="button button--secondary">
                Encuentranos Aqui
              </button>
            </p>
          </Fancybox>
        </div>
  
        <div class="galeria">
          <div class="galeria">
            <h2> Galeria de imagenes </h2>
            <div class="col-3">
              <a data-fancybox="gallery" data-src="assets/img/celular.jpeg" data-caption="">
                <img src="assets/img/celular.jpeg" class="d-flex w-20" alt="Polera">
            </div>
            </a>
            <div class="col-3">
              <a data-fancybox="gallery" data-src="assets/img/computador.jpeg">
                <img src="assets/img/computador.jpeg" class="d-flex w-20" alt="computadores">
              </a>
            </div>
            <div class="col-3">
              <a data-fancybox="gallery" data-src="assets/img/altavoz.jpg">
                <img src="assets/img/altavoz.jpg" class="d-flex w-20" alt="altavoces">
              </a>
            </div>
          </div>
  
          <div class="box card bg-info w-25 d-flex justify-content-around mt-3 mb-3">
            <div class="card-body">
              <div>
                <h4>Fecha</h4>
                <strong id='date'></strong>
              </div>
              <hr />
              <div>
                <h4>Hora</h4>
                <strong id='time'></strong>
              </div>
            </div>
          </div>
      </main>
  `;
  
      l.innerHTML = "";
    }, 3000);
  }
  
  loading();