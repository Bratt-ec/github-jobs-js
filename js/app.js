const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');


document.addEventListener('DOMContentLoaded', () => {
    formulario.addEventListener('submit', validarBusqueda);
});

function validarBusqueda(e){
    e.preventDefault();
    const txtBusqueda = document.querySelector('#busqueda').value;

    if(txtBusqueda === ''){
        mostrarAlerta('El campo es obligatorio');
        return;
    }

    // Consultar API
    consultarAPI(txtBusqueda);
}

function consultarAPI(busqueda){
    const gitUrl = `https://jobs.github.com/positions.json?search=${busqueda}`;
    const url = `https://api.allorigins.win/get?url= ${encodeURIComponent(gitUrl)}`;

    axios.get(url)
        .then(respuesta => mostrarVacantes(JSON.parse(respuesta.data.contents)));
}

function mostrarVacantes(vacantes){
    limpiarHTML();
    console.log(vacantes);

    if(vacantes.length > 0){
        resultado.classList.add('grid');

        // iterar
        vacantes.forEach( vacante => {
            const {title,type,url,company,company_url} = vacante;

            resultado.innerHTML += `
            <div class="shadow bg-white p-6 rounded">
                <h2 class="text-2xl font-light mb-4">${title}</h2>
                <p class="font-bold uppercase">Compañia:  <span class="font-light normal-case">${company} </span></p>
                <p class="font-bold uppercase">Web Compañia:  <span class="font-light normal-case"> <a href='${company_url}' target='_blank'> ${company_url}</a> </span></p>
                <p class="font-bold uppercase">Tipo de Contrato:   <span class="font-light normal-case">${type} </span></p>
                <a class="bg-teal-500 max-w-lg mx-auto mt-3 rounded p-2 block uppercase font-xl font-bold text-white text-center" href="${url}" target='_blank'>Ver Vacante</a>
            </div>
            `;
        });
    } else{
        const noResultado = document.createElement('p');
        noResultado.classList.add('text-center','mt-10', 'text-gray-600','w-full');
        noResultado.textContent = 'No hay vacantes, intenta con otro término de búsqueda';
        resultado.classList.remove('grid');
        resultado.appendChild(noResultado);

        setTimeout(() => {
            noResultado.remove();
        }, 3000);
    }
}

function limpiarHTML(){
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function mostrarAlerta(mensaje){

    const error = document.querySelector('.alerta');

    if(!error){
        const divAlerta = document.createElement('div');
        divAlerta.classList.add('bg-gray-100','p-3','text-center','mt-3','alerta');
        divAlerta.textContent= mensaje;

        formulario.appendChild(divAlerta);

        setTimeout(() => {
            divAlerta.remove();
        }, 3000);
    }


}