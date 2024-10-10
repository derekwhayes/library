const myLibrary = [];
const tableBody = document.querySelector("tbody");

function Book(title, author, publicationYear) {
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;
}

function addTableData(myLibrary) {
    let i = 0;
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
        newCell.innerHTML = obj.publicationYear;
    }
}

function addBookToLibrary() {
    title = prompt('What is the title of your book? ');
    myLibrary.push(new Book(title));
}

myLibrary.push(new Book('Bionic Commando', 'F.X. Nine', '1991'), new Book('Star Wreck', 'Leah Rewolinski', '1990'), new Book('Bored of the Rings', 'The Harvard Lampoon', '1969'));

addTableData(myLibrary);