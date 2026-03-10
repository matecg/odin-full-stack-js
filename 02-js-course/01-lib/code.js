const myLibrary = [];
document.querySelector(".new-form")
    .addEventListener("submit", onSubmitNewBook);

function Book(title, author, numOfPages, read) {
    if (!new.target) {
        throw Error("Books must be created using the 'new' keyword.");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.read = read;
}

function addBookToLibrary(title, author, numOfPages, read = false) {
    const newBook = new Book(title, author, numOfPages, read);
    myLibrary.push(newBook);
}

function displayBooks() {
    const container = document.querySelector(".books-container");
    // Wipe all children is sub-optimal, better would be a selective display
    container.innerHTML = "";
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

function onSubmitNewBook(e) {
    const data = new FormData(e.target);
    const title = data.get("title");
    const author = data.get("author");
    const numOfPages = data.get("pages");
    const read = !!data.get("read");
    e.target.reset();
    addBookToLibrary(title, author, numOfPages, read);
    displayBooks();
}

addBookToLibrary("The Hobbit", "J. R. R. Tolkien", 293, true);
addBookToLibrary("Thinking, fast and slow", "Daniel Kahneman", 497, false);
addBookToLibrary("Uncertainty in Games", "Greg Costikyan", 141, false);

displayBooks();