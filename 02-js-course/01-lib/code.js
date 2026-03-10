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

function displayBooks() {
    const container = document.querySelector(".books-container");
    for (let i = 0; i < myLibrary.length; i++) {
        const bookCard = document.createElement("div");

        const titlePara = document.createElement("p");
        titlePara.textContent = myLibrary[i].title;
        const infoPara = document.createElement("p");
        infoPara.textContent = `${myLibrary[i].author} - ${myLibrary[i].numOfPages} pages${myLibrary[i].read ? " - ✅ Done;" : ";"}`;

        bookCard.appendChild(titlePara);
        bookCard.appendChild(infoPara);
        container.appendChild(bookCard);
    }
}

addBookToLibrary("The Hobbit", "J. R. R. Tolkien", 293);
addBookToLibrary("Thinking, fast and slow", "Daniel Kahneman", 497);
addBookToLibrary("Uncertainty in Games", "Greg Costikyan", 141);

displayBooks();