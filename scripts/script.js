const myLibrary = [];
const tableBody = document.querySelector("tbody");
const newBtn = document.querySelector(".newBtn");
const newDialog = document.querySelector("dialog");
const cancelBtn = document.querySelector("#cancelBtn");
const submitBtn = document.querySelector("#submitBtn");
const newBookForm = document.querySelector("form");


function Book(title, author, numPages, publicationYear, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.publicationYear = publicationYear;
    this.isRead = isRead;
}

function addTableData(myLibrary) {
    let i = 0;
    tableBody.innerHTML = '';
    for (let obj of myLibrary) {
        let newRow = document.createElement('tr');
        tableBody.appendChild(newRow);
        // trying to use nth child selector in css either colored all or no rows. this is a work around.
        if (i % 2 === 1) {
            newRow.style.backgroundColor = "lightgray";
        }
        i++;
        let newCell = newRow.insertCell(-1);
        newCell.innerHTML = obj.title;
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = obj.author;
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = obj.numPages;
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = obj.publicationYear;
        newCell = newRow.insertCell(-1);
        if (obj.isRead) {
            newCell.innerHTML = '<svg fill="#000000" width="50px" height="50px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>checkmark2</title><path d="M28.998 8.531l-2.134-2.134c-0.394-0.393-1.030-0.393-1.423 0l-12.795 12.795-6.086-6.13c-0.393-0.393-1.029-0.393-1.423 0l-2.134 2.134c-0.393 0.394-0.393 1.030 0 1.423l8.924 8.984c0.393 0.393 1.030 0.393 1.423 0l15.648-15.649c0.393-0.392 0.393-1.030 0-1.423z"></path></svg>';
        }
        else {
            newCell.innerHTML = '<svg fill="#000000" width="50px" height="50px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>cancel2</title><path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path></svg>';
        }
    }
}

function addBookToLibrary() {
    title = prompt('What is the title of your book? ');
    myLibrary.push(new Book(title));
}

// add some starter books
myLibrary.push(new Book('Bionic Commando', 'F.X. Nine', '117', '1991', true), new Book('Star Wreck', 'Leah Rewolinski', '117', '1990', false), new Book('Bored of the Rings', 'The Harvard Lampoon', '149', '1969', true));

addTableData(myLibrary);

newBtn.addEventListener("click", () => newDialog.showModal());

cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    newDialog.close();
});

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let newBook = new Book();
    let formData = new FormData(newBookForm, submitBtn);
    // probably not the right way but this assigns the formdata to a book object
    for (let info of formData) {
        newBook[info[0]] = info[1];
    }
    myLibrary.push(newBook);
    addTableData(myLibrary);
    newBookForm.reset();
    newDialog.close();
})