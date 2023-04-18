// Obtener referencia a la tabla
var table = document.getElementById("digimon-table").getElementsByTagName('tbody')[0];

// Obtener referencia al modal
var modal = new bootstrap.Modal(document.getElementById('digimon-modal'));

// Hacer una solicitud GET a la API de Digimon
fetch("https://digimon-api.vercel.app/api/digimon/")
    .then(function(response) {
        // Convertir la respuesta a un objeto JSON
        return response.json();
    })
    .then(function(data) {
        // Rellenar la tabla
        // Iterar sobre los datos y agregarlos a la tabla
        data.forEach(function(digimon) {
            // Crear una nueva fila para cada digimon
            var row = table.insertRow();

            // Agregar el nombre del digimon a la primera celda
            var nameCell = row.insertCell(0);
            nameCell.innerHTML = digimon.name;

            // Agregar la imagen del digimon a la segunda celda
            var imageCell = row.insertCell(1);
            var image = document.createElement("img");
            image.setAttribute("src", digimon.img);
            image.setAttribute("width", "50");
            image.setAttribute("height", "50");
            imageCell.appendChild(image);

            // Agregar el tipo del digimon a la tercera celda
            var levelCell = row.insertCell(2);
            levelCell.innerHTML = digimon.level;

            // Efecto 1: Al pasar el mouse sobre la fila, esta se sombrea
            // Obtener todas las filas de la tabla
            var rows = document.querySelectorAll("#digimon-table tbody tr");

            // Recorrer todas las filas y agregar listeners para los eventos "mouseover" y "mouseout"
            rows.forEach(function(row) {
                row.addEventListener("mouseover", function() {
                    row.style.backgroundColor = "#eee";
                });
                row.addEventListener("mouseout", function() {
                    row.style.backgroundColor = "#fff";
                });
            });

            // Efecto 2: al hacer click sobre la fila, abrir un modal
            // Agregar un evento click a la fila para mostrar la información del digimon en el modal
            row.addEventListener("click", function() {
                document.getElementById("modal-title").innerHTML = digimon.name;
                document.getElementById("modal-image").setAttribute("src", digimon.img);
                document.getElementById("modal-level").innerHTML = digimon.level;
                modal.show();
            });
        });


    })
    .catch(function(error) {
        // Manejar errores de la solicitud
        console.log("Error: ", error);
    });
