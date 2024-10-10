const myLibrary = [];
const tableBody = document.querySelector("tbody");
const newBtn = document.querySelector(".newBtn");
const newDialog = document.querySelector("dialog");
const cancelBtn = document.querySelector("#cancelBtn");
const submitBtn = document.querySelector("#submitBtn");
const newBookForm = document.querySelector("form");
const check = '<svg id="check" fill="#000001" width="50px" height="50px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>checkmark2</title><path d="M28.998 8.531l-2.134-2.134c-0.394-0.393-1.030-0.393-1.423 0l-12.795 12.795-6.086-6.13c-0.393-0.393-1.029-0.393-1.423 0l-2.134 2.134c-0.393 0.394-0.393 1.030 0 1.423l8.924 8.984c0.393 0.393 1.030 0.393 1.423 0l15.648-15.649c0.393-0.392 0.393-1.030 0-1.423z"></path></svg>';
const x = '<svg id="x" fill="#000000" width="50px" height="50px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>cancel2</title><path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path></svg>';
const trash = '<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 12L14 16M14 12L10 16M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

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
        let newCell = newRow.insertCell(-1);
        newCell.innerHTML = obj.title;
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = obj.author;
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = obj.numPages;
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = obj.publicationYear;
        newCell = newRow.insertCell(-1);
        newCell.setAttribute('data-index', i);
        // determine if isRead needs a checkmark or an x
        newCell.innerHTML = obj.isRead ? check : x;
        newCell.style.cursor = "pointer";
        // newCell.firstChild.style.fill = 'red'

        newCell.addEventListener('click', (e) => {
            // closest to allow clicking on icon
            const bookIndex = e.target.closest('td').getAttribute('data-index'); 
            // toggle isRead
            myLibrary[bookIndex].isRead = !myLibrary[bookIndex].isRead; 
            addTableData(myLibrary);
        })

        newCell = newRow.insertCell(-1);
        newCell.setAttribute('data-index', i);
        newCell.innerHTML = trash;
        newCell.style.cursor = "pointer";

        newCell.addEventListener('click', (e)=> {
            const bookIndex = e.target.closest('td').getAttribute('data-index');
            myLibrary.splice(bookIndex, 1);
            addTableData(myLibrary);
        })
        i++;
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
    // restore html validation
    if (!newBookForm.checkValidity()) {
        newBookForm.reportValidity();
        return;
    }
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