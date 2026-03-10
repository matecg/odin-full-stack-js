const myLibrary = [];

function Book(title, author, numOfPages) {
    if (!new.target) {
        throw Error("Books must be created using the 'new' keyword.");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.read = false;
}

function addBookToLibrary(title, author, numOfPages) {
    const newBook = new Book(title, author, numOfPages);
    myLibrary.push(newBook);
}