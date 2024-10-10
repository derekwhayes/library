const myLibrary = [];

function Book(title) {
    this.title = title;
}

function addBookToLibrary() {
    title = prompt('What is the title of your book? ');
    myLibrary.push(new Book(title));
}