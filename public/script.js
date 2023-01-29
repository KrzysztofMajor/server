function Refresh()
{
  fetch("http://localhost:3000/hello")
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < data.length; i++){
        AddAuthor(data[i].author, data[i].image, data[i].alt, data[i].tags, data[i].description); 
        AddList(data[i].author);
    }
  });  
}

function AddAuthor(author, image, alt, tags, description)
{
  let table = document.getElementById('table');
  let row = table.insertRow(-1);

  let cell1 = row.insertCell(0);
  cell1.classList.add("table_lines", "new_row");

  let cell2 = row.insertCell(1);
  cell2.classList.add("table_lines", "table_text", "new_row", "author");

  let cell3 = row.insertCell(2);
  cell3.classList.add("table_lines", "table_text", "new_row");

  let cell4 = row.insertCell(3);
  cell4.classList.add("table_lines", "table_text", "new_row");

  let cell5 = row.insertCell(4);   
  cell5.classList.add("table_lines", "table_text", "new_row");

  let newText1 = document.createElement('img');
  newText1.src = image;
  newText1.height = 250;
  cell1.appendChild(newText1);
        
  let newText2 = document.createTextNode(author);
  cell2.appendChild(newText2);

  let newText3 = document.createTextNode(tags);
  cell3.appendChild(newText3);
        
  let newText4 = document.createTextNode(alt);
  cell4.appendChild(newText4);

  let newText5 = document.createTextNode(description);
  cell5.appendChild(newText5);
}

const form = document.getElementById('form');
  form.addEventListener("submit", async function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = JSON.stringify(Object.fromEntries(formData));
    
    let response = await fetch("http://localhost:3000/hello", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
            },
        body: data
    })

    AddAuthor(JSON.parse(data).author, JSON.parse(data).image, JSON.parse(data).alt, JSON.parse(data).tags, JSON.parse(data).description);
    AddList(JSON.parse(data).author);
  }
);

const form2 = document.getElementById('form');
form2.addEventListener("reset", async function(e) {
    e.preventDefault();
    let response = await fetch("https://wt.ops.labs.vu.nl/api23/be03d737/reset", {
        method: 'get',
    })
const newRowElements = document.querySelectorAll('.new_row');
newRowElements.forEach(element => {
    element.remove();
    });
    var listElements = document.querySelectorAll("li");
    Refresh();
});

window.addEventListener("load",  (event) => {
    Refresh();
});

let authorSet = new Set();
let lastClickedAuthor = "";

function AddList(authors) {
 let list = document.getElementById("list");
   if (!authorSet.has(authors)) {
    let li = document.createElement("li");
      li.innerHTML += authors;
      li.addEventListener("click", function(){
        const collection = document.getElementsByClassName("bold");
        for(let i of collection){
          i.classList.remove("bold");
          }
        li.classList.add("bold");
        console.log("Author name clicked: ", authors);
        let table = document.getElementById("table");
        let rows = table.getElementsByTagName("tr");
        if (authors === lastClickedAuthor) {
          for (let i = 0; i < rows.length; i++) {
            rows[i].style.display = "table-row";
            li.classList.remove("bold");
            }
          lastClickedAuthor = "";
        } 
        else {
          for (let i = 0; i < rows.length; i++) {
            let authorCells = Array.from(rows[i].getElementsByClassName("author"));
            authorCells.forEach((authorCell) => {
            if (authorCell.textContent === authors) {
              rows[i].style.display = "table-row";
            } 
            else {
              rows[i].style.display = "none";
            }
            });
          }
          lastClickedAuthor = authors;
        }
      });
    list.appendChild(li);
    authorSet.add(authors);
  }
}



// Source = https://www.w3schools.com/howto/howto_css_modals.asp */
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.addEventListener('click', function() {
  modal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
span.addEventListener('click', function() {
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});