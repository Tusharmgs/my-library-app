"use strict";
const contents = document.querySelector(".contents");
const insertBooks = document.querySelector("#insertButton");
const viewBooks = document.querySelector("#viewButton");
const goBackInsert = document.querySelector(".goBackInsert");
const goBackView = document.querySelector(".goBackView");
const card = document.querySelector(".card");
const cardBack = document.querySelector(".cardBack");
const cardForward = document.querySelector(".cardForward");
const titleData = document.querySelector(".titleData");
const authorData = document.querySelector(".authorData");
const genreData = document.querySelector(".genreData");
const previousBook = document.querySelector(".previousBook");
const nextBook = document.querySelector(".nextBook");
const badge = document.querySelector(".badge");
const h1 = document.querySelector("h1");
const readButton = document.querySelector(".readButton");
const removeButton = document.querySelector(".removeButton");
let arrayIndex = 0;

const generateUUID = function () {
  return crypto.randomUUID();
};

//Book Blueprint by older Method
/* function Book(authorName, title, bookGenre) {
  this.title = title;
  this.authorName = authorName;
  this.bookGenre = bookGenre;
  this.id = generateUUID();
  
  } */

//Book Blueprint by older Method
class Book {
  constructor(authorName, title, bookGenre) {
    this.title = title;
    this.authorName = authorName;
    this.bookGenre = bookGenre;
    this.id = crypto.randomUUID();
    this.isRead = false;
  }
  //implicitly return the created object
}

//Books Array
const books = [];

function bookGenerator(authorName, title, bookGenre) {
  const singleBook = new Book(authorName, title, bookGenre);
  books.push(singleBook);
}
// Examples
bookGenerator("Dan Brown", "The Da Vinci Code", "Thriller");
bookGenerator("F. Scott Fitzgerald", "The Great Gatsby", "Classic Literature");
bookGenerator("Stephen King", "The Shining", "Horror");
bookGenerator("Paulo Coelho", "The Alchemist", "Philosophical Fiction");
bookGenerator(
  "Arthur Conan Doyle",
  "Sherlock Holmes: A Study in Scarlet",
  "Detective Fiction"
);

//Book Data Insert Variables
const bookTitle = document.querySelector("#bookTitle");
const authorName = document.querySelector("#authorName");
const bookGenre = document.querySelector("#bookGenre");

//Form
const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (
    bookTitle.value !== "" &&
    authorName.value !== "" &&
    bookGenre.value !== ""
  ) {
    bookGenerator(authorName.value, bookTitle.value, bookGenre.value);
    
  } else {
    console.log("Error");
  }

  h1.textContent = "Book Adden Successfully !";
  setTimeout(function () {
    h1.textContent = "Library";
  }, 1000);
});

//Insert Books
insertBooks.addEventListener("click", function () {
  contents.classList.add("hidden");
  goBackInsert.classList.remove("hidden");
  form.classList.remove("hidden");
});

//View Books
viewBooks.addEventListener("click", function () {
  contents.classList.add("hidden");
  goBackView.classList.remove("hidden");
  card.classList.remove("hidden");
  cardBack.classList.remove("hidden");
  cardForward.classList.remove("hidden");
  arrayIndex = 0;
  badge.textContent = arrayIndex + 1;
  if (books.length > 0) bookRetriever(books[arrayIndex]);
  else {
    h1.textContent = "No Books Available";
  }
});

//Go Back Insert
goBackInsert.addEventListener("click", function () {
  contents.classList.remove("hidden");
  goBackInsert.classList.add("hidden");
  form.classList.add("hidden");
});

//Go Back View
goBackView.addEventListener("click", function () {
  contents.classList.remove("hidden");
  goBackView.classList.add("hidden");
  card.classList.add("hidden");
  cardBack.classList.add("hidden");
  cardForward.classList.add("hidden");
  h1.textContent = "Library";
});

//previous Book
previousBook.addEventListener("click", function () {
  --arrayIndex;
  if (arrayIndex < 0) {
    arrayIndex = books.length - 1;
    bookRetriever(books[arrayIndex]);
  } else {
    bookRetriever(books[arrayIndex]);
  }
  badge.textContent = arrayIndex + 1;
  if (books[arrayIndex].isRead === false) {
    readButton.classList.remove("alreadyRead");
  } else {
    readButton.classList.add("alreadyRead");
  }
});

//next Book
nextBook.addEventListener("click", function () {
  ++arrayIndex;
  if (arrayIndex < books.length) {
    bookRetriever(books[arrayIndex]);
    badge.textContent = arrayIndex + 1;
  } else {
    arrayIndex = 0;
    bookRetriever(books[arrayIndex]);
    badge.textContent = arrayIndex + 1;
  }
  if (books[arrayIndex].isRead === false) {
    readButton.classList.remove("alreadyRead");
  } else {
    readButton.classList.add("alreadyRead");
  }
});

function bookRetriever(book) {
  if (typeof book !== "object" || book === null) {
    book = {}; // fallback if string, number, etc.
  }

  const { title = "", authorName = "", bookGenre = "" } = book;
  titleData.textContent = title;
  authorData.textContent = authorName;
  genreData.textContent = bookGenre;
}

readButton.addEventListener("click", function () {
  if (books[arrayIndex].isRead === false) {
    books[arrayIndex].isRead = true;
    readButton.classList.add("alreadyRead");
  } else {
    books[arrayIndex].isRead = false;
    readButton.classList.remove("alreadyRead");
  }
});

removeButton.addEventListener("click", function () {
  books.splice(arrayIndex,1);
  if(arrayIndex>=books.length){
    arrayIndex=0;
    badge.textContent=arrayIndex+1;
  }
  if (books.length > 0) bookRetriever(books[arrayIndex]);
  else {
    h1.textContent = "No Books Available";
    readButton.classList.remove('alreadyRead')
    bookRetriever({});
    badge.textContent=0;
    arrayIndex=-1;
  }
});
