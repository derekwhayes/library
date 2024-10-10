const myLibrary = [];

function Book(title, author, publicationYear) {
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;
}

function addBookToLibrary() {
    title = prompt('What is the title of your book? ');
    myLibrary.push(new Book(title));
}

myLibrary.push(new Book('Bionic Commando', 'F.X. Nine', '1991'), new Book('Star Wreck', 'Leah Rewolinski', '1990'), new Book('Bored of the Rings', 'The Harvard Lampoon', '1969'));