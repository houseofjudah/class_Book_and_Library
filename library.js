
class Book {
    #isbn; 
  
    constructor(title, author, isbn) {
      this.title = title;
      this.author = author;
      this.isbn = isbn; 
      this.available = true;
    }
  
    
    get isbn() {
      return this.#isbn;
    }
  
   
    set isbn(bookNum) {
      if (typeof bookNum !== 'string') {
        throw new Error('ISBN must be a string');
      }
      this.#isbn = bookNum;
    }
  
    borrowBook() {
      if (this.available) {
        this.available = false;
      console.log(`Book: "${this.title}" has been borrowed on ${ new Date().toUTCString()}`);
      } else {
        console.log(`Book: "${this.title}" is not available.`);
      }
    }
  
    returnBook() {
      this.available = true;
      console.log(`${this.title}" has been returned ${ new Date().toUTCString()}.`);
    }
  }
  
  // Library class
  class Library {
    constructor() {
      this.books = [];
    }
  
    addBook(book) {
      if (book instanceof Book) {
        this.books.push(book);
        console.log(`Book: "${book.title}" has been added to the library on ${ new Date().toUTCString()}.`);
      } else {
        console.log('Only Book objects can be added to the library.');
      }
    }
  
    removeBook(isbn) {
      const bookIndex = this.books.findIndex((book) => book.isbn === isbn);
      if (bookIndex !== -1) {
        this.books.splice(bookIndex, 1);
        console.log(`Book with ISBN "${isbn}" has been removed from the library on ${ new Date().toUTCString()}.`);
      } else {
        console.log(`Book with ISBN "${isbn}" not found in the library.`);
      }
    }
  
    findBookByTitle(title) {
      const book = this.books.find((book) => book.title === title);
      if (book) {
        console.table(`Book details: Title - ${book.title}; Author - ${book.author}, ISBN - ${book.isbn}; Available - ${book.available}`);
      } else {
        console.log(`Book with title "${title}" not found in the library.`);
      }
    }
  }
  
 
  class DigitalLibrary extends Library {
    downloadBook(isbn) {
      const book = this.books.find((book) => book.isbn === isbn);
      if (book && book.available) {
        console.log(`Book: "${book.title}" has been downloaded.`);
        book.borrowBook(); // Mark the book as borrowed
      } else if (book && !book.available) {
        console.log(`Book: "${book.title}" is not available for download.`);
      } else {
        console.log(`Book with ISBN "${isbn}" not found in the library.`);
      }
    }
  }

  
  
const book1 = new Book("1984", "George Orwell", "9780451524935");
book1.borrowBook();
book1.returnBook();


const library = new DigitalLibrary();
  
const ebook1 = new Book('How to spell Naija in 100 short stories Vol.1', 'Chuma Nwokolo', '9789782190154');
const ebook2 = new Book('Eloquent JavaScript: Fourth Edition', 'Marijn Haverbeke', '9781593279509');
const ebook3 = new Book('To Kill A Mockingbird', 'Harper Lee', '9780446310789');
  
  
library.addBook(ebook1);
library.addBook(ebook2);
library.addBook(ebook3);
library.removeBook('9780596805524');
library.findBookByTitle('JavaScript: The Definitive Guide');
library.downloadBook('9780596805524');
library.downloadBook('781593279509');  
library.removeBook('9781593279509');
library.findBookByTitle('Eloquent JavaScript: Fourth Edition');
  
