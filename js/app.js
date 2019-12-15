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
  static displayBooks() {
    const books = Store.getBooks();
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

  //show alerts
  static showAlert(msg, className){
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  //delete item in list
  static deleteBook(el){
    if(el.classList.contains('delete')){
      el.parentElement.parentElement.remove();
    }
  }

  // clear fieald
  static clearFields(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#id').value = '';
  }
}
// Store class localstorage
class Store {
  static getBooks(){
    let books;
    if(localStorage.getItem('books' === null)){
      books = []
    }else{
      books = JSON.parse(localStorage.getItem('books'))
    }

    return books;
  }
  
  static addBook(book){
    const books = Store.getBooks();
    books.push(book)
    localStorage.setItem('books', JSON.stringify(books))
  }

  static removeBook(id){
    const books =  Store.getBooks();
    books.forEach((book, index) => {
      if(book.id === id){
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books))
  }
}
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

  //validate
  if(title === '' || author === '' || id === ''){
    UI.showAlert('Preencha todos os Campos', 'danger');
  }else {
    //instatiate book
    const book = new Book(title,author,id);
    console.log(book)

    // add book to UI
    UI.addBookToList(book);

    // clear fealds
    UI.clearFields();
    

    // show success message
    UI.showAlert('Adicionado a lista', 'success');
  }
});
//event remove book
document.querySelector('#book-list').addEventListener('click', (e)=>{
  UI.deleteBook(e.target);

  //delete item
  UI.showAlert('Book Deleted', 'info')
})