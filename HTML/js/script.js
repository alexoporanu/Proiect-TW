var modalSettings = document.getElementById("modalSettings");
var modalView = document.getElementById("modalView");
var modalAdd = document.getElementById("modalAdd");
var bookList = document.getElementById("book-list");

function checkGreeting() {
    if(!window.localStorage.getItem("username") || window.localStorage.getItem("username" == ""))
        document.getElementById("greeting").textContent = "Salut! Aici sunt recenziile tale:";
    else document.getElementById("greeting").textContent = "Salut, " + window.localStorage.getItem("username") + "! Aici sunt recenziile tale:";
}
window.onload = checkGreeting();

document.getElementById("b-title").addEventListener("keyup", function() {
    let Input = document.getElementById('b-title').value;
    if (Input != "") {
        document.getElementById('postBtn').removeAttribute("disabled");
    } else {
        document.getElementById('postBtn').setAttribute("disabled", null);
    }
});
document.getElementById("modal-b-title").addEventListener("keyup", function() {
    let Input = document.getElementById('modal-b-title').value;
    if (Input != "") {
        document.getElementById('postMBtn').removeAttribute("disabled");
    } else {
        document.getElementById('postMBtn').setAttribute("disabled", null);
    }
});

function saveSettings() {
    var Nume = document.getElementById("user-name").value;
    window.localStorage.setItem("username", Nume);

    if(Nume != "") document.getElementById("greeting").textContent = "Salut, " + Nume + "! Aici sunt recenziile tale:";
    else document.getElementById("greeting").textContent = "Salut! Aici sunt recenziile tale:";
    
    closeModal();
}

function openSettings() {
    /// deschid modalSettings 
    modalSettings.style.display = "block";
    document.body.style.position = "fixed";
}

function openModalAdd() {
    /// deschid modalAdd
    modalAdd.style.display = "block";
    document.body.style.position = "fixed";
}

/// aici gestionam meniul de edit
function editViewModal(id, title, description) {
    let modal = document.getElementById("modalView-info");
    while(modal.firstChild)
        modal.removeChild(modal.firstChild);

    ///creez titlul
    let modalTitle = document.createElement('h1');
    modalTitle.innerText = "Modifică recenzia:";
    modalTitle.classList.add("modal-title");
    
    ///creez formularul
    let form = document.createElement('form');
    form.action = '/plants/' + id;
    form.method = 'POST';
    form.id = "edit-form";

    /// creez un label pentru prima casuta din form
    let titleLabel = document.createElement('label');
    titleLabel.htmlFor = "book-title";
    titleLabel.textContent = "Titlul:";

    ///creez linia de input in care scriu titlul
    let titleInput = document.createElement('input');
    titleInput.name = "b-title";
    titleInput.id = "edit-b-title";
    titleInput.value = title;

    /// creez eticheta pentru recenzie
    let descriptLabel = document.createElement('label');
    descriptLabel.htmlFor = "book-description";
    descriptLabel.textContent = "Descrierea cărții:";

    ///salvez textul efectiv
    let descriptTextarea = document.createElement("textarea");
    descriptTextarea.name = "b-descript"
    descriptTextarea.id = "edit-b-descript";
    descriptTextarea.textContent = description;
    
    /// aici men(i)u = cele doua butoane
    let menu = document.createElement('div');
    menu.classList.add("modal-menu");
    

    /// adaug butonul de Salvează
    let saveBtn = document.createElement('button');
    saveBtn.type = "submit";
    saveBtn.classList.add("btn");
    saveBtn.innerText = "Salvează";
    saveBtn.addEventListener('click', function() {
        editBook(id);
        closeModal();
    })
    menu.appendChild(saveBtn);

    /// butonul de închide
    let closeBtn = document.createElement('button');
    closeBtn.classList.add("btn");
    closeBtn.innerText = "Închide";
    closeBtn.addEventListener('click', function() {
        closeModal();
    })
    menu.appendChild(closeBtn);


    /*titleInput.addEventListener("keyup", function() {
        let Input = titleInput.value;
        if (Input != "") {
            saveBtn.removeAttribute("disabled");
        } else {
            saveBtn.setAttribute("disabled", null);
        }
    });*/

    /// appenduiesc titlul
    modal.appendChild(modalTitle);

    form.appendChild(titleLabel);
    /// bag br ca sa am line break
    let br1 = document.createElement('br');
    form.appendChild(br1);
    form.appendChild(titleInput);
    let br2 = document.createElement('br');
    form.appendChild(br2);
    form.appendChild(descriptLabel);
    let br3 = document.createElement('br');
    form.appendChild(br3);
    form.appendChild(descriptTextarea);
    let br4 = document.createElement('br');
    form.appendChild(br4);
    modal.appendChild(form);
    
    modal.appendChild(menu);
}

/// aici deschidem lista de carti
function openView(id, title, description) {
    modalView.style.display = "block";
    document.body.style.positon = "fixed";

    /// accesez modalViewul-info (divul) din html 
    let modal = document.getElementById("modalView-info");
    /// daca nu fac asa mi se afiseaza toate anterioarele
    while(modal.firstChild)
         modal.removeChild(modal.firstChild);

    /// creez titlul
    let modalTitle = document.createElement('h1');
    modalTitle.innerText = title;
    modalTitle.classList.add("modal-title");
    
    /// cuvantul "Descriere din meniu"
    let P = document.createElement('p');
    P.innerText = "Recenzia:";
    /// bag si clasa de view-modal-descript
    P.classList.add("view-modal-descript");

    /// bag descrierea(recenzia efectiva)
    let modalDescript = document.createElement('p');
    modalDescript.innerText = description;
    

    /// creez un submeniu (adica cele doua butoane)
    let menu = document.createElement('div');
    menu.classList.add("modal-menu");

    ///bag butonul de edit
    let editBtn = document.createElement('button');
    editBtn.classList.add("btn");
    editBtn.innerText = "Modifică";
    editBtn.addEventListener('click', function() {
        editViewModal(id, title, description);
    })
    menu.appendChild(editBtn);
    
    ///bag butonul de inchidere
    let closeBtn = document.createElement('button');
    closeBtn.classList.add("btn");
    closeBtn.innerText = "Închide";
    closeBtn.addEventListener('click', function() {
        closeModal();
    })
    menu.appendChild(closeBtn);


    ///adaug pe rand titlul cartii, cuvantul "Recenzia:",
    /// recenzia efectiva (introdusa de user),
    /// meniul(care e defapt un div) si adaug butoanele de
    /// modifica si inchide
    modal.appendChild(modalTitle);
    modal.appendChild(P);
    modal.appendChild(modalDescript);
    modal.appendChild(menu);
}

function closeModal() {
    //document.body.style.position = "absolute";
    /// closeModal() le inchide pe toate
    modalSettings.style.display = "none";
    modalView.style.display = "none";
    modalAdd.style.display = "none";
}


function appendToDOM(books) {
    while(bookList.firstChild) 
        bookList.removeChild(bookList.firstChild);
    
    for(let i = 0; i < books.length; i++) {
        let bookTitle = document.createElement('div');
        /// bookTitle este elementul meu din lista
        bookTitle.innerText = books[i].title;
        /// bag in interior titlul cartii ca text
        bookTitle.classList.add("book-cap");
        /// bag clasa book-cap (vezi css)
        /// bag event listener, pe click mi se va deschide
        /// meniul unde pot edita
        bookTitle.addEventListener('click', function() {
            openView(books[i].id, books[i].title, books[i].description);
        });
        
        /// creez butonul 'Sterge'
        let solveBtn = document.createElement('button');
        solveBtn.innerText = 'Sterge';
        /// ii pun clasa de buton
        solveBtn.classList.add("btn");
        /// bag event listener de delete
        solveBtn.addEventListener('click', function() {
            deleteBook(books[i].id);
        });
        /// creez cate o lista (scurta), care are display flex (vezi css)
        /// in care bag titlul si butonul
        let li = document.createElement('li');
        li.appendChild(bookTitle);
        li.appendChild(solveBtn);
        li.classList.add("book-elem");
        
        /// il appenduiesc la bookList
        bookList.appendChild(li);
    }
}

function getBooks() {
    fetch('/books')
        .then(function(response) {
            response.json().then(function(books) {
                appendToDOM(books);
            });
        });
}


///postam la book onclick pe butonul de adauga
function postBook() {
    ///luam continutul de la titlu si autor 
    let bookTitle = document.getElementById("b-title").value;
    /// luat continutul de la recenzie
    let bookDesc = document.getElementById("b-descript").value;
    /// creez un obiect de tip carte care are ca si campuri valorile extrase
    const book = {
        title: bookTitle,
        description: bookDesc
    };

    /// il postez
    fetch('/books', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(book)
    }).then(function() {
        getBooks();
    });
}


function postMBook() {
    let bookTitle = document.getElementById("modal-b-title").value;
    let bookDesc = document.getElementById("modal-b-descript").value;
    const book = {
        title: bookTitle,
        description: bookDesc
    };

    fetch('/books', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(book)
    }).then(function() {
        getBooks();
    });
}

function editBook(id) {
    const book = {
        title: document.getElementById('edit-b-title').value,
        description: document.getElementById('edit-b-descript').value
    }
    fetch(`http://localhost:3000/books/${id}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(book)
    }).then(function () {
        getBooks();
    });
}

function deleteBook(id) {
    fetch(`http://localhost:3000/books/${id}`, {
        method: 'DELETE'
    }).then(function() {
        getBooks();
    });
}

getBooks();