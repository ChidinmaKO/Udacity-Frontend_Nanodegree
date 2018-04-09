// Select color input
// Select size input

const height = document.getElementById("inputHeight");
const width = document.getElementById("inputWidth");
const button = document.getElementById("submitButton");
const table = document.getElementById("pixelCanvas");
const color = document.getElementById("colorPicker");

// When size is submitted by the user, call makeGrid()
button.addEventListener("click", function (e) {
    // prevent the button from submitting
    e.preventDefault();
    makeGrid(table, height, width);
});

function makeGrid(table, height, width) {
    // Your code goes here!
    height = height.value;
    width = width.value;
    // clear previous grid
    table.innerHTML = "";

    for (let i = 0; i < height; i++) {
        //create row <tr> and append to table
        const row = document.createElement("tr");
        table.appendChild(row);

        for (let j = 0; j < width; j++) {
            // create column <td> and append to table
            const column = document.createElement("td");
            row.appendChild(column);
        }

        table.addEventListener("click", function (e) {
            e.preventDefault();
            if (e.target.nodeName === "TD") //recall that the node names of HTML elements are always uppercase and the node names of XML elements are in their original case
            {
                e.target.style.backgroundColor = color.value;
            }
        });
    }
}
