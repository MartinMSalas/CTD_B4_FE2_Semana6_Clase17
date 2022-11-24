// 🚩 Primero que nada vamos a enlazar el HTML con este nuevo script y a su vez
// vamos a comentar la linea que lo vincula con el script de la clase 16.
// La idea es desarrollar en este script las nuevas y mejoradas funcionalidades.

/* -------------------------------------------------------------------------- */
/*                       [4] FUNCION: Consulta a la API                       */
/* -------------------------------------------------------------------------- */
// En este caso vamos a consultar a un servidor del cual nos vamos a traer la data.
// Esta API tiene su documentación en: https://jsonplaceholder.typicode.com/
// Vamos a implementar el endpoint que nos devuelve comentarios para mostrarlos en pantalla.

function consultaApi(endpoint) {
  // con el fetch generamos la request a la API ---> le pasamos el endpoint
  fetch(endpoint)
    // el fetch retorna una promesa, por eso capturamos su resultado con el then()
    .then((objetoRespuesta) => {
      console.log(objetoRespuesta);
      const promesaJson = objetoRespuesta.json(); // parseo de JSON a objeto
      return promesaJson;
    })
    // obtengo la respuesta "procesada", con los datos que puedo manipular
    .then((datosJs) => {
      console.log(datosJs);
      renderizarElementos(datosJs);
      // ocultar boton
      document.querySelector(".mostrar").style = "display:none";
    })
    .catch((e) => {
      alert("NO se pudo ejecutar api" + e);
    });
}

/* -------------------------------------------------------------------------- */
/*                      [5] FUNCION: Escuchamos el click                      */
/* -------------------------------------------------------------------------- */
// Vamos a reimplementar la escucha del click para lanzar las nuevas funciones.

const boton = document.querySelector("button");
const endpoint = "https://jsonplaceholder.typicode.com/comments";

boton.addEventListener("click", function () {
  console.log("Click para ver comentarios...");
  consultaApi(endpoint);
});

/* -------------------------------------------------------------------------- */
/*                      [6] FUNCION: renderizar elementos                     */
/* -------------------------------------------------------------------------- */
// Acá vamos a reutilizar la función de renderizar elementos, implementando
// el .map() y .join() para obtener el resultado esperado.

/*


function renderizarElementos(listado) {
  const comentarios = document.querySelector(".comentarios");
  const sacarBoton = document.querySelector(".mostrar");
  comentarios.innerHTML = listado
    .map((item) => {
      if (item.id <= 10){
       return `<div class="comentario">
              <h4>${item.email}</h4>
              <p>${item.body}</p>
            </div>`; 
      };
      
    }, 10)
    .join("");
  sacarBoton.style="display:none";
}
*/

/*
Solucion paralela lo q hago es recorto el listado tomo los 10 items primeros y mapeo eso
*/
/*

*/
function renderizarElementos(listado) {
  const comentarios = document.querySelector(".comentarios");
  comentarios.innerHTML = listado.slice(0, 10).map((item) => {
    return `<div class="comentario">
      <h4>${item.email}</h4>
      <p>${item.body}</p>
      </div>
      `;
  }).join("");
  console.log(listado.slice(0, 10));
}

/* ----------------------------- Mesa de trabajo ---------------------------- */
/* -------------------------------------------------------------------------- */
/*                              Mejoras de código                             */
/* -------------------------------------------------------------------------- */
// En este caso no debemos desarrollar una nueva funcionalidad necesariamente. Aunque
// siempre que lo creas necesario va a estar bien modularizar en funciones el código.
// Queda a criterio del grupo generar o no nuevas funciones.
// En este caso deberan cumplir con nuevos requerimientos que necesita la aplicación.
// 1- En el caso de la consulta a la API, si la misma no es satisfactoria, deberá arrojar
// un error que se le muestre al usuario.
// 2- Para lograr ver el error podemos forzarlo modificando el endpoint incorrectamente,
// para detectar y arrojar el error deben implementar el bloque try().catch()
// 3- Si los comentarios llegan y se cargan correctamente, el botón de "Ver comentarios"
// debe desaparecer de la interfaz. Así evitamos que se vuelva a llamar a la API.
// 4- Solo deben cargarse los primeros 10 comentarios que nos llegan.
