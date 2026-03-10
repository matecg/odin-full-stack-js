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

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function addBookToLibrary(title, author, numOfPages, read = false) {
    const newBook = new Book(title, author, numOfPages, read);
    myLibrary.push(newBook);
}

/* Removes a book based on its id and returns the removed item */
function removeBookFromLibrary(id) {
    const idx = myLibrary.findIndex((book) => book.id === id);
    if (idx === -1) return;
    return myLibrary.splice(idx, 1);
}

function toggleBookReadStatus(id) {
    const book = myLibrary.find((book) => book.id === id);
    book.toggleRead();
}

function displayBooks() {
    const container = document.querySelector(".books-container");
    // Wipe all children is sub-optimal, better would be a selective display
    container.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
        const bookCard = createBookCard(myLibrary[i]);
        container.appendChild(bookCard);
    }
}

function createBookCard(data) {
    const {id, title, author, numOfPages, read} = data;
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    const titlePara = document.createElement("p");
    titlePara.textContent = title;

    const infoPara = document.createElement("p");
    infoPara.textContent = `${author} - ${numOfPages} pages${read ? " - ✅ Done;" : ";"}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "🗑️";
    removeBtn.setAttribute("data-book-id", id);
    removeBtn.addEventListener("click", onRemoveBook);

    const readBtn = document.createElement("button");
    readBtn.textContent = "Mark read";
    readBtn.setAttribute("data-book-id", id);
    readBtn.addEventListener("click", onReadBook);

    bookCard.appendChild(titlePara);
    bookCard.appendChild(infoPara);
    bookCard.appendChild(removeBtn);
    bookCard.appendChild(readBtn);
    return bookCard;
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

function onRemoveBook(e) {
    const { bookId } = e.target.dataset
    removeBookFromLibrary(bookId);
    displayBooks();
}

function onReadBook(e) {
    const {bookId} = e.target.dataset;
    toggleBookReadStatus(bookId);
    displayBooks();
}

addBookToLibrary("The Hobbit", "J. R. R. Tolkien", 293, true);
addBookToLibrary("Thinking, fast and slow", "Daniel Kahneman", 497, false);
addBookToLibrary("Uncertainty in Games", "Greg Costikyan", 141, false);

displayBooks();