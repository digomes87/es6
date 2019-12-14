// Book class
class Book {
  constructor(title, author, id){
    this.title = title;
    this.author = author;
    this.id = id;
  }
}
// UI class
class UI {
  static displayBooks(){
    const StoreBooks = [
      {
        title: 'Booke one',
        author: 'Diego',
        id: '1'
      },
      {
        title: 'Book two',
        author: 'Anna',
        id: 2
      }
    ];
    const books = StoreBooks;
    books.forEach((book)=> UI.addBookToList(book));
  }
  static addBookToList(book){
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.id}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `
    list.appendChild(row);
  }
}
// Store class localstorage

// event display book
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// event listene
document.querySelector('#book-form').addEventListener('submit',(e)=>{
  // get form values
  // prevent actual submit
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const id = document.querySelector('#id').value;
  

  //instatiate book
  const book = new Book(title,author,id);
  console.log(book)

  // add book to UI
  UI.addBookToList(book);
})
//event remove book