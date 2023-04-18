// Get table reference
var table = document.getElementById("digimon-table").getElementsByTagName('tbody')[0];

// Get reference to button to display table
var showDigimonBtn = document.getElementById("show-table-button");

// Get reference to the second section and the modal
var section02 = document.getElementById("section02");
var modal = new bootstrap.Modal(document.getElementById('digimon-modal'));

// State variable to know if the table is visible or not
var isTableVisible = false;

// Add click event to the button to show or hide the table
showDigimonBtn.addEventListener("click", function() {
    // If the table is visible, hide it and change the button text to its original value
    if (isTableVisible) {
        section02.style.display = "none";
        table.style.display = "none";
        showDigimonBtn.textContent = "Mostrar Tabla";
        isTableVisible = false;
    } else { // If the table is hidden, show it and change the button text to "Clear Table"
        section02.style.display = "block";
        table.style.display = "table-row-group";
        showDigimonBtn.textContent = "Borrar Tabla";
        isTableVisible = true;
    }
});

// Making a GET request to the Digimon API
fetch("https://digimon-api.vercel.app/api/digimon/")
    .then(function(response) {
        // Convert the response to a JSON object
        return response.json();
    })
    .then(function(data) {
        // Fill in the table
        // Iterate over the data and add it to the table
        data.forEach(function(digimon) {
            // Create a new row for each Digimon
            var row = table.insertRow();

            // Add the name of the Digimon to the first cell
            var nameCell = row.insertCell(0);
            nameCell.innerHTML = digimon.name;

            // Add the Digimon image to the second cell
            var imageCell = row.insertCell(1);
            var image = document.createElement("img");
            image.setAttribute("src", digimon.img);
            image.setAttribute("width", "50");
            image.setAttribute("height", "50");
            imageCell.appendChild(image);

            // Add the type of the Digimon to the third cell
            var levelCell = row.insertCell(2);
            levelCell.innerHTML = digimon.level;

            // Effect 1: Hovering over the row causes it to be shaded
            // Get all rows in the table
            var rows = document.querySelectorAll("#digimon-table tbody tr");

            // Loop through all rows and add listeners for "mouseover" and "mouseout" events
            rows.forEach(function(row) {
                row.addEventListener("mouseover", function() {
                    row.style.backgroundColor = "#eee";
                });
                row.addEventListener("mouseout", function() {
                    row.style.backgroundColor = "#fff";
                });
            });

            // Effect 2: when clicking on the row, open a modal
            // Add a click event to the row to display the digimon info in the modal
            row.addEventListener("click", function() {
                document.getElementById("modal-title").innerHTML = digimon.name;
                document.getElementById("modal-image").setAttribute("src", digimon.img);
                document.getElementById("modal-level").innerHTML = digimon.level;
                modal.show();
            });
        });


    })
    .catch(function(error) {
        // Append request errors
        console.log("Error: ", error);
    });