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
        newCell.innerHTML = obj.isRead;
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
    for (let info of formData) {
        newBook[info[0]] = info[1];
    }
    myLibrary.push(newBook);
    addTableData(myLibrary);
    newBookForm.reset();
    newDialog.close();
})